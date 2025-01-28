import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Notification from '../../frontend/components/notification';
import { 
  EditFAQContainer, 
  EditFAQCard,
  EditFAQTitle, 
  EditFAQInput, 
  EditFAQTextArea, 
  EditFAQButton, 
  BackButton, 
  RoleContainer, 
  RoleLabel, 
  ButtonGroup 
} from '../../frontend/styles/editFAQ.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

const EditFAQ = () => {
  const [faq, setFaq] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [roles, setRoles] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchFAQ = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/faqs/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFaq(response.data);
          setQuestion(response.data.question);
          setAnswer(response.data.answer);
          setRoles(response.data.roles);
        } catch {
          setNotificationMessage('Hubo un error al cargar el FAQ. Intenta nuevamente más tarde.');
          setNotificationType('error');
          setShowNotification(true);
        }
      };
      fetchFAQ();
    }
  }, [id]);

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRoles((prevRoles) =>
      prevRoles.includes(value)
        ? prevRoles.filter((role) => role !== value)
        : [...prevRoles, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { question, answer, roles };
    const hasChanges =
      question !== faq.question ||
      answer !== faq.answer ||
      JSON.stringify(roles) !== JSON.stringify(faq.roles);

    if (!hasChanges) {
      setNotificationMessage('No se han detectado cambios para actualizar el FAQ.');
      setNotificationType('error');
      setShowNotification(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/faqs/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotificationMessage('Los cambios se han guardado correctamente. Verifica en la lista de FAQs.');
      setNotificationType('success');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        router.push('/faqs');
      }, 3000);
    } catch {
      setNotificationMessage('Hubo un problema al actualizar el FAQ. Asegúrate de que los datos sean correctos e intenta nuevamente.');
      setNotificationType('error');
      setShowNotification(true);
    }
  };

  return (
    <EditFAQContainer>
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}
      <EditFAQCard>
        <EditFAQTitle>Editar FAQ</EditFAQTitle>
        {faq ? (
          <form onSubmit={handleSubmit}>
            <EditFAQInput
              type="text"
              placeholder="Pregunta"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <EditFAQTextArea
              placeholder="Respuesta"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <RoleContainer>
              <label>Roles:</label>
              <div>
                {['asesor', 'asesorJR', 'gerente_sucursal', 'gerente_zona'].map((role) => (
                  <RoleLabel key={role}>
                    <input
                      type="checkbox"
                      value={role}
                      checked={roles.includes(role)}
                      onChange={handleRoleChange}
                    />
                    {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                  </RoleLabel>
                ))}
              </div>
            </RoleContainer>
            <ButtonGroup>
              <EditFAQButton type="submit">
                <FontAwesomeIcon icon={faSave} /> Actualizar FAQ
              </EditFAQButton>
              <BackButton onClick={() => router.push('/faqs')}>
                <FontAwesomeIcon icon={faArrowLeft} /> Regresar
              </BackButton>
            </ButtonGroup>
          </form>
        ) : (
          <p>Cargando...</p>
        )}
      </EditFAQCard>
    </EditFAQContainer>
  );
};

export default EditFAQ;