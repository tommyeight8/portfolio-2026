// src/app/admin/messages/page.tsx

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useContacts,
  useDeleteContact,
  useMarkAsRead,
  useMarkAsUnread,
  useUnreadCount,
} from "@/hooks/useContacts";
import { ContactSubmission } from "@/types/contact.types";
import {
  Mail,
  MailOpen,
  Trash2,
  Loader2,
  Search,
  User,
  Building,
  ChevronRight,
  X,
  Reply,
} from "lucide-react";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { formatDistanceToNow } from "date-fns";

export default function AdminMessagesPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedMessage, setSelectedMessage] =
    useState<ContactSubmission | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  // Queries
  const { data, isLoading, error } = useContacts({
    ...(filter === "unread" ? { read: "false" } : {}),
    ...(filter === "read" ? { read: "true" } : {}),
    ...(search ? { search } : {}),
  });
  const { data: unreadData } = useUnreadCount();

  // Mutations
  const deleteContact = useDeleteContact();
  const markAsRead = useMarkAsRead();
  const markAsUnread = useMarkAsUnread();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteContact.mutateAsync(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleToggleRead = async (message: ContactSubmission) => {
    if (message.read) {
      await markAsUnread.mutateAsync(message.id);
      if (selectedMessage?.id === message.id) {
        setSelectedMessage({ ...message, read: false });
      }
    } else {
      await markAsRead.mutateAsync(message.id);
      if (selectedMessage?.id === message.id) {
        setSelectedMessage({ ...message, read: true });
      }
    }
  };

  const handleSelectMessage = async (message: ContactSubmission) => {
    setSelectedMessage(message);
    if (!message.read) {
      await markAsRead.mutateAsync(message.id);
      setSelectedMessage({ ...message, read: true });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2
          className={`w-8 h-8 animate-spin ${
            isDark ? "text-white/40" : "text-slate-400"
          }`}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-400">Failed to load messages</p>
      </div>
    );
  }

  const messages = data?.data ?? [];
  const unreadCount = unreadData?.data?.count ?? 0;

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div
        className={`p-6 border-b ${
          isDark ? "border-white/10" : "border-black/10"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Messages
            </h1>
            <p
              className={`mt-1 ${isDark ? "text-white/50" : "text-slate-500"}`}
            >
              {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isDark ? "text-white/40" : "text-slate-400"
                }`}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..."
                className={`
                  pl-10 pr-4 py-2 rounded-xl border outline-none w-64
                  transition-all
                  ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500/50"
                      : "bg-white border-black/10 text-slate-900 placeholder:text-slate-400 focus:border-violet-500"
                  }
                `}
              />
            </div>

            {/* Filter */}
            <div className="flex rounded-xl overflow-hidden">
              {(["all", "unread", "read"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`
                    px-4 py-2 text-sm font-medium capitalize transition-colors
                    ${
                      filter === f
                        ? isDark
                          ? "bg-violet-500/20 text-violet-400"
                          : "bg-violet-100 text-violet-600"
                        : isDark
                        ? "bg-white/5 text-white/60 hover:bg-white/10"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }
                  `}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Message List */}
        <div
          className={`w-full md:w-[200px] lg:w-[250px] border-r overflow-y-auto ${
            isDark ? "border-white/10" : "border-black/10"
          } ${selectedMessage ? "hidden md:block" : ""}`}
        >
          <AnimatePresence>
            {messages.length === 0 ? (
              <div className="p-8 text-center">
                <Mail
                  className={`w-12 h-12 mx-auto mb-4 ${
                    isDark ? "text-white/20" : "text-slate-300"
                  }`}
                />
                <p className={isDark ? "text-white/50" : "text-slate-500"}>
                  {search ? "No messages found" : "No messages yet"}
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => handleSelectMessage(message)}
                  className={`
                    p-4 border-b cursor-pointer transition-colors
                    ${isDark ? "border-white/10" : "border-black/10"}
                    ${
                      selectedMessage?.id === message.id
                        ? isDark
                          ? "bg-violet-500/10"
                          : "bg-violet-50"
                        : isDark
                        ? "hover:bg-white/5"
                        : "hover:bg-black/5"
                    }
                    ${
                      !message.read
                        ? isDark
                          ? "bg-white/5"
                          : "bg-slate-50"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    {/* Unread indicator */}
                    <div className="pt-2">
                      {!message.read ? (
                        <div className="w-2 h-2 rounded-full bg-violet-500" />
                      ) : (
                        <div className="w-2 h-2" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`font-medium truncate ${
                            isDark ? "text-white" : "text-slate-900"
                          } ${!message.read ? "font-semibold" : ""}`}
                        >
                          {message.name}
                        </p>
                        <span
                          className={`text-xs shrink-0 ${
                            isDark ? "text-white/40" : "text-slate-400"
                          }`}
                        >
                          {formatDistanceToNow(new Date(message.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>

                      <p
                        className={`text-sm truncate mt-0.5 ${
                          isDark ? "text-white/70" : "text-slate-700"
                        } ${!message.read ? "font-medium" : ""}`}
                      >
                        {message.subject}
                      </p>

                      <p
                        className={`text-sm truncate mt-1 ${
                          isDark ? "text-white/40" : "text-slate-500"
                        }`}
                      >
                        {message.message}
                      </p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-2 ${
                        isDark ? "text-white/30" : "text-slate-300"
                      }`}
                    />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Message Detail */}
        <div
          className={`flex-1 overflow-y-auto ${
            !selectedMessage ? "hidden md:block" : ""
          }`}
        >
          {selectedMessage ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full flex flex-col"
            >
              {/* Detail Header */}
              <div
                className={`p-6 border-b ${
                  isDark ? "border-white/10" : "border-black/10"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className={`md:hidden p-1 rounded-lg ${
                          isDark ? "hover:bg-white/10" : "hover:bg-black/5"
                        }`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <h2
                        className={`text-xl font-semibold ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {selectedMessage.subject}
                      </h2>
                    </div>
                    <p
                      className={`text-sm ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      {formatDistanceToNow(
                        new Date(selectedMessage.createdAt),
                        { addSuffix: true }
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleRead(selectedMessage)}
                      disabled={markAsRead.isPending || markAsUnread.isPending}
                      className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                        isDark
                          ? "text-white/50 hover:text-white hover:bg-white/10"
                          : "text-slate-400 hover:text-slate-900 hover:bg-black/5"
                      }`}
                      title={
                        selectedMessage.read ? "Mark as unread" : "Mark as read"
                      }
                    >
                      {selectedMessage.read ? (
                        <Mail className="w-5 h-5" />
                      ) : (
                        <MailOpen className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      disabled={deleteContact.isPending}
                      className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                        isDark
                          ? "text-white/50 hover:text-red-400 hover:bg-red-500/10"
                          : "text-slate-400 hover:text-red-500 hover:bg-red-50"
                      }`}
                    >
                      {deleteContact.isPending ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Sender Info */}
              <div
                className={`p-6 border-b ${
                  isDark ? "border-white/10" : "border-black/10"
                }`}
              >
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isDark ? "bg-white/10" : "bg-slate-100"
                      }`}
                    >
                      <User
                        className={`w-5 h-5 ${
                          isDark ? "text-white/70" : "text-slate-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-sm ${
                          isDark ? "text-white/50" : "text-slate-500"
                        }`}
                      >
                        From
                      </p>
                      <p
                        className={`font-medium ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {selectedMessage.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        isDark ? "bg-white/10" : "bg-slate-100"
                      }`}
                    >
                      <Mail
                        className={`w-5 h-5 ${
                          isDark ? "text-white/70" : "text-slate-600"
                        }`}
                      />
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
                        href={`mailto:${selectedMessage.email}`}
                        className={`font-medium hover:text-violet-500 transition-colors ${
                          isDark ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>

                  {selectedMessage.company && (
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${
                          isDark ? "bg-white/10" : "bg-slate-100"
                        }`}
                      >
                        <Building
                          className={`w-5 h-5 ${
                            isDark ? "text-white/70" : "text-slate-600"
                          }`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            isDark ? "text-white/50" : "text-slate-500"
                          }`}
                        >
                          Company
                        </p>
                        <p
                          className={`font-medium ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {selectedMessage.company}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Body */}
              <div className="flex-1 p-6">
                <div
                  className={`
                    p-6 rounded-2xl backdrop-blur-xl border
                    ${
                      isDark
                        ? "bg-white/5 border-white/10"
                        : "bg-white/70 border-black/10"
                    }
                  `}
                >
                  <p
                    className={`leading-relaxed whitespace-pre-wrap ${
                      isDark ? "text-white/80" : "text-slate-700"
                    }`}
                  >
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Reply Action */}
              <div
                className={`p-6 border-t ${
                  isDark ? "border-white/10" : "border-black/10"
                }`}
              >
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className={`
                    inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                    transition-all hover:scale-105
                    ${
                      isDark
                        ? "bg-white text-slate-900 hover:shadow-lg hover:shadow-white/20"
                        : "bg-slate-900 text-white hover:shadow-lg hover:shadow-slate-900/20"
                    }
                  `}
                >
                  <Reply className="w-4 h-4" />
                  Reply via Email
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Mail
                  className={`w-16 h-16 mx-auto mb-4 ${
                    isDark ? "text-white/10" : "text-slate-200"
                  }`}
                />
                <p className={isDark ? "text-white/50" : "text-slate-500"}>
                  Select a message to read
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
