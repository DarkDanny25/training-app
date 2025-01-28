import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { 
  NavbarContainer, 
  LeftSection, 
  RightSection, 
  NavButton, 
  DropdownMenu, 
  DropdownItem, 
  UserButton, 
  LogoContainer, 
  GoodbyeMessage, 
  HamburgerMenu, 
  Divider 
} from '../styles/navbar.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt, faBars, faTimes, faHandshake } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [goodbyeMessage, setGoodbyeMessage] = useState('');
  const [windowWidth, setWindowWidth] = useState(0);
  const router = useRouter();
  const currentPath = router.pathname;
  const dropdownRef = useRef(null);
  const userButtonRef = useRef(null);

  const hideNavbarRoutes = [
    '/addTraining', '/addFAQ', '/editTraining/[id]', '/editFAQ/[id]',
    '/editUser/[id]', '/welcome'
  ];

  useEffect(() => {
    setRole(localStorage.getItem('role') || null);
  }, []);

  const handleMenuClick = (option) => {
    if (option === 'profile') router.push('/profile');
    if (option === 'logout') {
      setGoodbyeMessage('¡Hasta pronto! Esperamos verte de nuevo.');
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        router.push('/login');
      }, 3000);
    }
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleClickOutside = useCallback((e) => {
    if (
      !dropdownRef.current?.contains(e.target) && 
      !userButtonRef.current?.contains(e.target) && 
      !e.target.closest('.hamburger-menu') &&
      !e.target.closest('.navbar-container')
    ) {
      setDropdownOpen(false);
      setMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth >= 1024) {
      setMobileMenuOpen(false);
      setDropdownOpen(false);
    } else {
      setMobileMenuOpen(false);
      setDropdownOpen(false);
    }
  }, [windowWidth]);

  if (hideNavbarRoutes.includes(currentPath) || !role) return null;

  const handleLogoClick = () => {
    router.push(role === 'admin' ? '/table' : '/training');
  };

  const handleNavButtonClick = (path) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  return (
    <NavbarContainer className="navbar-container">
      <LeftSection onClick={handleLogoClick}>
        <LogoContainer>
          <img src="/img/logo.png" alt="DIMMMSA Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
          <span style={{ fontSize: '25px', marginBottom: '5px' }}>|</span>
          <span style={{ marginLeft: '5px' }}>DIMMMSA</span>
        </LogoContainer>
      </LeftSection>

      <HamburgerMenu className="hamburger-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
      </HamburgerMenu>

      <RightSection isMobileOpen={mobileMenuOpen}>
        {role === 'admin' && (
          <>
            <NavButton onClick={() => handleNavButtonClick('/table')} active={currentPath === '/table'}>Control</NavButton>
            <NavButton onClick={() => handleNavButtonClick('/users')} active={currentPath === '/users'}>Usuarios</NavButton>
            <NavButton onClick={() => handleNavButtonClick('/training')} active={currentPath === '/training'}>Capacitación</NavButton>
            <NavButton onClick={() => handleNavButtonClick('/faqPage')} active={currentPath === '/faqPage'}>FAQ</NavButton>
          </>
        )}
        {['asesor', 'asesorJR', 'gerente_sucursal', 'gerente_zona'].includes(role) && (
          <>
            <NavButton onClick={() => handleNavButtonClick('/training')} active={currentPath === '/training'}>Capacitación</NavButton>
            <NavButton onClick={() => handleNavButtonClick('/faqPage')} active={currentPath === '/faqPage'}>FAQ</NavButton>
          </>
        )}
        {mobileMenuOpen && (
          <>
            <Divider />
            <NavButton onClick={() => handleMenuClick('profile')}>Configurar Perfil</NavButton>
            <NavButton onClick={() => handleMenuClick('logout')}>Cerrar Sesión</NavButton>
          </>
        )}
      </RightSection>

      {!mobileMenuOpen && (
        <UserButton ref={userButtonRef} onClick={() => setDropdownOpen(prev => !prev)}>
          <FontAwesomeIcon icon={faUser} />
        </UserButton>
      )}

      {dropdownOpen && (
        <DropdownMenu ref={dropdownRef}>
          <DropdownItem onClick={() => handleMenuClick('profile')}>
            <FontAwesomeIcon icon={faCog} /> Configurar Perfil
          </DropdownItem>
          <DropdownItem onClick={() => handleMenuClick('logout')}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
          </DropdownItem>
        </DropdownMenu>
      )}

      {goodbyeMessage && (
        <GoodbyeMessage>
          <FontAwesomeIcon icon={faHandshake} style={{ marginRight: '10px' }} />
          {goodbyeMessage}
        </GoodbyeMessage>
      )}
    </NavbarContainer>
  );
};

export default Navbar;