import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Spinner from '@/frontend/components/spinner';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faSave, faTrash, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { ProfileContainer, FormContainer, InputContainer, InputWrapper, Icon, ToggleIcon, Input, Description, Line, Button, ButtonContainer } from '../frontend/styles/profile.styles';
import Notification from '../frontend/components/notification';
import DeleteConfirmationModal from '../frontend/components/modalDelete';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', newPassword: '', newSecurityCode:'', role: '' });
  const [userRole, setUserRole] = useState('');
  const [originalData, setOriginalData] = useState({ name: '', email: '', role: '' });
  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showSecurityCode, setShowSecurityCode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setUser({ ...data, newPassword: '', newSecurityCode: '' });
        setOriginalData({ ...data, password: '' });
        setUserRole(data.role);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          showNotification('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', 'warning');
        } else {
          showNotification('Error al cargar el perfil', 'error');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);  

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const validateName = (value) => {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    if (value.length < 3 || value.length > 30) {
      showNotification("El nombre debe tener entre 3 y 30 caracteres.", 'error');
      return false;
    } else if (!nameRegex.test(value)) {
      showNotification("El nombre solo puede contener letras y espacios.", 'error');
      return false;
    }
    return true;
  };

  const validateEmail = (value) => {
    if (value.length < 5 || value.length > 50) {
      showNotification("El correo debe tener entre 5 y 50 caracteres.", 'error');
      return false;
    }
    return true;
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(value)) {
      showNotification("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.", 'error');
      return false;
    }
    return true;
  };

  const validateSecurityCode = (value) => {
    const securityCodeRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/;
    if (!securityCodeRegex.test(value)) {
      showNotification("El código debe tener entre 6 y 20 caracteres, al menos una letra y un número.", 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const trimmedName = user.name.trim();
    const trimmedEmail = user.email.trim();
  
    const isNameValid = validateName(trimmedName);
    const isEmailValid = validateEmail(trimmedEmail);
    const isPasswordValid = user.newPassword ? validatePassword(user.newPassword) : true;
    const isSecurityCodeValid = user.newSecurityCode ? validateSecurityCode(user.newSecurityCode) : true;
  
    if (!isNameValid || !isEmailValid || !isPasswordValid || !isSecurityCodeValid) {
      return;
    }
  
    if (
      trimmedName === originalData.name.trim() &&
      trimmedEmail === originalData.email.trim() &&
      (!user.newPassword || user.newPassword === originalData.password) &&
      (!user.newSecurityCode || user.newSecurityCode === originalData.securityCode)
    ) {
      showNotification('No has modificado ningún dato. Realiza cambios para actualizar.', 'error');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const updatedData = {
        name: trimmedName,
        email: trimmedEmail,
        newPassword: user.newPassword,
        newSecurityCode: user.newSecurityCode,
      };
  
      const response = await axios.put('http://localhost:5000/api/users/profile', updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data.message === 'Usuario actualizado correctamente') {
        if (user.newPassword) {
          showNotification('Contraseña actualizada. Cerrando sesión...', 'success');
          setTimeout(() => {
            localStorage.removeItem('token');
            router.push('/login');
          }, 2000);
        } else {
          showNotification('Perfil actualizado con éxito.', 'success');
          setOriginalData({ name: trimmedName, email: trimmedEmail, role: user.role });
          setUser((prevUser) => ({ ...prevUser, newPassword: '', newSecurityCode: '' }));
          setShowSecurityCode(false);
        }
      }
  
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showNotification(error.response.data.error, 'error');
      } else {
        showNotification('Error al actualizar el perfil', 'error');
      }
    }
  };  

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
        if (!token) {
      showNotification('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', 'warning');
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsModalOpen(false);
      showNotification('Cuenta eliminada exitosamente.', 'success');
      setTimeout(async () => {
        try {
          await axios.delete('http://localhost:5000/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          localStorage.removeItem('token');
          router.push('/login');
        } catch (error) {
          showNotification('Error al eliminar la cuenta', 'error');
        }
      }, 3000);
    } catch (error) {
      setIsModalOpen(false);
      showNotification('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', 'warning');
    }
  };  

  return (
    <>
    {loading ? (
    <Spinner />
    ) : (
    <ProfileContainer>
      <h1>Configuración de Perfil</h1>
      {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

      <FormContainer onSubmit={handleSubmit}>
        <InputContainer>
          <InputWrapper>
            <Icon><FontAwesomeIcon icon={faUser} /></Icon>
            <Input
              type="text"
              name="name"
              placeholder="Nombre"
              value={user.name}
              onChange={handleChange}
              maxLength="30"
            />
          </InputWrapper>
          <Description>Nombre con el que aparecerás en la app.</Description>
        </InputContainer>
        <Line />

        <InputContainer>
          <InputWrapper>
            <Icon><FontAwesomeIcon icon={faEnvelope} /></Icon>
            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={user.email}
              onChange={handleChange}
              maxLength="50"
              disabled={userRole !== 'admin'}
            />
          </InputWrapper>
            {userRole === 'admin' ? (
              <Description>
                Correo del administrador. Tienes acceso total en la app.
              </Description>
            ) : (
              <Description>
                Correo asociado a tu puesto en ventas. <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>NO</span> es editable.
              </Description>
            )}
        </InputContainer>
        <Line />

        <InputContainer>
          <InputWrapper>
            <Icon><FontAwesomeIcon icon={faLock} /></Icon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="newPassword"
              placeholder="Nueva contraseña"
              value={user.newPassword}
              onChange={handleChange}
              maxLength="20"
            />
            <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </ToggleIcon>
          </InputWrapper>
          <Description>Usa una contraseña segura y fácil de recordar.</Description>
        </InputContainer>
        <Line />

        <InputContainer>
          <InputWrapper>
            <Icon><FontAwesomeIcon icon={faUserShield} /></Icon>
            <Input 
              type={showSecurityCode ? 'text' : 'password'} 
              name="newSecurityCode" 
              placeholder="Nuevo código de seguridad" 
              value={user.newSecurityCode} 
              onChange={handleChange} 
              maxLength="20" 
            />
            <ToggleIcon onClick={() => setShowSecurityCode(!showSecurityCode)}>
              <FontAwesomeIcon icon={showSecurityCode ? faEye : faEyeSlash} />
            </ToggleIcon>
          </InputWrapper>
          <Description>Usa un código de seguridad personal, seguro y <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>RECUERDA</span> guardarlo.</Description>
        </InputContainer>
        <Line />

        <InputContainer>
          <p><strong>Rol:</strong> {user.role}</p>
          <Description>
            Tu rol asignado dentro del sistema. <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>NO</span> es editable.
          </Description>
        </InputContainer>
        <Line />

        <ButtonContainer>
          <Button type="submit" className="update"><FontAwesomeIcon icon={faSave} /> Actualizar Perfil</Button>
          <Button type="button" className="delete" onClick={() => setIsModalOpen(true)}>
            <FontAwesomeIcon icon={faTrash} /> Eliminar Cuenta
          </Button>
        </ButtonContainer>
      </FormContainer>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDeleteAccount}
      />
    </ProfileContainer>
    )}
   </>
  );
};

export default Profile;