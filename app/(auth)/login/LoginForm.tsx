// src/app/(auth)/login/LoginForm.tsx

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  KeyRound,
  Loader2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/lib/providers/ThemeProvider";

type Step = "email" | "pin";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const error = searchParams.get("error");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(
    error
      ? { type: "error", text: "Invalid credentials. Please try again." }
      : null,
  );

  const handleRequestPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/request-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setStep("pin");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to send PIN" });
      }
    } catch {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await signIn("pin-login", {
        email,
        pin,
        redirect: false,
      });

      if (result?.error) {
        setMessage({ type: "error", text: "Invalid PIN. Please try again." });
        setPin("");
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 6);
    setPin(cleaned);
  };

  return (
    <div
      className={`
        min-h-dvh flex items-center justify-center p-4 transition-colors duration-300
        ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-gradient-to-br from-slate-100 via-white to-slate-100"
        }
      `}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div
          className={`
            rounded-3xl p-8 shadow-2xl border transition-colors duration-300
            ${
              isDark
                ? "bg-slate-900/80 border-white/10"
                : "bg-white border-slate-200"
            }
          `}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <h1
              className={`text-3xl font-bold transition-colors duration-300 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Admin<span className="text-violet-500">.</span>
            </h1>
            <p
              className={`mt-2 transition-colors duration-300 ${isDark ? "text-white/50" : "text-slate-500"}`}
            >
              Sign in to continue
            </p>
          </div>

          {/* Error/Success Message */}
          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                  message.type === "error"
                    ? "bg-red-500/10 border border-red-500/20 text-red-500"
                    : "bg-green-500/10 border border-green-500/20 text-green-500"
                }`}
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm">{message.text}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.form
                key="email-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleRequestPin}
                className="space-y-6"
              >
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDark ? "text-white/80" : "text-slate-700"}`}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isDark ? "text-white/40" : "text-slate-400"}`}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@example.com"
                      className={`
                        w-full pl-12 pr-4 py-4 rounded-xl border outline-none transition-all
                        ${
                          isDark
                            ? "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50 focus:bg-white/10"
                            : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:bg-white"
                        }
                      `}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading || !email}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all
                    ${
                      isDark
                        ? "bg-white text-slate-900 hover:shadow-lg hover:shadow-white/20"
                        : "bg-slate-900 text-white hover:shadow-lg hover:shadow-slate-900/20"
                    }
                  `}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending PIN...
                    </>
                  ) : (
                    <>
                      Send PIN
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="pin-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleVerifyPin}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      className={`text-sm font-medium transition-colors duration-300 ${isDark ? "text-white/80" : "text-slate-700"}`}
                    >
                      Enter PIN
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setStep("email");
                        setPin("");
                        setMessage(null);
                      }}
                      className="text-sm text-violet-500 hover:text-violet-400 flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Change email
                    </button>
                  </div>

                  <p
                    className={`text-sm mb-4 transition-colors duration-300 ${isDark ? "text-white/50" : "text-slate-500"}`}
                  >
                    We sent a 6-digit PIN to{" "}
                    <span
                      className={`transition-colors duration-300 ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                      {email}
                    </span>
                  </p>

                  <div className="relative">
                    <KeyRound
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isDark ? "text-white/40" : "text-slate-400"}`}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={pin}
                      onChange={(e) => handlePinChange(e.target.value)}
                      required
                      placeholder="000000"
                      maxLength={6}
                      className={`
                        w-full pl-12 pr-4 py-4 rounded-xl border text-center text-2xl font-mono tracking-[0.5em] outline-none transition-all
                        ${
                          isDark
                            ? "bg-white/5 border-white/10 text-white placeholder:text-white/30 placeholder:tracking-[0.5em] focus:border-violet-500/50 focus:bg-white/10"
                            : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 placeholder:tracking-[0.5em] focus:border-violet-500 focus:bg-white"
                        }
                      `}
                      disabled={isLoading}
                      autoFocus
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading || pin.length !== 6}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all
                    ${
                      isDark
                        ? "bg-white text-slate-900 hover:shadow-lg hover:shadow-white/20"
                        : "bg-slate-900 text-white hover:shadow-lg hover:shadow-slate-900/20"
                    }
                  `}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={handleRequestPin}
                  disabled={isLoading}
                  className={`w-full text-center text-sm transition-colors disabled:opacity-50 ${isDark ? "text-white/50 hover:text-white/80" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Didn&apos;t receive the PIN? Send again
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p
          className={`text-center text-sm mt-6 transition-colors duration-300 ${isDark ? "text-white/30" : "text-slate-400"}`}
        >
          Protected area. Authorized personnel only.{" "}
          <Link
            href="/"
            className="text-violet-500 hover:text-violet-400 transition"
          >
            Back To Site
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
