import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="stage-pad text-center">
      <span className="lost-code" aria-hidden="true">
        4<i>0</i>4
      </span>
      <p className="slate justify-center" style={{ marginTop: "3.5rem" }}>
        <b>404</b>Cut from the film
      </p>
      <h1 className="poster mx-auto">
        That page is <em>not here</em>
      </h1>
      <p className="lede" style={{ marginInline: "auto" }}>The site was rebuilt in November 2026 and old anchors no longer exist.</p>
      <p className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-solid">
          Home
        </Link>
        <Link href="/projects" className="btn">
          Projects
        </Link>
        <Link href="/writing" className="btn">
          Writing
        </Link>
        <Link href="/contact" className="btn">
          Contact
        </Link>
      </p>
    </Container>
  );
}
