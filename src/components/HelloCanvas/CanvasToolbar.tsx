import { Pencil, Type, Trash2 } from "lucide-react";

interface CanvasToolbarProps {
  tool: "pen" | "text";
  onToolChange: (tool: "pen" | "text") => void;
  onClear: () => void;
}

export default function CanvasToolbar({
  tool,
  onToolChange,
  onClear,
}: CanvasToolbarProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onToolChange("pen")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-pixel text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
          tool === "pen"
            ? "bg-primary text-bg"
            : "text-text-muted hover:text-text"
        }`}
      >
        <Pencil size={14} />
        Pen
      </button>
      <button
        onClick={() => onToolChange("text")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-pixel text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
          tool === "text"
            ? "bg-primary text-bg"
            : "text-text-muted hover:text-text"
        }`}
      >
        <Type size={14} />
        Text
      </button>
      <div className="flex-1" />
      <button
        onClick={onClear}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-pixel text-xs uppercase tracking-wider text-text-muted hover:text-secondary transition-colors duration-200 cursor-pointer"
      >
        <Trash2 size={14} />
        Clear
      </button>
    </div>
  );
}
