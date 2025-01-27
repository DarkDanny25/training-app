import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../frontend/components/navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const publicRoutes = ['/login', '/register', '/forgotPassword'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !publicRoutes.includes(router.pathname)) {
      router.replace('/login');
    }
  }, [router]);

  const showNavbar = !publicRoutes.includes(router.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;