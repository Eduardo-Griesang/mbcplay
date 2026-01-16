import Search from "../../icons/Search.svg"
import Image from "next/image";

export default function SearchBar() {
    return (
        <div className="my-10 flex items-center gap-3 bg-secondaryBackground w-2/3 px-4 py-3 rounded-4xl">
            <Image src={Search} alt="Search Icon" width={25} height={25} />
            <input 
                type="text"
                className="bg-transparent outline-none w-full text-2xl font-semibold placeholder-fourthText text-white"
                placeholder="Pesquisar..."
            />
        </div>
    )
}