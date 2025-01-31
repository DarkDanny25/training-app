import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Container,
  Title,
  SearchContainer,
  Input,
  AddButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  ActionButton,
  PaginationContainer,
  PaginationButton,
  SearchIcon,
  InputContainer,
  TrainingButton
} from '../frontend/styles/faqs.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash, faFileLines, faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmationModal from '../frontend/components/modalDelete';
import Notification from '../frontend/components/notification';

const FAQTable = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [faqsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  const minLength = 3;
  const maxLength = 50;

  const truncateText = (text, length = 20) => text.length > length ? `${text.slice(0, length)}...` : text;

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setNotification({ message: 'No se encuentra el token de autenticación', type: 'error' });
          return;
        }

        const response = await axios.get('http://localhost:5000/api/faqs', {
          headers: { Authorization: `Bearer ${token}`},
        });
        setFaqs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setNotification({ message: 'Error al obtener las FAQs', type: 'error' });
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleSearchChange = (e) => {
    let query = e.target.value.trim();

    if (query.length > maxLength) {
      query = query.slice(0, maxLength);
    }

    setSearchTerm(query);

    if (query === '') {
      setNotification(null);
      return;
    }

    if (query.length < minLength || query.length > maxLength) {
      setNotification({
        type: 'error',
        message: `La búsqueda debe tener entre ${minLength} y ${maxLength} caracteres.`
      });
      return;
    } else {
      setNotification(null);
    }
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.roles.join(', ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastFAQ = currentPage * faqsPerPage;
  const indexOfFirstFAQ = indexOfLastFAQ - faqsPerPage;
  const currentFaqs = filteredFaqs.slice(indexOfFirstFAQ, indexOfLastFAQ);
  const totalPages = Math.ceil(filteredFaqs.length / faqsPerPage);

  const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (faq) => {
    setSelectedFAQ(faq);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setNotification({ message: 'No se encuentra el token de autenticación', type: 'error' });
        setModalOpen(false);
        return;
      }

      await axios.delete(`http://localhost:5000/api/faqs/${selectedFAQ._id}`, {
        headers: { Authorization: `Bearer ${token}`}, 
      });
      setFaqs(prevFaqs => prevFaqs.filter(f => f._id !== selectedFAQ._id));
      setModalOpen(false);
      setNotification({ message: 'FAQ eliminada correctamente', type: 'success' });
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setModalOpen(false);
      setNotification({ message: 'Error al eliminar la FAQ', type: 'error' });
    }
  };

  const handleAddFAQ = () => router.push('/addFAQ');

  const handleGoToTraining = () => router.push('/table');

  return (
    <Container>
      <Title>Control de FAQs</Title>

      <SearchContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Buscar FAQ..."
            value={searchTerm}
            onChange={handleSearchChange}
            maxLength={maxLength}
          />
          <SearchIcon>
            <FontAwesomeIcon icon={faSearch} />
          </SearchIcon>
        </InputContainer>
        <TrainingButton onClick={handleGoToTraining}>
          <FontAwesomeIcon icon={faFileLines} /> Ir a Capacitación
        </TrainingButton>
        <AddButton onClick={handleAddFAQ}>
          <FontAwesomeIcon icon={faClipboardQuestion} /> Agregar FAQ
        </AddButton>
      </SearchContainer>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <Table>
            <TableHead>
              <tr>
                <TableCell>Pregunta</TableCell>
                <TableCell>Respuesta</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Acciones</TableCell>
              </tr>
            </TableHead>
            <TableBody>
              {currentFaqs.map((faq) => (
                <TableRow key={faq._id}>
                  <TableCell>{truncateText(faq.question, 40)}</TableCell>
                  <TableCell>{truncateText(faq.answer, 40)}</TableCell>
                  <TableCell>{truncateText(faq.roles.join(', '), 40)}</TableCell>
                  <TableCell>
                    <ActionButton className="edit" onClick={() => router.push(`/editFAQ/${faq._id}`)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </ActionButton>
                    <ActionButton className="delete" onClick={() => handleDeleteClick(faq)}>
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

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <DeleteConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={handleDelete}
        title={selectedFAQ?.question}
      />
    </Container>
  );
};

export default FAQTable;