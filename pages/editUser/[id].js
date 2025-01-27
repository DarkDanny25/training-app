import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Notification from '../../frontend/components/notification';
import { 
  EditUserContainer, 
  EditUserCard,
  EditUserTitle, 
  EditUserInput, 
  EditUserButton, 
  BackButton, 
  ButtonGroup
} from '../../frontend/styles/editUser.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

const EditUser = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const router = useRouter();
  const { id } = router.query;

  const getToken = () => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    if (id) {
      axios.get(`https://backend-app-training.onrender.com/api/users/list/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}`},
      })
      .then(response => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      })
      .catch(() => {
        setNotificationMessage('No se pudo cargar el usuario');
        setNotificationType('error');
        setShowNotification(true);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { name, email, role };
    const hasChanges = name !== user.name || email !== user.email || role !== user.role;

    if (!hasChanges) {
      setNotificationMessage('No se realizaron cambios');
      setNotificationType('error');
      setShowNotification(true);
      return;
    }

    try {
      await axios.put(`https://backend-app-training.onrender.com/api/users/update/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${getToken()}`},
      });
      setNotificationMessage('Usuario actualizado con éxito');
      setNotificationType('success');
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        router.push('/users');
      }, 3000);
    } catch {
      setNotificationMessage('Error al actualizar el usuario');
      setNotificationType('error');
      setShowNotification(true);
    }
  };

  return (
    <EditUserContainer>
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}
      <EditUserCard>
        <EditUserTitle>Editar Usuario</EditUserTitle>
        {user ? (
          <form onSubmit={handleSubmit}>
            <EditUserInput
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <EditUserInput
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <EditUserInput
              type="text"
              placeholder="Rol"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <ButtonGroup>
              <EditUserButton type="submit">
                <FontAwesomeIcon icon={faSave} /> Actualizar Usuario
              </EditUserButton>
              <BackButton onClick={() => router.push('/users')}>
                <FontAwesomeIcon icon={faArrowLeft} /> Regresar
              </BackButton>
            </ButtonGroup>
          </form>
        ) : (
          <p>Cargando...</p>
        )}
      </EditUserCard>
    </EditUserContainer>
  );
};

export default EditUser;