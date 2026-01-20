'use client';

import { useMemo, useState } from "react";
import ChevronIcon from "./ChevronIcon";
import FilterRow from "./FilterRow";
import { useMedia } from "@/context/MediaContext";

export default function Filters() {
    const {
        selectedMood,
        setSelectedMood,
        selectedYear,
        setSelectedYear,
        selectedLanguage,
        setSelectedLanguage,
        selectedAgeRating,
        setSelectedAgeRating,
    } = useMedia();
    const [openSection, setOpenSection] = useState<string | null>(null);
    const yearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return ["all", ...Array.from({ length: 6 }, (_, i) => String(currentYear - i))];
    }, []);

    const languageOptions = [
        { value: "all", label: "All" },
        { value: "en", label: "English" },
        { value: "pt", label: "Portuguese" },
        { value: "es", label: "Spanish" },
        { value: "fr", label: "French" },
        { value: "de", label: "German" },
        { value: "ja", label: "Japanese" },
        { value: "ko", label: "Korean" },
    ];

    return(
        <aside className="w-full md:max-w-[240px] pb-10 text-mainText pt-5 md:pt-14 pr-7">
            <div className="flex items-center justify-between pb-4">
                <span className="text-lg font-semibold tracking-wide">Filters</span>
                <ChevronIcon />
            </div>
            <nav aria-label="Filters list">
                <ul className="space-y-4 text-sm">
                    <FilterRow
                        label="Mood"
                        isOpen={openSection === "Mood"}
                        onToggle={() => setOpenSection(openSection === "Mood" ? null : "Mood")}
                    >
                        <OptionButton label="All" isActive={selectedMood === "all"} onClick={() => setSelectedMood("all")} />
                        <OptionButton label="Chill" isActive={selectedMood === "chill"} onClick={() => setSelectedMood("chill")} />
                        <OptionButton label="Dark" isActive={selectedMood === "dark"} onClick={() => setSelectedMood("dark")} />
                        <OptionButton label="Epic" isActive={selectedMood === "epic"} onClick={() => setSelectedMood("epic")} />
                        <OptionButton label="Fun" isActive={selectedMood === "fun"} onClick={() => setSelectedMood("fun")} />
                    </FilterRow>
                    <FilterRow
                        label="Year"
                        isOpen={openSection === "Year"}
                        onToggle={() => setOpenSection(openSection === "Year" ? null : "Year")}
                    >
                        {yearOptions.map((year) => (
                            <OptionButton
                                key={year}
                                label={year === "all" ? "All" : year}
                                isActive={selectedYear === year}
                                onClick={() => setSelectedYear(year)}
                            />
                        ))}
                    </FilterRow>
                    <FilterRow
                        label="Language"
                        isOpen={openSection === "Language"}
                        onToggle={() => setOpenSection(openSection === "Language" ? null : "Language")}
                    >
                        {languageOptions.map((language) => (
                            <OptionButton
                                key={language.value}
                                label={language.label}
                                isActive={selectedLanguage === language.value}
                                onClick={() => setSelectedLanguage(language.value)}
                            />
                        ))}
                    </FilterRow>
                    <FilterRow
                        label="Age rating"
                        isOpen={openSection === "Age rating"}
                        onToggle={() => setOpenSection(openSection === "Age rating" ? null : "Age rating")}
                    >
                        <OptionButton label="All" isActive={selectedAgeRating === "all"} onClick={() => setSelectedAgeRating("all")} />
                        <OptionButton label="General" isActive={selectedAgeRating === "general"} onClick={() => setSelectedAgeRating("general")} />
                        <OptionButton label="Adults" isActive={selectedAgeRating === "adult"} onClick={() => setSelectedAgeRating("adult")} />
                    </FilterRow>
                </ul>
            </nav>
        </aside>
    )
}

function OptionButton({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                isActive
                    ? "bg-mainText/15 text-mainText"
                    : "bg-mainText/5 text-mainText/70 hover:bg-mainText/10 hover:text-mainText"
            }`}
        >
            {label}
        </button>
    );
}
