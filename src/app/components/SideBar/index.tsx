'use client';

import { useState } from 'react';
import Logo from "../Logo";
import Categories from "./Categories";
import NavBar from "./NavBar";

export default function SideBar() {
    const [showCategories, setShowCategories] = useState(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <nav className="hidden md:flex py-10 bg-secondaryBackground flex-col col-span-1 items-center h-screen">
                <Logo />
                <NavBar />
                <Categories />
            </nav>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-secondaryBackground flex items-center justify-around py-3 px-4 z-20">
                <NavBar />
                <button
                    onClick={() => setShowCategories(!showCategories)}
                    className="flex items-center gap-2 text-white font-semibold text-sm hover:text-mainText transition"
                    aria-label="Toggle categories"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                        <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Categories Modal */}
            {showCategories && (
                <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end">
                    <div className="w-full bg-secondaryBackground rounded-t-lg p-6 max-h-96 overflow-y-auto">
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => setShowCategories(false)}
                                className="text-gray-400 hover:text-white text-2xl"
                                aria-label="Close categories"
                            >
                                ×
                            </button>
                        </div>
                        <Categories />
                    </div>
                </div>
            )}
        </>
    )
};