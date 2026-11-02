import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl">That page is not here</h1>
      <p className="mt-3 text-ink-soft">The site was rebuilt in November 2026 and old anchors no longer exist.</p>
      <p className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
        <Link href="/" className="underline underline-offset-4">
          Home
        </Link>
        <Link href="/projects" className="underline underline-offset-4">
          Projects
        </Link>
        <Link href="/writing" className="underline underline-offset-4">
          Writing
        </Link>
        <Link href="/contact" className="underline underline-offset-4">
          Contact
        </Link>
      </p>
    </Container>
  );
}
