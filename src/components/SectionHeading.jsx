export function SectionHeading({ eyebrow, title, centered = false, id }) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <span className="chip">{eyebrow}</span>
      <h2 id={id} className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
        {title}
      </h2>
    </div>
  )
}
