export function PageHero({ eyebrow, title, description, actions, align = 'left' }) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-4 py-10 md:py-14 ${align === 'center' ? 'text-center' : ''}`}>
      <div className="max-w-3xl animate-fade-up">
        <span className="chip">{eyebrow}</span>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">{title}</h1>
        <p className="mt-4 text-lg text-slate-600">{description}</p>
        {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  )
}
