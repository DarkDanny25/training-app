import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProfileContainer, FormContainer, InputContainer, InputWrapper, Icon, ToggleIcon, Input, Description, Line, Button, ButtonContainer } from '../frontend/styles/profile.styles';
import Notification from '../frontend/components/notification';
import DeleteConfirmationModal from '../frontend/components/modalDelete';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', newPassword: '', role: '' });
  const [originalData, setOriginalData] = useState({}); 
  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ ...data, newPassword: '' });
        setOriginalData({ ...data, password: '' });
      } catch {
        showNotification('Error al cargar el perfil', 'error');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.name === originalData.name && user.email === originalData.email && !user.newPassword) {
      showNotification('No has modificado ningún dato. Realiza cambios para actualizar.', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/profile', {
        name: user.name, email: user.email, password: user.newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (user.newPassword) {
        showNotification('Contraseña actualizada. Cerrando sesión...', 'success');
        setTimeout(() => { localStorage.removeItem('token'); router.push('/login'); }, 2000);
      } else {
        showNotification('Perfil actualizado. Verifica los cambios.', 'success');
        setOriginalData(user);
      }
    } catch {
      showNotification('Error al actualizar el perfil', 'error');
    }
  };

  const handleDeleteAccount = async () => {
    setIsModalOpen(false);
    showNotification('Cuenta eliminada exitosamente.', 'success');
    setIsDeleting(true);

    setTimeout(async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem('token');
        router.push('/login');
      } catch {
        showNotification('Error al eliminar la cuenta', 'error');
      }
      setIsDeleting(false);
    }, 3000);
  };

  return (
    <ProfileContainer>
      <h1>Configuración de Perfil</h1>
      {notification && <Notification message={notification.message} type={notification.type} />}

      <FormContainer onSubmit={handleSubmit}>
        <InputContainer>
          <InputWrapper>
            <Icon><FontAwesomeIcon icon={faUser} /></Icon>
            <Input type="text" name="name" placeholder="Nombre" value={user.name} onChange={handleChange} />
          </InputWrapper>
          <Description>Nombre con el que aparecerás en el sistema.</Description>
        </InputContainer>
        <Line />

        <InputContainer>
          <InputWrapper>
            <Icon><FontAwesomeIcon icon={faEnvelope} /></Icon>
            <Input type="email" name="email" placeholder="Correo electrónico" value={user.email} onChange={handleChange} />
          </InputWrapper>
          <Description>Correo asignado por RH para accesar a la app.</Description>
        </InputContainer>
        <Line />

        <InputContainer>
          <InputWrapper>
            <Icon><FontAwesomeIcon icon={faLock} /></Icon>
            <Input type={showPassword ? 'text' : 'password'} name="newPassword" placeholder="Nueva contraseña" value={user.newPassword} onChange={handleChange} />
            <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </ToggleIcon>
          </InputWrapper>
          <Description>Usa una contraseña segura y fácil de recordar.</Description>
        </InputContainer>
        <Line />

        <InputContainer>
          <p><strong>Rol:</strong> {user.role}</p>
          <Description>Tu rol asignado dentro del sistema. NO es editable.</Description>
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
  );
};

export default Profile;