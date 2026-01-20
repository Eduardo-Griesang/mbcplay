import type { ReactNode } from "react";
import ChevronIcon from "../ChevronIcon";

export default function FilterRow({
    label,
    isOpen,
    onToggle,
    children,
}: {
    label: string;
    isOpen: boolean;
    onToggle: () => void;
    children: ReactNode;
}) {
    return (
        <li className="text-lg text-mainText/90">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between hover:text-mainText transition-colors"
                aria-expanded={isOpen}
            >
                <span>{label}</span>
                <ChevronIcon className={`h-6 w-6 text-mainText/70 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <div className="mt-3 grid gap-2 text-sm">
                        {children}
                    </div>
                </div>
            </div>
        </li>
    );
}
