import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { TrackedLink } from "@/components/ui/TrackedLink";

/** Maps Markdown elements to site components; required by @next/mdx. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", children, ...rest }) => {
      if (href.startsWith("/") || href.startsWith("#")) {
        return (
          <Link href={href} {...rest}>
            {children}
          </Link>
        );
      }
      return (
        <TrackedLink href={href} {...rest}>
          {children}
        </TrackedLink>
      );
    },
    ...components,
  };
}
