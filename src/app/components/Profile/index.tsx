import Image from "next/image";
import Link from "next/link";
import ProfilePic from "../../icons/profile.png"

export default function Profile() {
    return (
        <Link href={'/'}>
            <Image src={ProfilePic} alt={"Your Profile Picture"} />
        </Link>
    )
};