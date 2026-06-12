type Props = {
  title: string;
  subtitle?: string;
};

export function PageHero({ title, subtitle }: Props) {
  return (
    <section className="bg-stone-900 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">{title}</h1>
        {subtitle && (
          <p className="text-stone-400 text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
