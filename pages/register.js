import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { 
  Button, 
  Input, 
  FormContainer, 
  Title, 
  IconWrapper, 
  TextRedirect, 
  TogglePasswordButton, 
  Notification, 
  TipMessage 
} from '../frontend/styles/register.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const [tipDisabled, setTipDisabled] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setNotification(null);

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
      if (response.status === 201) {
        setNotification({ message: 'Registro exitoso. Por favor, Inicia Sesión.', type: 'success' });
        setTimeout(() => {
          setNotification(null);
          router.push('/login');
        }, 3000);
      }
    } catch (err) {
      setNotification({ message: 'Ocurrió un error al registrar.', type: 'error' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    if (!tipDisabled) {
      setShowTip(false);
      setTipDisabled(true);
    }
  };

  const handleFieldFocus = () => {
    if (!tipDisabled) {
      setShowTip(true);
    }
  };

  const handleFieldBlur = () => {
    setShowTip(false);
  };

  return (
    <>
      <FormContainer onSubmit={handleRegister}>
        <Title>Registro</Title>
        <div style={{ position: 'relative' }}>
          <IconWrapper>
            <FontAwesomeIcon icon={faUser} />
          </IconWrapper>
          <Input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div 
          style={{ position: 'relative' }} 
          onFocus={handleFieldFocus}
          onBlur={handleFieldBlur}
          onMouseEnter={handleFieldFocus}
          onMouseLeave={handleFieldBlur}
        >
          <IconWrapper>
            <FontAwesomeIcon icon={faEnvelope} />
          </IconWrapper>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {showTip && (
            <TipMessage>
              Tip: El email de acceso es tu mismo rol, por ejemplo: <b>@adviser.com</b> es para asesores.
            </TipMessage>
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <IconWrapper>
            <FontAwesomeIcon icon={faLock} />
          </IconWrapper>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TogglePasswordButton type="button" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </TogglePasswordButton>
        </div>

        <Button type="submit">Registrarme</Button>
        <TextRedirect>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
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

export default Register;