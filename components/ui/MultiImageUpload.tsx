// src/components/ui/MultiImageUpload.tsx

"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
  AlertCircle,
  GripVertical,
  Plus,
} from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";
import Image from "next/image";

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  label?: string;
  hint?: string;
  disabled?: boolean;
  maxImages?: number;
}

export function MultiImageUpload({
  value = [],
  onChange,
  folder = "portfolio",
  label,
  hint,
  disabled = false,
  maxImages = 10,
}: MultiImageUploadProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
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

      return data.data.url;
    } catch (err) {
      console.error("Upload error:", err);
      return null;
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (value.length + acceptedFiles.length > maxImages) {
        setError(`Maximum ${maxImages} images allowed`);
        return;
      }

      setIsUploading(true);
      setError(null);

      const uploadPromises = acceptedFiles.map((file) => uploadFile(file));
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(
        (url): url is string => url !== null
      );

      if (successfulUploads.length > 0) {
        onChange([...value, ...successfulUploads]);
      }

      if (successfulUploads.length < acceptedFiles.length) {
        setError(
          `${
            acceptedFiles.length - successfulUploads.length
          } file(s) failed to upload`
        );
      }

      setIsUploading(false);
    },
    [value, onChange, folder, maxImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/gif": [".gif"],
    },
    disabled: disabled || isUploading || value.length >= maxImages,
  });

  const handleRemove = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  const handleReorder = (newOrder: string[]) => {
    onChange(newOrder);
  };

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center justify-between">
          <label
            className={`text-sm font-medium ${
              isDark ? "text-white/80" : "text-slate-700"
            }`}
          >
            {label}
          </label>
          <span
            className={`text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}
          >
            {value.length}/{maxImages}
          </span>
        </div>
      )}

      {/* Image Grid */}
      {value.length > 0 && (
        <Reorder.Group
          axis="x"
          values={value}
          onReorder={handleReorder}
          className="flex flex-wrap gap-3"
        >
          {value.map((url, index) => (
            <Reorder.Item key={url} value={url} className="relative group">
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`
                  relative w-32 h-32 rounded-xl overflow-hidden border cursor-grab active:cursor-grabbing
                  ${isDark ? "border-gray-300/10" : "border-black/10"}
                `}
              >
                <Image
                  src={url}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />

                {/* Drag Handle */}
                <div
                  className={`
                    absolute top-2 left-2 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity
                    ${isDark ? "bg-black/60" : "bg-white/80"}
                  `}
                >
                  <GripVertical
                    className={`w-4 h-4 ${
                      isDark ? "text-white" : "text-slate-600"
                    }`}
                  />
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  disabled={disabled}
                  className={`
                    absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity
                    bg-red-500 text-white hover:bg-red-600 disabled:opacity-50
                  `}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Index Badge */}
                <div
                  className={`
                    absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-xs font-medium
                    ${
                      isDark
                        ? "bg-black/60 text-white"
                        : "bg-white/80 text-slate-900"
                    }
                  `}
                >
                  {index + 1}
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}

      {/* Dropzone */}
      {value.length < maxImages && (
        <div
          {...getRootProps()}
          className={`
            flex flex-col items-center justify-center p-6 rounded-xl
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
            ${disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <input {...getInputProps()} />

          {isUploading ? (
            <>
              <Loader2
                className={`w-8 h-8 mb-2 animate-spin ${
                  isDark ? "text-violet-400" : "text-violet-500"
                }`}
              />
              <p
                className={`text-sm ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Uploading...
              </p>
            </>
          ) : (
            <>
              {isDragActive ? (
                <Upload
                  className={`w-8 h-8 mb-2 ${
                    isDark ? "text-violet-400" : "text-violet-500"
                  }`}
                />
              ) : (
                <Plus
                  className={`w-8 h-8 mb-2 ${
                    isDark ? "text-white/40" : "text-slate-400"
                  }`}
                />
              )}

              <p
                className={`text-sm ${
                  isDark ? "text-white/70" : "text-slate-600"
                }`}
              >
                {isDragActive ? "Drop images here" : "Add more images"}
              </p>
            </>
          )}
        </div>
      )}

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
