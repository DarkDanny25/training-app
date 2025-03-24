import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Notification from '../../frontend/components/notification';
import Spinner from '@/frontend/components/spinner';  
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
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [loading, setLoading] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const getToken = () => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`http://localhost:5000/api/users/list/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(response => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setTokenExpired(true);
          setNotificationMessage('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
          setNotificationType('warning');
          setShowNotification(true);
        } else {
          setNotificationMessage('No se pudo cargar el usuario');
          setNotificationType('error');
          setShowNotification(true);
        }
      })      
      .finally(() => setLoading(false));
    }
  }, [id]);

  const validateName = (value) => {
    if (value.trim().length < 3 || value.trim().length > 30) {
      setNotificationMessage('El nombre debe tener entre 3 y 30 caracteres.');
      setNotificationType('error');
      setShowNotification(true);
      return false;
    }
    return true;
  };

  const validateEmail = (value) => {
    if (value.length < 5 || value.length > 50) {
      setNotificationMessage('El correo debe tener entre 5 y 50 caracteres.');
      setNotificationType('error');
      setShowNotification(true);
      return false;
    }
    return true;
  };

  const validateRole = (value) => {
    const validRoles = ['asesor', 'asesorJR', 'gerente_sucursal', 'gerente_zona', 'admin'];
    if (!validRoles.includes(value)) {
      setNotificationMessage('El rol debe ser uno de los siguientes: asesor, asesorJR, gerente_sucursal, gerente_zona o admin.');
      setNotificationType('error');
      setShowNotification(true);
      return false;
    } else if (value.length > 25) {
      setNotificationMessage('El rol no debe exceder los 25 caracteres.');
      setNotificationType('error');
      setShowNotification(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tokenExpired) {
      setNotificationMessage('Token inválido o expirado.');
      setNotificationType('error');
      setShowNotification(true);
      return;
    }

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isRoleValid = validateRole(role);

    if (!isNameValid || !isEmailValid || !isRoleValid) {
      return;
    }

    const updatedData = { name, email, role };
    const hasChanges = name !== user.name || email !== user.email || role !== user.role;

    if (!hasChanges) {
      setNotificationMessage('No se realizaron cambios');
      setNotificationType('error');
      setShowNotification(true);
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/users/update/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${getToken()}` },
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

  const handleGoBack = (e) => {
    e.preventDefault();
    router.push('/users');
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
            <form onSubmit={handleSubmit}>
              <EditUserInput
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength="30"
                required
              />
              <EditUserInput
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength="50"
                required
              />
              <EditUserInput
                type="text"
                placeholder="Rol"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                maxLength="25"
                required
              />
              <ButtonGroup>
                <EditUserButton type="submit">
                  <FontAwesomeIcon icon={faSave} /> Actualizar Usuario
                </EditUserButton>
                <BackButton onClick={handleGoBack}>
                  <FontAwesomeIcon icon={faArrowLeft} /> Regresar
                </BackButton>
              </ButtonGroup>
            </form>
          </EditUserCard>
        </EditUserContainer>
      )}
    </>
  );
};

export default EditUser;