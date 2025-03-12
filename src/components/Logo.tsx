import { NavLink } from "react-router-dom";
import Image from "./ui/image";

export default function Logo() {
  return (
    <NavLink to={"/"}>
      <Image src='/sangreai.webp' alt='Logo SangreAI' width={30} height={30} />
    </NavLink>
  );
}
