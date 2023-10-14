import Image from "next/image";

const Logo = () => {
    return ( 
        <Image
        className="w-auto"
        priority
        height={130}
        width={130}
        src={"/logo.svg"}
        alt="logo"
        />
     );
}
 
export default Logo;