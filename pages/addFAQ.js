import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Notification from '../frontend/components/notification';
import {
  AddFAQContainer,
  AddFAQCard,
  AddFAQTitle,
  AddFAQInput,
  AddFAQTextArea,
  ButtonGroup,
  AddFAQButton,
  BackButton,
  RoleCheckboxContainer,
  CheckboxLabel,
} from '../frontend/styles/addFAQ.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';

const rolesOptions = ['asesor', 'asesorJR', 'gerente_sucursal', 'gerente_zona'];

const AddFAQ = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [roles, setRoles] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const router = useRouter();

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRoles((prevRoles) =>
      prevRoles.includes(value)
        ? prevRoles.filter((role) => role !== value)
        : [...prevRoles, value]
    );
  };

  const handleSelectAll = () => {
    setRoles(roles.length === rolesOptions.length ? [] : rolesOptions);
  };

  const validateQuestion = (value) => {
    if (value.trim().length < 5 || value.trim().length > 100) {
      setNotification({ message: 'La pregunta debe tener entre 5 y 100 caracteres.', type: 'error' });
      return false;
    }
    return true;
  };

  const validateAnswer = (value) => {
    if (value.trim().length < 10 || value.trim().length > 500) {
      setNotification({ message: 'La respuesta debe tener entre 10 y 500 caracteres.', type: 'error' });
      return false;
    }
    return true;
  };

  const validateRoles = () => {
    if (roles.length === 0) {
      setNotification({ message: 'Debes seleccionar al menos un rol.', type: 'error' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isQuestionValid = validateQuestion(question);
    const isAnswerValid = validateAnswer(answer);
    const areRolesValid = validateRoles();

    if (!isQuestionValid || !isAnswerValid || !areRolesValid) {
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/faqs',
        { question, answer, roles },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`} }
      );
      setNotification({ message: response.data.message, type: 'success' });
      setTimeout(() => {
        router.push('/faqs');
      }, 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.error === 'Ya existe un FAQ con la misma pregunta y roles'
        ? 'Ya existe un FAQ con la misma pregunta y roles'
        : 'No se pudo crear el FAQ';
      setNotification({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <AddFAQContainer>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <AddFAQCard>
        <AddFAQTitle>Agregar FAQ</AddFAQTitle>
        <form onSubmit={handleSubmit}>
          <AddFAQInput
            type="text"
            placeholder="Pregunta"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength="100"
            required
          />
          <AddFAQTextArea
            placeholder="Respuesta"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            maxLength="500"
            required
          />
          <div>
            <label>Roles:</label>
            <RoleCheckboxContainer>
              <CheckboxLabel>
                <input type="checkbox" onChange={handleSelectAll} />
                <span>Seleccionar todos</span>
              </CheckboxLabel>
              {rolesOptions.map((role) => (
                <CheckboxLabel key={role}>
                  <input
                    type="checkbox"
                    value={role}
                    checked={roles.includes(role)}
                    onChange={handleRoleChange}
                  />
                  <span>{role}</span>
                </CheckboxLabel>
              ))}
            </RoleCheckboxContainer>
          </div>
          <ButtonGroup>
            <AddFAQButton type="submit">
              <FontAwesomeIcon icon={faClipboardQuestion} /> Agregar FAQ
            </AddFAQButton>
            <BackButton type="button" onClick={() => router.push('/faqs')}>
              <FontAwesomeIcon icon={faArrowLeft} /> Regresar
            </BackButton>
          </ButtonGroup>
        </form>
      </AddFAQCard>
    </AddFAQContainer>
  );
};

export default AddFAQ;