"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-extrabold">Contact Us</h1>
      <p className="mt-2 text-foreground/70">
        Have a question about a course? Send us a message and we'll get back to you.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-lg font-semibold text-blue-600">Thanks, {form.name || "there"}!</p>
          <p className="mt-2 text-sm text-foreground/70">
            Your message has been received. This is a demo form, no data was actually sent.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-2 outline-none focus:border-blue-600"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-2 outline-none focus:border-blue-600"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-lg border border-border bg-card px-4 py-2 outline-none focus:border-blue-600"
              placeholder="How can we help?"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
