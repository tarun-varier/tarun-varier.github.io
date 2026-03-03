import { useState, useRef, useCallback } from "react";
import { Pencil, X } from "lucide-react";
import DrawingCanvas, { type DrawingCanvasHandle } from "./DrawingCanvas";
import CanvasToolbar from "./CanvasToolbar";
import HelloFormModal from "./HelloFormModal";

export default function HelloCanvas() {
  const canvasRef = useRef<DrawingCanvasHandle>(null);
  const [tool, setTool] = useState<"pen" | "text">("pen");
  const [hasContent, setHasContent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleContentChange = useCallback((value: boolean) => {
    setHasContent(value);
  }, []);

  const handleClear = useCallback(() => {
    canvasRef.current?.clear();
    setHasContent(false);
  }, []);

  const handleSuccess = useCallback(() => {
    setShowForm(false);
    canvasRef.current?.clear();
    setHasContent(false);
    setIsPanelOpen(false);
  }, []);

  const canvasContent = (
    <div className="flex flex-col items-center gap-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-serif text-3xl text-text leading-tight">
          Say{" "}
          <span className="font-pixel text-2xl text-primary">Hello</span>
        </h2>
        <p className="text-text-muted text-xs mt-1">
          Draw or type a message
        </p>
      </div>

      {/* Canvas */}
      <DrawingCanvas
        ref={canvasRef}
        tool={tool}
        onContentChange={handleContentChange}
      />

      {/* Toolbar */}
      <CanvasToolbar tool={tool} onToolChange={setTool} onClear={handleClear} />

      {/* Send button */}
      <div
        className={`w-full transition-all duration-300 ${
          hasContent
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-2.5 font-pixel text-sm uppercase tracking-wider text-bg bg-primary rounded-sm hover:bg-primary/80 transition-colors duration-200 cursor-pointer"
        >
          Send
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: Fixed right panel (xl and above) */}
      <div className="hidden xl:flex fixed right-0 top-0 h-screen w-[380px] border-l border-border bg-bg z-20 items-center justify-center px-5">
        {canvasContent}
      </div>

      {/* Mobile/Tablet: Floating button + slide-up panel */}
      <div className="xl:hidden">
        {/* Floating button */}
        {!isPanelOpen && (
          <button
            onClick={() => setIsPanelOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-bg flex items-center justify-center shadow-lg hover:bg-primary/80 transition-colors duration-200 cursor-pointer"
            aria-label="Say Hello"
          >
            <Pencil size={22} />
          </button>
        )}

        {/* Slide-up panel */}
        {isPanelOpen && (
          <div
            className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsPanelOpen(false);
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 bg-bg border-t border-border rounded-t-lg px-6 py-6 max-h-[85vh] overflow-y-auto animate-slide-up">
              {/* Close button */}
              <button
                onClick={() => setIsPanelOpen(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex justify-center pt-2">
                {canvasContent}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <HelloFormModal
          canvasRef={canvasRef}
          onClose={() => setShowForm(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
