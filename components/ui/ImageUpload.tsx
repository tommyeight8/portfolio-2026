// src/components/ui/ImageUpload.tsx

"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  folder?: string;
  label?: string;
  hint?: string;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  folder = "portfolio",
  label,
  hint,
  disabled = false,
}: ImageUploadProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        uploadFile(acceptedFiles[0]);
      }
    },
    [folder, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/gif": [".gif"],
    },
    maxFiles: 1,
    disabled: disabled || isUploading,
  });

  const handleRemove = () => {
    onChange("");
    onRemove?.();
  };

  return (
    <div className="space-y-2">
      {label && (
        <label
          className={`block text-sm font-medium ${
            isDark ? "text-white/80" : "text-slate-700"
          }`}
        >
          {label}
        </label>
      )}

      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative group"
          >
            <div
              className={`
                relative aspect-video rounded-xl overflow-hidden border
                ${isDark ? "border-gray-300/10" : "border-black/10"}
              `}
            >
              <Image
                src={value}
                alt="Uploaded image"
                fill
                className="object-cover"
              />

              {/* Overlay */}
              <div
                className={`
                  absolute inset-0 flex items-center justify-center gap-2
                  opacity-0 group-hover:opacity-100 transition-opacity
                  ${isDark ? "bg-black/60" : "bg-black/40"}
                `}
              >
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={disabled}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div
              {...getRootProps()}
              className={`
                relative flex flex-col items-center justify-center p-8 rounded-xl
                border-2 border-dashed cursor-pointer transition-all
                ${
                  isDragActive
                    ? isDark
                      ? "border-violet-500 bg-violet-500/10"
                      : "border-violet-500 bg-violet-50"
                    : isDark
                    ? "border-white/20 hover:border-white/40 hover:bg-white/5"
                    : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                }
                ${
                  disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""
                }
              `}
            >
              <input {...getInputProps()} />

              {isUploading ? (
                <>
                  <Loader2
                    className={`w-10 h-10 mb-3 animate-spin ${
                      isDark ? "text-violet-400" : "text-violet-500"
                    }`}
                  />
                  <p
                    className={`text-sm font-medium ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Uploading...
                  </p>
                </>
              ) : (
                <>
                  <div
                    className={`
                      p-3 rounded-xl mb-3
                      ${isDark ? "bg-white/10" : "bg-slate-100"}
                    `}
                  >
                    {isDragActive ? (
                      <Upload
                        className={`w-8 h-8 ${
                          isDark ? "text-violet-400" : "text-violet-500"
                        }`}
                      />
                    ) : (
                      <ImageIcon
                        className={`w-8 h-8 ${
                          isDark ? "text-white/50" : "text-slate-400"
                        }`}
                      />
                    )}
                  </div>

                  {isDragActive ? (
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-violet-400" : "text-violet-500"
                      }`}
                    >
                      Drop the image here
                    </p>
                  ) : (
                    <>
                      <p
                        className={`text-sm font-medium ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Drag & drop an image here
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          isDark ? "text-white/50" : "text-slate-500"
                        }`}
                      >
                        or click to browse
                      </p>
                    </>
                  )}

                  <p
                    className={`text-xs mt-3 ${
                      isDark ? "text-white/30" : "text-slate-400"
                    }`}
                  >
                    JPEG, PNG, WebP, GIF up to 10MB
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-400 text-sm"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}

      {/* Hint */}
      {hint && !error && (
        <p className={`text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}>
          {hint}
        </p>
      )}
    </div>
  );
}
