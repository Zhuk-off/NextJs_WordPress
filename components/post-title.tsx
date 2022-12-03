export default function PostTitle({ children }) {
  return (
    <h1
      className="mt-24 mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}
