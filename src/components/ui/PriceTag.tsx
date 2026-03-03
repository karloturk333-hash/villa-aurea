interface PriceTagProps {
  price: number;
  currency?: string;
}

export function PriceTag({ price, currency = '€' }: PriceTagProps) {
  return (
    <div className='absolute top-4 right-4 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-gold/40 bg-midnight/80 backdrop-blur-md'>
      {/* Tag "hole" — decorative gold dot */}
      <span className='w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0' aria-hidden='true' />
      <div className='flex flex-col leading-none gap-0.5'>
        <span className='font-label text-[8px] tracking-[0.3em] text-gold/70 uppercase'>
          From
        </span>
        <span className='font-display text-white text-xl font-light leading-none'>
          {currency}{price}
          <span className='text-xs text-white/40 ml-0.5 font-body font-light'>/night</span>
        </span>
      </div>
    </div>
  );
}
