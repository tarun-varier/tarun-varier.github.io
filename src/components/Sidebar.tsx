import { useState } from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Copy,
  Check,
} from "lucide-react";
import cutout from "../assets/cutout.png";

const socialLinks = [
  { icon: Github, href: "https://github.com/tarun-varier", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/t03run", label: "Twitter" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/tarun-varier",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://instagram.com/t03run",
    label: "Instagram",
  },
];

export default function Sidebar() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("t4runv4rier@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-100 flex flex-col justify-center px-8 py-10 z-10 max-lg:static max-lg:w-full max-lg:h-auto max-lg:items-center max-lg:text-center">
      {/* Profile Image */}
      <div className="-mb-3 ml-[calc(-1.01rem+0.3px)]">
        <img
          src={cutout}
          alt="Tarun Varier"
          className="w-40 h-40 object-cover object-top rounded-sm "
        />
      </div>

      <div className="bg-[#78566E] z-1000 p-3 w-full max-lg:max-w-md">
        {/* Name */}
        <h1 className="font-serif text-4xl text-text leading-tight mb-1">
          Tarun Varier
        </h1>

        {/* Subtitle */}
        <p className="font-pixel text-sm text-secondary font-bold uppercase tracking-widest mb-4">
          Developer • Designer 
        </p>

        {/* Location */}
        <div className="flex items-center gap-2 text-text text-sm mb-4 max-lg:justify-center">
          <MapPin size={14} />
          <span>Kottayam, India</span>
        </div>

        {/* Bio */}
        <p className="text-text text-sm italic leading-relaxed mb-4 max-lg:max-w-md">
          Shipping products that people can't live without
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4 max-lg:justify-center">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-text/60 hover:text-primary transition-colors duration-200"
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full border border-border overflow-hidden max-lg:max-w-md">
        <a
          href="https://drive.google.com/file/d/1jsuihxDt6LnXyaMpot4PWpN7_2vsvFp7/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 font-pixel text-sm uppercase tracking-wider text-text bg-primary/55 hover:bg-primary/60 transition-colors duration-200 border-r border-border"
        >
          Resume
        </a>
        <button
          onClick={handleCopyEmail}
          className="flex-1 flex items-center justify-center gap-2 py-3 font-pixel text-sm uppercase tracking-wider text-text bg-primary/55 hover:bg-primary/60 transition-colors duration-200 cursor-pointer"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Email"}
        </button>
      </div>

      {/* Copy Toast Notification */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-border border border-text/10 text-text font-pixel text-sm px-6 py-3 shadow-xl z-[100] transition-all duration-300 flex items-center gap-2 ${
          copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <Check size={16} className="text-secondary" />
        Email address copied!
      </div>
    </aside>
  );
}
