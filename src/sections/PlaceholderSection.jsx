function PlaceholderSection({ id, eyebrow, title }) {
  return (
    <section
      id={id}
      className="flex min-h-[34rem] scroll-mt-20 items-center bg-transparent px-6 py-24 text-enos-950 sm:px-10 lg:px-14"
      aria-labelledby={`${id}-title`}
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-enos-500">
          {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <div className="mt-10 h-px w-full bg-enos-100/60" aria-hidden="true" />
      </div>
    </section>
  )
}

export default PlaceholderSection
