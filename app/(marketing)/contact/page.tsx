// src/app/(marketing)/contact/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { useCreateContact } from "@/hooks/useContacts";

// ============ GLASS CARD ============

function GlassCard({
  children,
  className = "",
  isDark,
}: {
  children: React.ReactNode;
  className?: string;
  isDark: boolean;
}) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl 
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.1)]
        transition-all duration-300
        ${
          isDark
            ? "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
            : "bg-black/[0.02] border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com",
    label: "GitHub",
    color: "#8b5cf6",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "#06b6d4",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter",
    color: "#d946ef",
  },
];

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createContact = useCreateContact();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await createContact.mutateAsync({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        subject: formData.subject,
        message: formData.message,
      });
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Failed to send message:", err);
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  const inputClass = `
    w-full px-4 py-3 rounded-xl outline-none
    backdrop-blur-xl
    
    transition-all duration-300
    ${
      isDark
        ? "bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:bg-white/[0.05]"
        : "bg-black/[0.02] border border-black/[0.06] text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:bg-black/[0.04]"
    }
  `;

  const labelClass = `block text-xs font-medium uppercase tracking-wide mb-2 ${
    isDark ? "text-zinc-400" : "text-slate-500"
  }`;

  return (
    <main className={`min-h-screen pt-32 pb-20 transition-colors duration-500`}>
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-16 pb-6 border-b ${
            isDark ? "border-white/[0.08]" : "border-black/[0.06]"
          }`}
        >
          <h1
            className={`text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Let&apos;s Work{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Together
            </span>
          </h1>
          <p
            className={`text-lg max-w-2xl leading-relaxed ${
              isDark ? "text-zinc-400" : "text-slate-600"
            }`}
          >
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Email Card */}
            <GlassCard isDark={isDark} className="p-6 group">
              <div
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: "#8b5cf6" }}
              />
              <div className="relative flex items-center gap-4">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: "rgba(139, 92, 246, 0.2)" }}
                >
                  <Mail className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <p
                    className={`text-xs uppercase tracking-wide ${
                      isDark ? "text-zinc-500" : "text-slate-500"
                    }`}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:Tommyvong88@gmail.com"
                    className={`font-semibold hover:text-violet-500 transition-colors ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Tommyvong88@gmail.com
                  </a>
                </div>
              </div>
            </GlassCard>

            {/* Location Card */}
            <GlassCard isDark={isDark} className="p-6 group">
              <div
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: "#06b6d4" }}
              />
              <div className="relative flex items-center gap-4">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: "rgba(6, 182, 212, 0.2)" }}
                >
                  <MapPin className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <p
                    className={`text-xs uppercase tracking-wide ${
                      isDark ? "text-zinc-500" : "text-slate-500"
                    }`}
                  >
                    Location
                  </p>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Los Angeles, CA
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Social Links */}
            <GlassCard isDark={isDark} className="p-6 group">
              <div
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: "#d946ef" }}
              />
              <div className="relative">
                <p
                  className={`text-xs uppercase tracking-wide mb-4 ${
                    isDark ? "text-zinc-500" : "text-slate-500"
                  }`}
                >
                  Connect with me
                </p>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1
                        
                        ${
                          isDark
                            ? "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
                            : "bg-black/[0.02] border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
                        }
                      `}
                      aria-label={label}
                      style={{ color }}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Availability */}
            <GlassCard isDark={isDark} className="p-6 group">
              <div
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: "#10b981" }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse " />
                  <span
                    className={`text-sm font-semibold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Available for projects
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-zinc-500" : "text-slate-500"
                  }`}
                >
                  Let's create something awesome!
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <GlassCard isDark={isDark} className="p-8 group">
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: "#8b5cf6" }}
              />
              <div className="relative">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                      style={{ backgroundColor: "rgba(16, 185, 129, 0.2)" }}
                    >
                      <Send className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3
                      className={`text-2xl font-bold tracking-tight mb-2 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      Message Sent!
                    </h3>
                    <p className={isDark ? "text-zinc-400" : "text-slate-600"}>
                      Thank you for reaching out. I&apos;ll get back to you
                      within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className={`
                        mt-6 px-6 py-3 rounded-xl text-sm font-medium
                        backdrop-blur-xl
                        transition-all duration-300
                        ${
                          isDark
                            ? "bg-white/[0.03] text-white border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]"
                            : "bg-black/[0.02] text-slate-900 border border-black/[0.06] hover:bg-black/[0.04] hover:border-black/[0.10]"
                        }
                      `}
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          minLength={2}
                          className={inputClass}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className={labelClass}>
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder="Your company (optional)"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className={labelClass}>
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          minLength={2}
                          className={inputClass}
                          placeholder="Project inquiry"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClass}>
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        minLength={10}
                        rows={5}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={createContact.isPending}
                      className={`
                        cursor-pointer w-full py-4 rounded-xl font-medium
                        flex items-center justify-center gap-2
                        transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${
                          isDark
                            ? "bg-white text-slate-900 hover:shadow-[0_12px_40px_rgba(255,255,255,0.1)]"
                            : "bg-gray-300 text-gray-600 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
                        }
                      `}
                    >
                      {createContact.isPending ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
