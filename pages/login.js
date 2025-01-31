import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  FormContainer,
  Title,
  InputWrapper,
  Input,
  Button,
  IconWrapper,
  TextRedirect,
  TogglePasswordButton,
  Notification,
} from '../frontend/styles/login.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  const validateEmail = (value) => {
    if (value.length < 5) {
      setNotification({ message: "El email debe tener al menos 5 caracteres.", type: "error" });
    } else if (value.length > 50) {
      setNotification({ message: "El email no puede tener más de 50 caracteres.", type: "error" });
    } else {
      setNotification(null);
    }

    setEmail(value);
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setNotification({ message: "La contraseña debe tener al menos 8 caracteres.", type: "error" });
    } else if (value.length > 20) {
      setNotification({ message: "La contraseña no puede tener más de 20 caracteres.", type: "error" });
    } else {
      setNotification(null);
    }

    setPassword(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (notification && notification.type === "error") return;

    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, role } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setNotification({ message: 'Inicio de sesión exitoso', type: 'success' });

      setTimeout(() => {
        router.push('/welcome');
      }, 3000);

    } catch (error) {
      setNotification({ message: 'Credenciales inválidas o error en el servidor', type: 'error' });
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
      <FormContainer onSubmit={handleLogin}>
        <Title>Inicio de Sesión</Title>
        <InputWrapper>
          <IconWrapper>
            <FontAwesomeIcon icon={faEnvelope} />
          </IconWrapper>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
            required
            maxLength="50"
          />
        </InputWrapper>
        <InputWrapper>
          <IconWrapper>
            <FontAwesomeIcon icon={faLock} />
          </IconWrapper>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            required
            maxLength="20"
          />
          <TogglePasswordButton type="button" onClick={() => setShowPassword(!showPassword)}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </TogglePasswordButton>
        </InputWrapper>
        <Button type="submit">Iniciar sesión</Button>
        <TextRedirect>
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </TextRedirect>
        <TextRedirect style={{ marginTop: '5px' }}>
          ¿Olvidaste tu contraseña? <a href="/forgotPassword">Restablécela aquí</a>
        </TextRedirect>
      </FormContainer>

      {notification && (
        <Notification type={notification.type}>
          <FontAwesomeIcon icon={notification.type === 'error' ? faExclamationCircle : faCheckCircle} />
          {notification.message}
        </Notification>
      )}
    </>
  );
};

export default Login;