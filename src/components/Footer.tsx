import { Link } from "react-router-dom";

const Footer = () => {
  function getCurrentYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }
  return (
    <footer className='flex-shrink-0 p-4'>
      <nav className='flex space-x-4 pl-5 justify-center text-xs text-muted-foreground underline'>
        <Link to={`/terms-and-conditions`}>Términos & Condiciones</Link>
        <Link to={`/privacy-policy`}>Política de Privacidad</Link>
      </nav>
      <p className='mt-6 text-sm text-center text-muted-foreground sm:mt-0'>
        Copyright © {getCurrentYear()} · Soluciones iO, SLU · Estepona, Malaga,
        España
      </p>
    </footer>
  );
};

export default Footer;
