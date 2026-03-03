import { useState, type RefObject } from "react";
import { X, Loader2, Check } from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { DrawingCanvasHandle } from "./DrawingCanvas";

interface HelloFormModalProps {
  canvasRef: RefObject<DrawingCanvasHandle | null>;
  onClose: () => void;
  onSuccess: () => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function HelloFormModal({
  canvasRef,
  onClose,
  onSuccess,
}: HelloFormModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg("Name is required");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email");
      return;
    }

    setFormState("submitting");
    setErrorMsg("");

    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not available");

      // Export canvas image
      const blob = await canvas.exportBlob();
      if (!blob) throw new Error("Failed to export canvas");

      // Generate unique filename
      const filename = `${crypto.randomUUID()}.webp`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("hello-canvas")
        .upload(filename, blob, {
          contentType: "image/webp",
          cacheControl: "31536000",
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("hello-canvas").getPublicUrl(filename);

      // Get text entries as semicolon-separated string
      const entries = canvas.getTextEntries();
      const textContent = entries.length > 0
        ? entries.map((e) => e.text).join("; ")
        : null;

      // Insert row
      const { error: insertError } = await supabase
        .from("hello_messages")
        .insert({
          name: name.trim(),
          email: email.trim(),
          image_url: publicUrl,
          text_content: textContent,
        });

      if (insertError) throw insertError;

      setFormState("success");
      setTimeout(() => {
        onSuccess();
      }, 1200);
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
      setFormState("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && formState !== "submitting")
          onClose();
      }}
    >
      <div className="bg-bg border border-border rounded-sm p-6 w-full max-w-sm mx-4 relative animate-fade-in">
        {/* Close button */}
        {formState !== "submitting" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        )}

        {formState === "success" ? (
          <div className="flex flex-col items-center py-8 gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Check size={24} className="text-primary" />
            </div>
            <p className="font-serif text-2xl text-text">Sent!</p>
            <p className="text-text-muted text-sm">Thanks for saying hello</p>
          </div>
        ) : (
          <>
            <h3 className="font-serif text-2xl text-text mb-1">
              Almost there!
            </h3>
            <p className="font-pixel text-xs text-secondary uppercase tracking-wider mb-6">
              Leave your name and email
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-text-muted text-xs font-pixel uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  disabled={formState === "submitting"}
                  className="w-full bg-bg border border-border rounded-sm px-3 py-2 text-text text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-primary/60 transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-text-muted text-xs font-pixel uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={formState === "submitting"}
                  className="w-full bg-bg border border-border rounded-sm px-3 py-2 text-text text-sm placeholder:text-text-muted/40 focus:outline-none focus:border-primary/60 transition-colors disabled:opacity-50"
                />
              </div>

              {errorMsg && (
                <p className="text-red-400 text-xs font-sans">{errorMsg}</p>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={formState === "submitting"}
                  className="flex-1 py-2.5 font-pixel text-xs uppercase tracking-wider text-text-muted border border-border rounded-sm hover:text-text hover:border-text-muted transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="flex-1 py-2.5 font-pixel text-xs uppercase tracking-wider text-bg bg-primary rounded-sm hover:bg-primary/80 transition-colors cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {formState === "submitting" ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending
                    </>
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
