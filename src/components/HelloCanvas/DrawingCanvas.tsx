import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";

export interface TextEntry {
  text: string;
  x: number;
  y: number;
}

export interface DrawingCanvasHandle {
  exportBlob: () => Promise<Blob | null>;
  getTextEntries: () => TextEntry[];
  clear: () => void;
  getHasContent: () => boolean;
}

interface DrawingCanvasProps {
  tool: "pen" | "text";
  onContentChange: (hasContent: boolean) => void;
  width?: number;
  height?: number;
}

const DrawingCanvas = forwardRef<DrawingCanvasHandle, DrawingCanvasProps>(
  ({ tool, onContentChange, width = 340, height = 340 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textInputRef = useRef<HTMLInputElement>(null);
    const isDrawingRef = useRef(false);
    const hasContentRef = useRef(false);
    const textEntriesRef = useRef<TextEntry[]>([]);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);
    // Ref to hold latest text input state for use in callbacks without stale closures
    const textInputStateRef = useRef<{
      visible: boolean;
      x: number;
      y: number;
      value: string;
    }>({ visible: false, x: 0, y: 0, value: "" });

    const [textInput, setTextInput] = useState<{
      visible: boolean;
      x: number;
      y: number;
      value: string;
    }>({ visible: false, x: 0, y: 0, value: "" });

    // Keep ref in sync with state
    useEffect(() => {
      textInputStateRef.current = textInput;
    }, [textInput]);

    const setHasContent = useCallback(
      (value: boolean) => {
        if (hasContentRef.current !== value) {
          hasContentRef.current = value;
          onContentChange(value);
        }
      },
      [onContentChange]
    );

    // Initialize canvas
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      ctx.fillStyle = "#2A2233";
      ctx.fillRect(0, 0, width, height);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#FAF8F3";
    }, [width, height]);

    // Focus text input after it renders — delayed to avoid pointer event race
    useEffect(() => {
      if (textInput.visible) {
        const raf = requestAnimationFrame(() => {
          textInputRef.current?.focus();
        });
        return () => cancelAnimationFrame(raf);
      }
    }, [textInput.visible, textInput.x, textInput.y]);

    const getCanvasPoint = useCallback(
      (e: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      },
      []
    );

    // Commit text using the ref (avoids stale closure issues)
    const commitCurrentText = useCallback(() => {
      const current = textInputStateRef.current;
      if (!current.visible) return;

      if (current.value.trim()) {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.font = "16px 'Public Sans', sans-serif";
            ctx.fillStyle = "#FAF8F3";
            ctx.fillText(current.value, current.x, current.y);

            textEntriesRef.current.push({
              text: current.value,
              x: current.x,
              y: current.y,
            });

            hasContentRef.current = true;
            onContentChange(true);
          }
        }
      }

      setTextInput({ visible: false, x: 0, y: 0, value: "" });
    }, [onContentChange]);

    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (tool === "text") {
          // If there's already an active text input, commit it first
          commitCurrentText();

          const point = getCanvasPoint(e);
          // Prevent the pointerdown from stealing focus from the input we're about to create
          e.preventDefault();
          setTextInput({ visible: true, x: point.x, y: point.y, value: "" });
          return;
        }

        // Pen tool — commit any pending text first
        commitCurrentText();

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        isDrawingRef.current = true;
        const point = getCanvasPoint(e);
        lastPointRef.current = point;

        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        // Draw a dot for single clicks
        ctx.lineTo(point.x + 0.1, point.y + 0.1);
        ctx.stroke();

        canvas.setPointerCapture(e.pointerId);
        setHasContent(true);
      },
      [tool, getCanvasPoint, setHasContent, commitCurrentText]
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawingRef.current || tool !== "pen") return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const point = getCanvasPoint(e);

        if (lastPointRef.current) {
          ctx.beginPath();
          ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        }

        lastPointRef.current = point;
      },
      [tool, getCanvasPoint]
    );

    const handlePointerUp = useCallback(() => {
      isDrawingRef.current = false;
      lastPointRef.current = null;
    }, []);

    const handleTextKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          commitCurrentText();
        } else if (e.key === "Escape") {
          setTextInput({ visible: false, x: 0, y: 0, value: "" });
        }
      },
      [commitCurrentText]
    );

    useImperativeHandle(ref, () => ({
      exportBlob: () => {
        return new Promise<Blob | null>((resolve) => {
          const canvas = canvasRef.current;
          if (!canvas) {
            resolve(null);
            return;
          }
          canvas.toBlob(
            (blob) => resolve(blob),
            "image/webp",
            0.7
          );
        });
      },
      getTextEntries: () => [...textEntriesRef.current],
      clear: () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
        ctx.fillStyle = "#2A2233";
        ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

        // Reset drawing state
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#FAF8F3";

        textEntriesRef.current = [];
        isDrawingRef.current = false;
        lastPointRef.current = null;
        setTextInput({ visible: false, x: 0, y: 0, value: "" });
        setHasContent(false);
      },
      getHasContent: () => hasContentRef.current,
    }));

    return (
      <div className="relative" style={{ width, height }}>
        <canvas
          ref={canvasRef}
          className={`border border-border rounded-sm ${
            tool === "text" ? "cursor-text" : "cursor-crosshair"
          }`}
          style={{ width, height, touchAction: "none" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
        {textInput.visible && (
          <input
            ref={textInputRef}
            type="text"
            value={textInput.value}
            onChange={(e) =>
              setTextInput((prev) => ({ ...prev, value: e.target.value }))
            }
            onKeyDown={handleTextKeyDown}
            className="absolute bg-transparent text-text font-sans text-base outline-none border-b border-primary/60 caret-primary"
            style={{
              left: textInput.x,
              top: textInput.y - 18,
              minWidth: 60,
              maxWidth: width - textInput.x - 8,
            }}
          />
        )}
      </div>
    );
  }
);

DrawingCanvas.displayName = "DrawingCanvas";

export default DrawingCanvas;
