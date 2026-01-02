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

type Step = "email" | "pin";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const error = searchParams.get("error");

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
      : null
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-violet-500/20 animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] bg-cyan-500/15 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-gray-300/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Admin<span className="text-violet-500">.</span>
            </h1>
            <p className="text-white/50 mt-2">Sign in to continue</p>
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
                    ? "bg-red-500/10 border border-red-500/20 text-red-400"
                    : "bg-green-500/10 border border-green-500/20 text-green-400"
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
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@example.com"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-gray-300/10 text-white placeholder:text-white/30 outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading || !email}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-white text-slate-900 font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                    <label className="text-sm font-medium text-white/80">
                      Enter PIN
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setStep("email");
                        setPin("");
                        setMessage(null);
                      }}
                      className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Change email
                    </button>
                  </div>

                  <p className="text-white/50 text-sm mb-4">
                    We sent a 6-digit PIN to{" "}
                    <span className="text-white">{email}</span>
                  </p>

                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={pin}
                      onChange={(e) => handlePinChange(e.target.value)}
                      required
                      placeholder="000000"
                      maxLength={6}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-gray-300/10 text-white text-center text-2xl font-mono tracking-[0.5em] placeholder:text-white/30 placeholder:tracking-[0.5em] outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
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
                  className="w-full py-4 rounded-xl bg-white text-slate-900 font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                  className="w-full text-center text-sm text-white/50 hover:text-white/80 transition-colors disabled:opacity-50"
                >
                  Didn&apos;t receive the PIN? Send again
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <p className="text-center text-white/30 text-sm mt-6">
          Protected area. Authorized personnel only.{" "}
          <Link
            href={"/"}
            className="text-violet-500 hover:text-violet-500 transition
          "
          >
            Back To Site
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
