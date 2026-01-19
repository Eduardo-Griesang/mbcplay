'use client';

import { categories } from "@/lib/categories";
import { useMedia } from "@/context/MediaContext";

export default function Categories() {
    const { selectedCategoryId, setSelectedCategoryId } = useMedia();

    return (
        <nav className="flex flex-col items-start gap-3 mt-24">
            <h3 className="text-fifthText font-light text-lg">Categorias</h3>
            <ul className="text-thirdText font-semibold text-base flex flex-col gap-1">
                {categories.map((category) => {
                    const isActive = selectedCategoryId === category.id;
                    return (
                        <li key={category.id}>
                            <button
                                type="button"
                                onClick={() => setSelectedCategoryId(category.id)}
                                className={`hover:text-mainText ${isActive ? "text-mainText" : "text-thirdText"}`}
                                aria-pressed={isActive}
                            >
                                {category.label}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
