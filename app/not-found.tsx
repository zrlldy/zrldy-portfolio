import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[70vh] content-center pt-24">
      <p className="label">Error 404 · route not found</p>
      <h1 className="mt-6 text-headline font-medium tracking-[-0.035em]">
        This endpoint doesn&rsquo;t <em className="font-serif font-normal italic">exist</em>.
      </h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Back home
        </Link>
        <Link href="/projects" className="btn btn-ghost">
          Projects
        </Link>
      </div>
    </section>
  );
}
