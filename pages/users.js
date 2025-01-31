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
  const minLength = 3;
  const maxLength = 50;

  const truncateText = (text, length = 20) => text.length > length ? `${text.slice(0, length)}...` : text;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/list', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        setUsers(response.data);
      } catch (error) {
        setNotification({ show: true, message: 'Error al cargar usuarios', type: 'error' });
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    let query = e.target.value.trim();

    if (query.length > maxLength) {
      query = query.slice(0, maxLength);
    }

    setSearchTerm(query);

    if (query === '') {
      setNotification({ show: false, message: '', type: '' });
      return;
    }

    if (query.length < minLength || query.length > maxLength) {
      setNotification({
        show: true,
        message: `La búsqueda debe tener entre ${minLength} y ${maxLength} caracteres.`,
        type: 'error',
      });
      return;
    } else {
      setNotification({ show: false, message: '', type: '' });
    }
  };

  const filteredUsers = users.filter(
    ({ name, email, role }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setModalOpen(true);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/users/delete/${userToDelete}`, {
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

  const handleEdit = (userId) => router.push(`/editUser/${userId}`);

  return (
    <UserTableContainer>
      <UserManagementTitle>Control de Usuarios</UserManagementTitle>

      <SearchContainer>
        <InputContainer>
          <Input
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={handleSearch}
            maxLength={maxLength}
          />
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
        </InputContainer>
      </SearchContainer>

      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: '' })}
        />
      )}

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
              <UserTableCell>{truncateText(name, 40)}</UserTableCell>
              <UserTableCell>{truncateText(email, 40)}</UserTableCell>
              <UserTableCell>{truncateText(role, 40)}</UserTableCell>
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
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationButton
            key={i + 1}
            onClick={() => handlePagination(i + 1)}
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
    </UserTableContainer>
  );
};

export default UserManagement;