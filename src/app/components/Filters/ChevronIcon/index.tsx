
export default function ChevronIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className ?? "h-6 w-6 text-mainText/90"}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
