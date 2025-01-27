import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Container,
  Title,
  Form,
  Input,
  Textarea,
  FileInput,
  CheckboxContainer,
  SectionTitle,
  ButtonContainer,
  BackButton,
  Select,
  EditTrainingButton
} from '../../frontend/styles/editTraining.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUpload, faSave } from '@fortawesome/free-solid-svg-icons';
import Notification from '../../frontend/components/notification';

const EditTraining = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    roles: [],
    section: '',
    module: '',
    submodule: '',
  });
  const [initialData, setInitialData] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  const allRoles = ['asesor', 'asesorJR', 'gerente_sucursal', 'gerente_zona'];
  const allTypes = ['document', 'video'];

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://backend-app-training.onrender.com/api/training/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { title, description, type, roles, fileUrl, section, module, submodule } = response.data;
        setFormData({ title, description, type, roles, section, module, submodule });
        setInitialData({ title, description, type, roles, section, module, submodule });

        if (fileUrl) {
          setPreviewUrl(`https://backend-app-training.onrender.com${fileUrl}`);
        }

        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos del material');
        setLoading(false);
      }
    };

    if (id) fetchTraining();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const supportedTypes = {
      document: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint'],
      video: ['video/mp4'],
    };

    if (!selectedFile) {
      setFile(null);
      setPreviewUrl('');
      setError('Por favor, selecciona un archivo');
      return;
    }

    const isValidType = supportedTypes[formData.type]?.includes(selectedFile.type);
    if (isValidType) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError('');
    } else {
      setFile(null);
      setPreviewUrl('');
      setError('El tipo de archivo no coincide con el tipo seleccionado');
    }
  };

  const toggleRole = (role) => {
    setFormData((prev) => {
      const newRoles = prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles: newRoles };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    const updatedData = {
      ...formData,
      section: formData.section === null ? '' : formData.section,
      module: formData.module === null ? '' : formData.module,
      submodule: formData.submodule === null ? '' : formData.submodule,
    };

    if (JSON.stringify(initialData) === JSON.stringify(updatedData) && file === null) {
      setNotificationMessage('No se realizaron cambios');
      setNotificationType('error');
      setShowNotification(true);
      return;
    }

    const data = new FormData();
    data.append('title', updatedData.title);
    data.append('description', updatedData.description);
    data.append('type', updatedData.type);
    updatedData.roles.forEach((role) => data.append('roles', role));
    data.append('section', updatedData.section);
    data.append('module', updatedData.module);
    data.append('submodule', updatedData.submodule);
    if (file) data.append('file', file);

    try {
      await axios.put(`https://backend-app-training.onrender.com/api/training/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });

      setNotificationMessage('Capacitación actualizada con éxito');
      setNotificationType('success');
      setShowNotification(true);

      setTimeout(() => {
        router.push('/table');
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.error || 'Error al actualizar la capacitación');
    }
  };

  const getDisplayValue = (value) => {
    return value === null || value === '' ? '' : value;
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <Container>
      {showNotification && (
        <Notification message={notificationMessage} type={notificationType} onClose={() => setShowNotification(false)} />
      )}
      <Form onSubmit={handleSubmit}>
        <Title>Editar Capacitación</Title>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <Select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Seleccione un tipo</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type === 'document' ? 'Documento' : 'Video'}
            </option>
          ))}
        </Select>
        <Input
          type="text"
          name="section"
          value={getDisplayValue(formData.section)}
          onChange={handleChange}
          placeholder="Sección"
          required
        />
        <Input
          type="text"
          name="module"
          value={getDisplayValue(formData.module)}
          onChange={handleChange}
          placeholder="Módulo"
        />
        <Input
          type="text"
          name="submodule"
          value={getDisplayValue(formData.submodule)}
          onChange={handleChange}
          placeholder="Submódulo (opcional)"
        />
        <FileInput>
          <label>
            <FontAwesomeIcon icon={faUpload} />
            &nbsp;Seleccionar Archivo
            <input type="file" onChange={handleFileChange} />
          </label>
          {previewUrl && <embed src={previewUrl} type={file?.type} width="800" height="400" />}
        </FileInput>
        <SectionTitle>Asignar Roles</SectionTitle>
        <CheckboxContainer>
          {allRoles.map((role) => (
            <label key={role}>
              <input
                type="checkbox"
                checked={formData.roles.includes(role)}
                onChange={() => toggleRole(role)}
              />
              &nbsp;{role}
            </label>
          ))}
        </CheckboxContainer>
        <ButtonContainer>
          <EditTrainingButton type="submit">
            <FontAwesomeIcon icon={faSave} />Actualizar Capacitación
          </EditTrainingButton>
          <BackButton type="button" onClick={() => router.push('/table')}>
            <FontAwesomeIcon icon={faArrowLeft} />Regresar
          </BackButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default EditTraining;