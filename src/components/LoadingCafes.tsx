import { Skeleton } from "~/components/ui/skeleton"
export function LoadingCafes() {
    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2"> { 
            Array.from({ length: 3}).map((_, i) => (
                <Skeleton key={i} className="h-20 bg-white" />
            ))
        }
        </div>
    )
}