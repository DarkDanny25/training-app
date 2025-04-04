import React, { useState } from 'react';
import API from '../utils/api';
import { useRouter } from 'next/router';
import {
  FormContainer,
  Title,
  InputWrapper,
  Input,
  ButtonGenerateToken,
  ButtonReset,
  ButtonCancel,
  Notification,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  IconWrapper,
  IconWrapperRight,
  LinkButton,
} from '../frontend/styles/forgotPassword.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faCheckCircle, faExclamationCircle, faLock, faCheck, faTimes, faEye, faEyeSlash, faUserShield } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSecurityCode, setShowSecurityCode] = useState(false);
  const router = useRouter();

  const validateEmail = (value) => {
    if (value.length < 5 || value.length > 50) {
      setNotification({ message: "El email debe tener entre 5 y 50 caracteres.", type: "error" });
    } else {
      setNotification(null);
    }
    setEmail(value);
  };

  const validateSecurityCode = (value) => {
    setSecurityCode(value);
    if (value.length < 6 || value.length > 20) {
      setNotification({ message: "El código de seguridad debe tener un mínimo 6 dígitos.", type: "error" });
    } else {
      setNotification(null);
    }
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    
    if (!passwordRegex.test(value)) {
      setNotification({ message: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.", type: "error" });
    } else {
      setNotification(null);
    }

    setNewPassword(value);
  };

  const validateConfirmPassword = (value) => {
    if (value !== newPassword) {
      setNotification({ message: "Las contraseñas no coinciden.", type: "error" });
    } else {
      setNotification(null);
    }

    setConfirmPassword(value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/users/forgot-password', { email, securityCode });
      setResetToken(response.data.resetToken);
      setNotification({ message: 'Token generado correctamente', type: 'success' });
      setShowModal(true);
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({ message: error.response?.data?.error || 'Error en el servidor', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    if (!newPassword || !confirmPassword) {
      setNotification({ message: 'Por favor, ingresa una nueva contraseña y confírmala.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setNotification({ message: 'Las contraseñas no coinciden.', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }
  
    try {
      await API.post('/users/reset-password', { token: resetToken, newPassword });
      setShowModal(false);
      setEmail('');
      setSecurityCode('');
      setNewPassword('');
      setConfirmPassword('');
      setNotification({ message: 'Contraseña restablecida exitosamente', type: 'success' });
  
      setTimeout(() => {
        setNotification(null);
        router.push('/login');
      }, 3000);
    } catch (error) {
      setNotification({ message: error.response?.data?.error || 'Error en el servidor', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleCancel = () => {
    setEmail('');
    setSecurityCode('');
    setNewPassword('');
    setConfirmPassword('');
    setShowModal(false);
  };

  return (
    <div>
      <FormContainer onSubmit={handleForgotPassword}>
        <Title>Restablece tu Contraseña</Title>
        <InputWrapper>
          <IconWrapper>
            <FontAwesomeIcon icon={faEnvelope} />
          </IconWrapper>
          <Input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
            required
            maxLength="50"
          />
        </InputWrapper>
        <InputWrapper>
          <IconWrapper>
            <FontAwesomeIcon icon={faUserShield} />
          </IconWrapper>
          <Input
            type={showSecurityCode ? 'text' : 'password'}
            placeholder="Ingresa tu código de seguridad"
            value={securityCode}
            onChange={(e) => validateSecurityCode(e.target.value)}
            required
            maxLength="20"
          />
          <IconWrapperRight onClick={() => setShowSecurityCode(!showSecurityCode)}>
            <FontAwesomeIcon icon={showSecurityCode ? faEye : faEyeSlash} />
          </IconWrapperRight>
        </InputWrapper>
        <ButtonGenerateToken type="submit">
          <FontAwesomeIcon icon={faKey} />
          Generar token
        </ButtonGenerateToken>
        <LinkButton onClick={() => router.push('/login')}>Regresar al login</LinkButton>
      </FormContainer>

      {notification && (
        <Notification type={notification.type}>
          <FontAwesomeIcon icon={notification.type === 'error' ? faExclamationCircle : faCheckCircle} />&nbsp;
          {notification.message}
        </Notification>
      )}

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h3>Restablecer Contraseña</h3>
            </ModalHeader>
            <ModalBody>
              <InputWrapper>
                <IconWrapper>
                  <FontAwesomeIcon icon={faLock} />
                </IconWrapper>
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => validatePassword(e.target.value)}
                  required
                  maxLength="20"
                />
                <IconWrapperRight onClick={() => setShowNewPassword(!showNewPassword)}>
                  <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} />
                </IconWrapperRight>
              </InputWrapper>
              <InputWrapper>
                <IconWrapper>
                  <FontAwesomeIcon icon={faLock} />
                </IconWrapper>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => validateConfirmPassword(e.target.value)}
                  required
                  maxLength="20"
                />
                <IconWrapperRight onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                </IconWrapperRight>
              </InputWrapper>
            </ModalBody>
            <ModalFooter>
                <ButtonReset onClick={handleResetPassword}>
                    <FontAwesomeIcon icon={faCheck} />
                    Restablecer
                </ButtonReset>
                <ButtonCancel onClick={handleCancel}>
                    <FontAwesomeIcon icon={faTimes} />
                    Cancelar
                </ButtonCancel>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default ForgotPassword;