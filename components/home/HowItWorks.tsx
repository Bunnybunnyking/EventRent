const steps = [
  {
    n: 1, title: "Tell us your date + town", body: "Share what you are hosting and where, rough headcount is enough to start.", }, {
    n: 2, title: "We confirm size, layout, and site needs", body: "Staking, access, rain backup, and flow, we line it up with your site, not a generic chart.", }, {
    n: 3, title: "We deliver, set up, and break down", body: "Our crew handles install and pickup so you are not juggling rentals on event day.", }, ] as const;

export function HowItWorks() {
  return (
    <section className="border-y border-stone-200 bg-[#faf8f5] py-10 sm:py-8 lg:py-9" aria-labelledby="home-how-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 id="home-how-heading" className="text-center text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          How it works
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm font-medium text-stone-600 sm:text-base">Simple from start to finish.</p>
        <ol className="mt-10 grid list-none gap-6 p-0 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-[#8a6218]">Step {s.n}</p>
              <h3 className="mt-2 text-lg font-semibold text-stone-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-stone-600">
          Not sure on size or rain plan? Our tools help you get started, and our team confirms the final plan.
        </p>
      </div>
    </section>
  );
}
