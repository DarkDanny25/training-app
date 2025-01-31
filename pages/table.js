import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Input,
  AddButton,
  ActionButton,
  SearchContainer,
  InputContainer,
  SearchIcon,
  FileLink,
  Title,
  PaginationContainer,
  PaginationButton,
  FAQButton
} from '../frontend/styles/table.styles';
import DeleteConfirmationModal from '../frontend/components/modalDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faFileCirclePlus, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Notification from '../frontend/components/notification';

const TrainingTable = () => {
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const router = useRouter();

  const minLength = 3;
  const maxLength = 50;

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/training', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const trainingsArray = Object.values(data).flatMap(modules => Object.values(modules).flatMap(training => training));
      setTrainings(trainingsArray);
      setFilteredTrainings(trainingsArray);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNotification({ type: 'error', message: 'Error al cargar las capacitaciones' });
    }
  };

  const handleSearchChange = (e) => {
    let query = e.target.value.trim();

    if (query.length > maxLength) {
      query = query.slice(0, maxLength);
    }

    setSearchTerm(query);

    if (query === '') {
      setFilteredTrainings(trainings);
      setNotification(null);
      return;
    }

    if (query.length < minLength || query.length > maxLength) {
      setNotification({
        type: 'error',
        message: `La búsqueda debe tener entre ${minLength} y ${maxLength} caracteres.`
      });
      setFilteredTrainings([]);
      return;
    } else {
      setNotification(null);
    }

    const filtered = trainings.filter((training) =>
      [training.title, training.description, training.type, training.roles.join(', '), 
       training.originalFileName, training.fileUrl, training.section, training.module, training.submodule]
       .some(val => val?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredTrainings(filtered);
  };

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddTraining = () => router.push('/addTraining');
  const handleGoToFAQ = () => router.push('/faqs');

  const handleDeleteClick = (training) => {
    setSelectedTraining(training);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/training/${selectedTraining._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTrainings(trainings.filter(t => t._id !== selectedTraining._id));
      setModalOpen(false);
      setNotification({ type: 'success', message: 'Capacitación eliminada exitosamente' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error al eliminar la capacitación' });
    }
  };

  const currentTrainings = filteredTrainings.slice((currentPage - 1) * 5, currentPage * 5);
  const totalPages = Math.ceil(filteredTrainings.length / 5);

  return (
    <Container>
      <Title>Control de Capacitación</Title>
      <SearchContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
            maxLength={maxLength}
          />
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
        </InputContainer>
        <FAQButton onClick={handleGoToFAQ}>
          <FontAwesomeIcon icon={faCircleQuestion} /> Ir a FAQs
        </FAQButton>
        <AddButton onClick={handleAddTraining}>
          <FontAwesomeIcon icon={faFileCirclePlus} /> Agregar Capacitación
        </AddButton>
      </SearchContainer>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Table>
            <TableHead>
              <tr>
                {['Título', 'Descripción', 'Tipo', 'Roles', 'Sección', 'Módulo', 'Submódulo', 'Archivo', 'Acciones'].map((header) => (
                  <TableCell key={header} className={header === 'Acciones' ? '' : 'center'}>{header}</TableCell>
                ))}
              </tr>
            </TableHead>
            <TableBody>
              {currentTrainings.map((training, index) => (
                <TableRow key={training._id} className={index % 2 === 0 ? 'striped' : ''}>
                  <TableCell>{truncateText(training.title, 20)}</TableCell>
                  <TableCell>{truncateText(training.description, 30)}</TableCell>
                  <TableCell className="center">{truncateText(training.type, 30)}</TableCell>
                  <TableCell className="center">{truncateText(training.roles.join(', '), 20)}</TableCell>
                  <TableCell className="center">{truncateText(training.section, 30, 'Sección no disponible')}</TableCell>
                  <TableCell className="center">{truncateText(training.module, 30, 'Módulo no disponible')}</TableCell>
                  <TableCell className="center">{truncateText(training.submodule, 30, 'Submódulo no disponible')}</TableCell>
                  <TableCell className="center">
                    <FileLink href={training.fileUrl} target="_blank" rel="noopener noreferrer">
                      {truncateText(training.originalFileName, 30)}
                    </FileLink>
                  </TableCell>
                  <TableCell>
                    <ActionButton className="edit" onClick={() => router.push(`/editTraining/${training._id}`)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </ActionButton>
                    <ActionButton className="delete" onClick={() => handleDeleteClick(training)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <PaginationContainer>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationButton
                key={index}
                onClick={() => handlePagination(index + 1)}
                active={currentPage === index + 1}
              >
                {index + 1}
              </PaginationButton>
            ))}
          </PaginationContainer>
        </>
      )}

      <DeleteConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={handleDelete}
        title={selectedTraining?.title}
      />
    </Container>
  );

  function truncateText(text, length, fallback = '') {
    return text && text.length > length ? `${text.slice(0, length)}...` : (text || fallback);
  }
};

export default TrainingTable;