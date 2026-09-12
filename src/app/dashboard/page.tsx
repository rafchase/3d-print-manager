import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { SignOutButton } from "@/components/sign-out-button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <main className="shell">
      <nav className="nav"><div className="brand">3D<span>PM</span> / Painel</div><SignOutButton /></nav>
      <section className="hero"><div className="eyebrow">Sessão autenticada</div><h1>Olá, {session.user?.name ?? "operador"}.</h1><p className="lead">A infraestrutura está pronta para os módulos de estoque, produção, manutenção e precificação.</p></section>
    </main>
  );
}
