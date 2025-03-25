import { Outlet } from "react-router-dom";
import Navbar from "./PublicNavbar";
import MobileNavBar from "./PublicMobileSheet";

export default function PublicLayout() {
  return (
    <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
      <div className='hidden sm:block'>
        <Navbar />
      </div>
      <div className='sm:hidden'>
        <MobileNavBar />
      </div>
      <Outlet />
    </div>
  );
}
