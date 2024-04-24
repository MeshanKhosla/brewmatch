import { Skeleton } from "~/components/ui/skeleton";

export function LoadingCards() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {" "}
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-20 bg-white" />
      ))}
    </div>
  );
}
