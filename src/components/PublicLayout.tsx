import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function PublicLayout() {
  return (
    <div className='mx-auto sm:px-6 lg:px-24'>
      <NavBar />
      <Outlet />
    </div>
  );
}
