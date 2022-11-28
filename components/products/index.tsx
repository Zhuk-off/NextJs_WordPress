import Link from 'next/link';

const Products = ({ products }) => {
  console.log('--products--', products);
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="-mx-2 flex flex-wrap overflow-hidden">
      {products.map((product) => (
        <div
          key={product?.id}
          className="my-2 w-full overflow-hidden px-2 sm:w-1/2 md:w-1/3 xl:w-1/4"
        >
          <Link href={product?.permalink ?? '/'}>{product?.name ?? ''}</Link>
        </div>
      ))}
    </div>
  );
};

export default Products;
