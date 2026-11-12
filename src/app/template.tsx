/**
 * Re-mounted on every navigation, so its CSS entrance plays as the page
 * transition: a red wipe across the top and the content rising into place,
 * while the particle scene behind re-forms for the new route.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page-wipe" aria-hidden="true" />
      <div className="page-enter">{children}</div>
    </>
  );
}
