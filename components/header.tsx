import Link from 'next/link';
import { useContext } from 'react';
import { HeaderFooterContext } from '../context/headerFooterContext';

export default function Header() {
  const { data } = useContext(HeaderFooterContext);
  const header = data.header;
  console.log('Header Menu - ', header);

  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/" className="hover:underline">
        Blog
      </Link>
      .
    </h2>
  );
}
