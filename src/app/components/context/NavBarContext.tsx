'use client';

import { createContext, useState, ReactNode } from 'react';

export const NavBarContext = createContext<{
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}>({
    activeIndex: 0,
    setActiveIndex: () => {},
});

export function NavBarProvider({ children }: { children: ReactNode }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <NavBarContext.Provider value={{ activeIndex, setActiveIndex }}>
            {children}
        </NavBarContext.Provider>
    );
}
