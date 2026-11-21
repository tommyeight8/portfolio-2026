"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div className="card px-6 py-12 text-center" role="status">
        <h2 className="font-display text-2xl font-semibold">Message sent</h2>
        <p className="mt-3 text-muted">Thanks for reaching out. I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  const field = (
    name: "name" | "email" | "company" | "subject",
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <label className="block text-sm">
      <span className="text-muted">{label}</span>
      <input
        name={name}
        defaultValue={state.values?.[name]}
        aria-invalid={Boolean(state.errors?.[name])}
        className="field mt-2"
        {...props}
      />
      {state.errors?.[name] && (
        <span className="mt-1 block text-rose-500">{state.errors[name]}</span>
      )}
    </label>
  );

  return (
    <form action={action} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Name", { autoComplete: "name", required: true })}
        {field("email", "Email", { type: "email", autoComplete: "email", required: true })}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("company", "Company (optional)", { autoComplete: "organization" })}
        {field("subject", "Subject", { required: true })}
      </div>
      <label className="block text-sm">
        <span className="text-muted">Message</span>
        <textarea
          name="message"
          rows={6}
          required
          defaultValue={state.values?.message}
          aria-invalid={Boolean(state.errors?.message)}
          className="field mt-2 resize-y"
        />
        {state.errors?.message && (
          <span className="mt-1 block text-rose-500">{state.errors.message}</span>
        )}
      </label>

      {/* Honeypot: hidden from people, tempting for bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {state.message && (
        <p role="alert" className="text-sm text-rose-500">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
