import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  WelcomeContainer,
  Header,
  MainContent,
  Popup,
  PopupHeader,
  PopupBody,
  PopupFooter,
  Overlay,
  CloseButton,
  Logo,
} from '../frontend/styles/welcome.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Welcome = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const { data } = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch {
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    fetchProfile();
  }, [router]);

  const handleButtonClick = () => {
    if (user.role === 'admin') {
      router.push('/table');
    } else {
      router.push('/training');
    }
  };

  if (!user) return null;

  return (
    <WelcomeContainer>
      <Header>
        <h1>¡Bienvenido a la sección de capacitación!</h1>
        <p>Capacitación integral para el uso correcto del ERP de DIMMMSA.</p>
      </Header>
      <MainContent>
        <button onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faArrowRight} style={{ marginRight: '8px' }} />
          Comenzar
        </button>
      </MainContent>

      {showPopup && (
        <>
          <Overlay onClick={() => setShowPopup(false)} />
          <Popup>
            <PopupHeader>
              <Logo src="/img/logo.png" alt="Logo de DIMMMSA" />
              <h2>¡Hola, <span>{user.name}</span>!</h2>
            </PopupHeader>
            <PopupBody>
              {user.role === 'admin' ? (
                <p>
                  ¡Bienvenido, <strong>{user.role}</strong>! Como administrador, tienes el control total sobre el proceso de capacitación. Desde aquí podrás gestionar los recursos, monitorear el progreso y optimizar el uso del ERP Nyx para DIMMMSA.
                </p>
              ) : (
                <p>
                  Bienvenido, <strong>{user.role}</strong>. Como parte del equipo, tendrás acceso a todo lo necesario para aprender y utilizar el ERP Nyx de forma efectiva.
                </p>
              )}
            </PopupBody>
            <PopupFooter>
              <CloseButton onClick={() => setShowPopup(false)}>
                <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '8px' }} />
                Entendido
              </CloseButton>
            </PopupFooter>
          </Popup>
        </>
      )}
    </WelcomeContainer>
  );
};

export default Welcome;