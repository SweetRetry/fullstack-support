import { cn } from "@/lib/utils";

export const LoadingSpinner = ({
  className,
  size,
}: {
  className?: string;
  size?: "lg" | "md" | "default";
}) => {
  const [width, height] = {
    lg: [48, 48],
    md: [36, 36],
    default: [24, 24],
  }[size || "default"];

  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin", className)}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
};
