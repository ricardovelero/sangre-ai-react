import { Outlet } from "react-router-dom";
import Navbar from "./PublicNavbar";
import MobileNavBar from "./PublicMobileSheet";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

export default function PublicLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='hidden sm:block'>
        <Navbar />
      </div>
      <div className='sm:hidden'>
        <MobileNavBar />
      </div>
      <main className='flex-1 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <Footer />
      </div>
    </div>
  );
}
