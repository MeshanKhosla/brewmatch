type ProgressBarProps = {
    currentStep: number;
};
export function ProgressBar(props: ProgressBarProps) {
    const { currentStep } = props;

return (
    <div className="flex items-center gap-x-1 w-full mt-4 mb-6">
        <div className={`w-full h-5 flex flex-col rounded-l-lg justify-center overflow-hidden ${currentStep >= 0 ? "bg-[#8fbc5c]" : "bg-gray-300"} text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500`} role="progressbar" aria-valuenow={33} aria-valuemin={0} aria-valuemax={100}></div>
        <div className={`w-full h-5 flex flex-col justify-center overflow-hidden ${currentStep >= 1 ? "bg-[#8fbc5c]" : "bg-gray-300"} text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-neutral-600`} role="progressbar" aria-valuenow={33} aria-valuemin={0} aria-valuemax={100}></div>
        <div className={`w-full h-5 flex flex-col rounded-r-lg justify-center overflow-hidden ${currentStep >= 2 ? "bg-[#8fbc5c]" : "bg-gray-300"} text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-neutral-600`} role="progressbar" aria-valuenow={33} aria-valuemin={0} aria-valuemax={100}></div>
    </div>
    )
}