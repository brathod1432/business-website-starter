/** Route-level loading skeleton shown during navigation/suspense. */
export default function Loading() {
  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-20">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-muted border-t-primary"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
