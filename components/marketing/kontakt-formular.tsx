"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export function KontaktFormular() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Unbekannter Fehler");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Fehler beim Senden");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nachricht gesendet!
        </h3>
        <p className="text-sm text-gray-500">
          Wir melden uns werktags innerhalb von 24 Stunden bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Max Mustermann"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-Mail *</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="max@beispiel.de"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="company">Unternehmen</Label>
        <Input
          id="company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Muster GmbH (optional)"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject">Betreff *</Label>
        <Input
          id="subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="Worum geht es?"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Nachricht *</Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Beschreiben Sie kurz Ihre Situation oder Ihr Anliegen..."
          rows={5}
          required
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-900 hover:bg-blue-800"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Wird gesendet…
          </>
        ) : (
          "Nachricht senden"
        )}
      </Button>

      <p className="text-xs text-gray-400">
        Mit dem Senden stimmen Sie unserer{" "}
        <a href="/rechtliches/datenschutz" className="underline hover:text-gray-600">
          Datenschutzerklärung
        </a>{" "}
        zu.
      </p>
    </form>
  );
}
