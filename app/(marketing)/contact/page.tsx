// src/app/(marketing)/contact/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { useCreateContact } from "@/hooks/useContacts";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
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

  const inputClass = `w-full px-4 py-3 rounded-xl border outline-none transition-all ${
    isDark
      ? "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:bg-white/10"
      : "bg-white border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:shadow-lg"
  }`;

  const labelClass = `block text-sm font-medium mb-2 ${
    isDark ? "text-white/80" : "text-slate-700"
  }`;

  return (
    <main
      className={`min-h-screen pt-32 pb-20 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950"
          : "bg-gradient-to-br from-slate-50 via-violet-100/30 to-slate-50"
      }`}
    >
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-16 pb-6 border-b ${
            isDark ? "border-gray-800" : "border-gray-300"
          }`}
        >
          {/* <span
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
              isDark
                ? "bg-cyan-500/20 text-cyan-300"
                : "bg-cyan-100 text-cyan-600"
            }`}
          >
            Get in Touch
          </span> */}
          <h1
            className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-6 ${
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
              isDark ? "text-white/60" : "text-slate-600"
            }`}
          >
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Email Card */}
            <div
              className={`p-6 rounded-2xl backdrop-blur-xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/70 border-black/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    isDark ? "bg-violet-500/20" : "bg-violet-100"
                  }`}
                >
                  <Mail className="w-6 h-6 text-violet-500" />
                </div>
                <div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-white/50" : "text-slate-500"
                    }`}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:hello@example.com"
                    className={`font-medium hover:text-violet-500 transition-colors ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Tommyvong88@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div
              className={`p-6 rounded-2xl backdrop-blur-xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/70 border-black/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    isDark ? "bg-teal-500/20" : "bg-cyan-100"
                  }`}
                >
                  <MapPin className="w-6 h-6 text-teal-500" />
                </div>
                <div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-white/50" : "text-slate-500"
                    }`}
                  >
                    Location
                  </p>
                  <p
                    className={`font-medium ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Los Angeles, CA
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div
              className={`p-6 rounded-2xl backdrop-blur-xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/70 border-black/10"
              }`}
            >
              <p
                className={`text-sm mb-4 ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                Connect with me
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl transition-all hover:scale-110 ${
                      isDark
                        ? "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div
              className={`p-6 rounded-2xl backdrop-blur-xl border ${
                isDark
                  ? "bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border-white/10"
                  : "bg-gradient-to-br from-violet-100/50 to-fuchsia-100/50 border-black/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span
                  className={`text-sm font-medium ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Available for projects
                </span>
              </div>
              <p
                className={`text-sm ${
                  isDark ? "text-white/50" : "text-slate-500"
                }`}
              >
                Let's create something awesome!
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div
              className={`p-8 rounded-3xl backdrop-blur-xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/70 border-black/10"
              }`}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div
                    className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${
                      isDark ? "bg-green-500/20" : "bg-green-100"
                    }`}
                  >
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Message Sent!
                  </h3>
                  <p className={isDark ? "text-white/60" : "text-slate-600"}>
                    Thank you for reaching out. I&apos;ll get back to you within
                    24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className={`mt-6 px-6 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isDark
                        ? "bg-white/10 text-white hover:bg-white/20"
                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    }`}
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
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
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
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`cursor-pointer w-full py-4 rounded-2xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDark
                        ? "bg-white text-slate-900 hover:shadow-lg hover:shadow-white/20"
                        : "bg-slate-900 text-white hover:shadow-lg hover:shadow-slate-900/20"
                    }`}
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
          </motion.div>
        </div>
      </div>
    </main>
  );
}
