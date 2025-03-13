import { Outlet } from "react-router-dom";
import Navbar from "./PublicNavbar";

export default function PublicLayout() {
  return (
    <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <Navbar />
      <Outlet />
    </div>
  );
}
