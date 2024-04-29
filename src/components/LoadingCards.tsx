import { Skeleton } from "~/components/ui/skeleton";

type LoadingProps = {
  cafe: boolean;
};

export function LoadingCards(props: LoadingProps) {
  const { cafe } = props;

  return (
    <div className={cafe ? "grid grid-cols-1 gap-3 md:grid-cols-3" : "grid grid-cols-1 gap-3 md:grid-rows-3"}>
      {" "}
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-20 bg-white" />
      ))}
    </div>
  );
}
