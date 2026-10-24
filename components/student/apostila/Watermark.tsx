export function Watermark() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-5" aria-hidden>
      <div className="absolute left-1/2 top-1/2 flex w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] flex-wrap justify-center gap-x-10 gap-y-16">
        {Array.from({ length: 16 }).map((_, index) => (
          <p key={index} className="whitespace-nowrap text-[11px] font-medium tracking-[0.14em] text-ink">
            Licença Pessoal - CPF: ***.***.***-**
          </p>
        ))}
      </div>
    </div>
  );
}
