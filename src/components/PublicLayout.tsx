import { Outlet } from "react-router-dom";
import Navbar from "./PublicNavbar";

export default function PublicLayout() {
  return (
    <div className='mx-auto sm:px-6 lg:px-24'>
      <Navbar />
      <Outlet />
    </div>
  );
}
