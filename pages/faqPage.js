import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Title, 
  FAQList, 
  FAQItem, 
  Question, 
  Answer, 
  Divider, 
  ErrorBadge, 
  InputSearch,
  IconWrapper,
} from '../frontend/styles/faqPage.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFAQs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return setError('No se encuentra el token de autenticación');
      }

      try {
        const { data } = await axios.get('http://localhost:5000/api/faqs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.length === 0) {
          setError('No hay preguntas frecuentes disponibles');
        } else {
          setFaqs(data);
          setFilteredFaqs(data);
        }
      } catch {
        setError('Error al obtener las FAQs');
      }
    };

    fetchFAQs();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = faqs.filter(({ question }) =>
      question.toLowerCase().includes(query)
    );
    setFilteredFaqs(filtered);
  };

  return (
    <Container>
      <Title>Preguntas Frecuentes (FAQs)</Title>
      <InputSearch value={searchQuery} onChange={handleSearch}>
        <input type="text" placeholder="Búsqueda de FAQ..." />
        <IconWrapper>
          <FontAwesomeIcon icon={faSearch} />
        </IconWrapper>
      </InputSearch>
      <Divider />
      {error && (
        <ErrorBadge>
          <FontAwesomeIcon icon={faExclamationCircle} style={{ fontSize: '15px' }} /> {error}
        </ErrorBadge>
      )}
      <FAQList>
        {filteredFaqs.map(({ _id, question, answer }) => (
          <FAQItem key={_id}>
            <Question>{question}</Question>
            <Answer>{answer}</Answer>
            <Divider />
          </FAQItem>
        ))}
      </FAQList>
    </Container>
  );
};

export default FAQs;