import { NavLink } from "react-router-dom";
import Image from "./ui/image";

export default function Logo() {
  return (
    <NavLink to={"/"} className={"flex items-end mr-4"}>
      <Image src='/sangreai.webp' alt='Logo SangreAI' width={30} height={30} />
      <span className='font-bold text-2xl'>Sangre AI</span>
    </NavLink>
  );
}
