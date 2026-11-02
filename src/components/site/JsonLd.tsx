/**
 * Renders a JSON-LD graph. The payload is built from typed content modules,
 * never from user input, and "<" is escaped so a literal "</script>" inside a
 * string can never terminate the element.
 */
export function JsonLd({ data, nonce }: { data: Record<string, unknown>; nonce?: string }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: json }} />;
}
