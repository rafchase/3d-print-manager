"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const data = new FormData(event.currentTarget);
    const result = await signIn("credentials", { email: data.get("email"), password: data.get("password"), redirect: false });
    setLoading(false);
    if (result?.error) return setError("E-mail ou senha inválidos.");
    router.push("/dashboard"); router.refresh();
  }

  return <main className="shell"><form className="form card" onSubmit={submit}><div className="eyebrow">Acesso seguro</div><h2>Entrar</h2><label htmlFor="email">E-mail</label><input id="email" name="email" type="email" required autoComplete="email"/><label htmlFor="password">Senha</label><input id="password" name="password" type="password" required autoComplete="current-password"/><button className="button" disabled={loading}>{loading ? "Entrando…" : "Entrar"}</button>{error && <p className="error" role="alert">{error}</p>}</form></main>;
}
