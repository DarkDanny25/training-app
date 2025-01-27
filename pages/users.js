import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  UserTableContainer,
  UserTable,
  UserTableHead,
  UserTableBody,
  UserTableRow,
  UserTableCell,
  UserActionButton,
  UserManagementTitle,
  SearchContainer,
  InputContainer,
  Input,
  SearchIcon,
  PaginationContainer,
  PaginationButton,
} from '../frontend/styles/users.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPen, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmationModal from '../frontend/components/modalDelete';
import Notification from '../frontend/components/notification';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const router = useRouter();

  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://backend-app-training.onrender.com/api/users/list', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        setUsers(response.data);
      } catch (error) {
        setNotification({ show: true, message: 'Error al cargar usuarios', type: 'error' });
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleEdit = (userId) => router.push(`/editUser/${userId}`);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setModalOpen(true);
  };

  const handleDelete = () => {
    axios
      .delete(`https://backend-app-training.onrender.com/api/users/delete/${userToDelete}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
      })
      .then(() => {
        setUsers(users.filter((user) => user._id !== userToDelete));
        setNotification({ show: true, message: 'Usuario eliminado exitosamente', type: 'success' });
      })
      .catch(() =>
        setNotification({ show: true, message: 'Error al eliminar el usuario', type: 'error' })
      )
      .finally(() => {
        setModalOpen(false);
        setUserToDelete(null);
      });
  };

  const currentUsers = users
    .filter(
      ({ name, email, role }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <UserTableContainer>
      <UserManagementTitle>Control de Usuarios</UserManagementTitle>

      <SearchContainer>
        <InputContainer>
          <Input
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
        </InputContainer>
      </SearchContainer>

      <UserTable>
        <UserTableHead>
          <tr>
            <UserTableCell>Nombre</UserTableCell>
            <UserTableCell>Email</UserTableCell>
            <UserTableCell>Rol</UserTableCell>
            <UserTableCell>Acciones</UserTableCell>
          </tr>
        </UserTableHead>
        <UserTableBody>
          {currentUsers.map(({ _id, name, email, role }) => (
            <UserTableRow key={_id}>
              <UserTableCell>{name}</UserTableCell>
              <UserTableCell>{email}</UserTableCell>
              <UserTableCell>{role}</UserTableCell>
              <UserTableCell>
                <UserActionButton className="edit" onClick={() => handleEdit(_id)}>
                  <FontAwesomeIcon icon={faUserPen} />
                </UserActionButton>
                <UserActionButton className="delete" onClick={() => handleDeleteClick(_id)}>
                  <FontAwesomeIcon icon={faUserXmark} />
                </UserActionButton>
              </UserTableCell>
            </UserTableRow>
          ))}
        </UserTableBody>
      </UserTable>

      <PaginationContainer>
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
          <PaginationButton
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            active={currentPage === i + 1}
          >
            {i + 1}
          </PaginationButton>
        ))}
      </PaginationContainer>

      <DeleteConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={handleDelete}
      />

      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: '' })}
        />
      )}
    </UserTableContainer>
  );
};

export default UserManagement;