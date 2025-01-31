import React, { useState } from 'react';
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
  const [showEmailTip, setShowEmailTip] = useState(false);
  const [showPasswordTip, setShowPasswordTip] = useState(false);
  const router = useRouter();

  const validateName = (value) => {
    const trimmedValue = value.trim();
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

    if (trimmedValue.length < 3) {
      setNotification({ message: "El nombre debe tener al menos 3 caracteres.", type: "error" });
    } else if (trimmedValue.length > 30) {
      setNotification({ message: "El nombre no puede tener más de 30 caracteres.", type: "error" });
    } else if (!nameRegex.test(trimmedValue)) {
      setNotification({ message: "El nombre solo puede contener letras y espacios.", type: "error" });
    } else {
      setNotification(null);
    }

    setName(value);
  };

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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (!passwordRegex.test(value)) {
      setNotification({ message: "Por favor, ingrese una contraseña segura.", type: "error" });
    } else {
      setNotification(null);
    }

    setPassword(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setNotification(null);

    if (notification && notification.type === "error") return;

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
            onChange={(e) => validateName(e.target.value)}
            required
            maxLength="30"
          />
        </div>

        <div 
          style={{ position: 'relative' }} 
          onFocus={() => setShowEmailTip(email === '')}
          onBlur={() => setShowEmailTip(false)}
          onMouseEnter={() => setShowEmailTip(email === '')}
          onMouseLeave={() => setShowEmailTip(false)}
        >
          <IconWrapper>
            <FontAwesomeIcon icon={faEnvelope} />
          </IconWrapper>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => {
              validateEmail(e.target.value);
              setShowEmailTip(e.target.value === '');
            }}
            required
            maxLength="50"
          />
          {showEmailTip && (
            <TipMessage>
              Tip: El email de acceso es tu mismo rol, por ejemplo: <b>@adviser.com</b> es para asesores.
            </TipMessage>
          )}
        </div>

        <div 
          style={{ position: 'relative' }} 
          onFocus={() => setShowPasswordTip(password === '')}
          onBlur={() => setShowPasswordTip(false)}
          onMouseEnter={() => setShowPasswordTip(password === '')}
          onMouseLeave={() => setShowPasswordTip(false)}
        >
          <IconWrapper>
            <FontAwesomeIcon icon={faLock} />
          </IconWrapper>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              validatePassword(e.target.value);
              setShowPasswordTip(e.target.value === '');
            }}
            required
            maxLength="20"
          />
          <TogglePasswordButton type="button" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </TogglePasswordButton>
          {showPasswordTip && (
            <TipMessage>
              Tip: La contraseña debe tener al menos 8 caracteres, una <b>mayúscula</b>, una <b>minúscula</b>, un <b>número</b> y un <b>carácter especial (@$!%*?&)</b>.
            </TipMessage>
          )}
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