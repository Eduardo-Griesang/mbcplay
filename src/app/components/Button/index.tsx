import Link from "next/link";
import Play from "../../icons/Play.svg";
import Info from "../../icons/Info.svg";
import Image from "next/image";

export default function Button({
    play,
    details,
    detailsHref,
}: {
    play?: boolean;
    details?: boolean;
    detailsHref?: string;
}) {
    const iconSize = 22;

    return (
        <>
            {play ? (
                <Link href={'/'} className={"flex items-center justify-center gap-2 bg-mainText/10 font-semibold text-xl rounded-xl text-mainText px-4 h-10 sm:h-11 md:h-12"}>
                    <Image src={Play} alt={"Botuo de Play"} />
                    Play
                </Link>
            ) : (
                <Link
                    href={detailsHref ?? '/Details'}
                    className={"flex items-center justify-center gap-2 bg-mainText/10 font-semibold text-xl rounded-xl text-mainText px-4 h-10 sm:h-11 md:h-12"}
                >
                    <Image src={Info} alt={"Botuo de Detalhes"} width={iconSize} height={iconSize} />
                    Detalhes
                </Link>
            )}
        </>
    );
}
