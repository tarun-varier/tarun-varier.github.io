import { useState, useEffect, useCallback } from "react";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";

interface HelloMessage {
  id: string;
  name: string;
  email: string;
  image_url: string;
  text_content: string | null;
  created_at: string;
}

const SESSION_KEY = "hellos_authed";

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function Hellos() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [messages, setMessages] = useState<HelloMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // Check session on mount
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      setIsAuthed(true);
    }
  }, []);

  // Fetch messages when authenticated
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("hello_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthed) {
      fetchMessages();
    }
  }, [isAuthed, fetchMessages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(false);

    try {
      const hash = await hashPassword(password);
      const storedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH as string;

      if (hash === storedHash) {
        sessionStorage.setItem(SESSION_KEY, "true");
        setIsAuthed(true);
      } else {
        setAuthError(true);
      }
    } catch {
      setAuthError(true);
    } finally {
      setAuthLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  };

  // Password gate
  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="w-full max-w-xs">
          <div className="bg-bg border border-border rounded-sm p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Lock size={20} className="text-primary" />
              </div>
              <h1 className="font-serif text-2xl text-text">Hello Messages</h1>
              <p className="font-pixel text-xs text-secondary uppercase tracking-wider mt-1">
                Admin Access
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError(false);
                }}
                placeholder="Password"
                autoFocus
                className={`w-full bg-bg border rounded-sm px-3 py-2.5 text-text text-sm placeholder:text-text-muted/40 focus:outline-none transition-colors ${
                  authError
                    ? "border-red-400 animate-shake"
                    : "border-border focus:border-primary/60"
                }`}
              />

              {authError && (
                <p className="text-red-400 text-xs font-sans text-center">
                  Incorrect password
                </p>
              )}

              <button
                type="submit"
                disabled={authLoading || !password}
                className="w-full py-2.5 font-pixel text-xs uppercase tracking-wider text-bg bg-primary rounded-sm hover:bg-primary/80 transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  "Enter"
                )}
              </button>
            </form>
          </div>

          <a
            href="#/"
            className="flex items-center justify-center gap-2 mt-4 text-text-muted hover:text-text text-sm transition-colors"
          >
            <ArrowLeft size={14} />
            Back to portfolio
          </a>
        </div>
      </div>
    );
  }

  // Authenticated view
  return (
    <div className="min-h-screen bg-bg px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-3xl text-text">Hello Messages</h1>
            <p className="font-pixel text-xs text-secondary uppercase tracking-wider mt-1">
              {messages.length} message{messages.length !== 1 ? "s" : ""}
            </p>
          </div>
          <a
            href="#/"
            className="flex items-center gap-2 text-text-muted hover:text-text text-sm transition-colors font-pixel uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            Back
          </a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={24} className="animate-spin text-primary" />
          </div>
        )}

        {/* Empty state */}
        {!loading && messages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted text-sm">No messages yet</p>
          </div>
        )}

        {/* Grid */}
        {!loading && messages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="border border-border rounded-sm overflow-hidden bg-bg"
              >
                {/* Image */}
                <div className="aspect-square bg-[#2A2233] flex items-center justify-center">
                  <img
                    src={msg.image_url}
                    alt={`Hello from ${msg.name}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="p-4 border-t border-border">
                  <p className="font-serif text-lg text-text">{msg.name}</p>
                  <p className="text-text-muted text-xs mt-0.5">{msg.email}</p>

                  {/* Text content */}
                  {msg.text_content && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="font-pixel text-xs text-secondary uppercase tracking-wider mb-1.5">
                        Text Content
                      </p>
                      <p className="text-text text-sm leading-relaxed">
                        {msg.text_content}
                      </p>
                    </div>
                  )}

                  {/* Timestamp */}
                  <p className="text-text-muted/60 text-xs mt-3">
                    {formatDate(msg.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
