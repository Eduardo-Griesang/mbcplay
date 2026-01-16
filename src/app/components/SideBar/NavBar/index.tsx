'use client';

import Image from "next/image";
import Film from "../../../icons/compass-pointing-svgrepo-com.svg"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    const navLinks = [
        {
            href: '/',
            label: 'Explorar',
            icon: (
                <svg height="24" width="24" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 41.85 41.85" xmlSpace="preserve">
                    <g>
                        <path fill="currentColor" d="M30.914,30.913c0,0-1.326-9.307-6-13.979c-4.672-4.672-13.979-6-13.979-6s1.326,9.308,5.996,13.981
                            C21.605,29.587,30.914,30.913,30.914,30.913z M19.301,19.301c0.896-0.896,2.35-0.896,3.246,0c0.896,0.897,0.896,2.349,0,3.246
                            c-0.895,0.897-2.35,0.898-3.246,0C18.404,21.65,18.406,20.197,19.301,19.301z"/>
                        <path fill="currentColor" d="M20.926,41.848c11.555,0,20.924-9.368,20.924-20.924c0-11.555-9.369-20.923-20.924-20.923
                            C9.369,0.002,0,9.37,0,20.924C0,32.48,9.369,41.848,20.926,41.848z M20.926,3.967c9.363,0,16.955,7.591,16.955,16.958
                            c0,9.365-7.592,16.958-16.955,16.958c-9.365,0-16.959-7.594-16.959-16.958C3.967,11.558,11.56,3.967,20.926,3.967z"/>
                    </g>
                </svg>
            )
        },
        {
            href: '/Films',
            label: 'Filmes',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 3V21M3 7.5H7M3 12H21M3 16.5H7M17 3V21M17 7.5H21M17 16.5H21M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            href: '/Series',
            label: 'Series',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.0403 14.2115L14.95 11.7057C15.2051 11.5378 15.3327 11.3025 15.3327 11C15.3327 10.6974 15.2051 10.4622 14.95 10.2942L11.0403 7.78845C10.7647 7.60385 10.4808 7.58879 10.1885 7.74328C9.89615 7.89776 9.75 8.14294 9.75 8.47883V13.5211C9.75 13.857 9.89615 14.1022 10.1885 14.2567C10.4808 14.4112 10.7647 14.3961 11.0403 14.2115ZM4.3077 18.5C3.80257 18.5 3.375 18.325 3.025 17.975C2.675 17.625 2.5 17.1974 2.5 16.6923V5.3077C2.5 4.80257 2.675 4.375 3.025 4.025C3.375 3.675 3.80257 3.5 4.3077 3.5H19.6923C20.1974 3.5 20.625 3.675 20.975 4.025C21.325 4.375 21.5 4.80257 21.5 5.3077V16.6923C21.5 17.1974 21.325 17.625 20.975 17.975C20.625 18.325 20.1974 18.5 19.6923 18.5H15.5V19.5961C15.5 19.8538 15.4137 20.0688 15.2413 20.2413C15.0688 20.4137 14.8538 20.5 14.5961 20.5H9.40385C9.14617 20.5 8.93111 20.4137 8.75868 20.2413C8.58623 20.0688 8.5 19.8538 8.5 19.5961V18.5H4.3077ZM4.3077 17H19.6923C19.7692 17 19.8397 16.9679 19.9038 16.9038C19.9679 16.8397 20 16.7692 20 16.6923V5.3077C20 5.23077 19.9679 5.16024 19.9038 5.09613C19.8397 5.03203 19.7692 4.99998 19.6923 4.99998H4.3077C4.23077 4.99998 4.16024 5.03203 4.09613 5.09613C4.03202 5.16024 3.99998 5.23077 3.99998 5.3077V16.6923C3.99998 16.7692 4.03202 16.8397 4.09613 16.9038C4.16024 16.9679 4.23077 17 4.3077 17Z" 
                    fill="currentColor"/>
                </svg>
            )
        }
    ];

    return (
        <nav className="flex-1 flex">
            <ul className="mx-auto w-full mt-40 flex flex-col gap-5 items-start">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href} className={`flex items-center gap-4 font-semibold text-xl ${isActive ? 'text-white' : 'text-fourthText'}`}>
                            <div className={isActive ? 'text-white' : 'text-fourthText'}>
                                {link.icon}
                            </div>
                            <h2>{link.label}</h2>
                        </Link>
                    );
                })}
            </ul>
        </nav>
    )
};