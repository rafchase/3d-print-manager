import Link from "next/link";

const modules = [
  ["Estoque", "Controle filamentos por material, cor, peso e custo."],
  ["Produção", "Acompanhe impressoras, trabalhos e tempo de máquina."],
  ["Precificação", "Calcule material, energia, operação e margem."],
];

export default function Home() {
  return (
    <main className="shell">
      <nav className="nav"><div className="brand">3D<span>PM</span></div><Link className="button secondary" href="/login">Entrar</Link></nav>
      <section className="hero">
        <div className="eyebrow">Operação sob controle</div>
        <h1>Da bobina à entrega.</h1>
        <p className="lead">Uma base segura e portátil para gerir sua operação de impressão 3D, com rastreabilidade de materiais, equipamentos e custos reais.</p>
        <div className="actions"><Link className="button" href="/dashboard">Abrir painel</Link><a className="button secondary" href="/api/health">Ver saúde da API</a></div>
      </section>
      <section className="grid">{modules.map(([title, body]) => <article className="card" key={title}><h2>{title}</h2><p>{body}</p></article>)}</section>
    </main>
  );
}
