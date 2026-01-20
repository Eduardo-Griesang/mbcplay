import type { ReactNode } from "react";
import { Suspense } from "react";
import Profile from "../Profile";
import SearchBar from "../SearchBar";
import SideBar from "../SideBar";

type MainPageProps = {
    children: ReactNode;
};

export default function MainPage({ children }: MainPageProps) {
    return (
        <div className="bg-mainBackground grid grid-cols-1 md:grid-cols-6 h-screen overflow-hidden pb-20 md:pb-0">
            <SideBar />
            <main className="col-span-1 md:col-span-5 flex flex-col overflow-y-auto">
                <section className="flex items-center justify-between py-6 top-0 bg-mainBackground z-10 px-7">
                    <Suspense fallback={<div className="h-[52px] w-2/3 rounded-4xl bg-secondaryBackground" />}>
                        <SearchBar />
                    </Suspense>
                    <Profile />
                </section>

                <div className="pb-12 pl-7">
                    {children}
                </div>
            </main>
        </div>
    )
}
