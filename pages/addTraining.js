import React, { useState } from 'react';
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
  AddButton,
  BackButton,
  Select,
} from '../frontend/styles/addTraining.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFileCirclePlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import Notification from '../frontend/components/notification';

const AddTraining = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    roles: [],
    section: '',
    module: '',
    submodule: '',
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const allRoles = ['asesor', 'asesorJR', 'gerente_sucursal', 'gerente_zona'];
  const allTypes = ['document', 'video'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const supportedTypes = {
      document: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint'],
      video: ['video/mp4'],
    };

    if (!selectedFile) return showNotification('Por favor, selecciona un archivo', 'error');
    const isValidType = supportedTypes[formData.type]?.includes(selectedFile.type);

    if (isValidType) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      showNotification('');
    } else {
      setFile(null);
      setPreviewUrl('');
      showNotification('El tipo de archivo no coincide con el tipo seleccionado', 'error');
    }
  };

  const toggleRole = (role) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role) ? prev.roles.filter((r) => r !== role) : [...prev.roles, role],
    }));
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token || !file) return showNotification('Por favor, selecciona un archivo', 'error');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('type', formData.type);
    formData.roles.forEach((role) => data.append('roles', role));
    data.append('section', formData.section);
    data.append('module', formData.module);
    data.append('submodule', formData.submodule);
    data.append('file', file);

    try {
      await axios.post('https://backend-app-training.onrender.com/api/training', data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`},
      });
      showNotification('Capacitación agregada con éxito');
      setTimeout(() => router.push('/table'), 3000);
    } catch (error) {
      showNotification(error.response?.data?.error || 'Error al agregar la capacitación', 'error');
    }
  };

  return (
    <Container>
      {notification.message && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />
      )}

      <Form onSubmit={handleSubmit}>
        <Title>Agregar Capacitación</Title>
        <Input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Título" required />
        <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" required />
        <Select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Seleccione un tipo</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type === 'document' ? 'Documento' : 'Video'}
            </option>
          ))}
        </Select>

        <Input type="text" name="section" value={formData.section} onChange={handleChange} placeholder="Sección" required />
        <Input type="text" name="module" value={formData.module} onChange={handleChange} placeholder="Módulo" />
        <Input type="text" name="submodule" value={formData.submodule} onChange={handleChange} placeholder="Submódulo (opcional)" />
        
        <FileInput>
          <label>
            <FontAwesomeIcon icon={faUpload} />
            &nbsp;Seleccionar Archivo
            <input type="file" onChange={handleFileChange} />
          </label>
          {previewUrl && (
            <>
              {file.type.startsWith('image') && <img src={previewUrl} alt="Vista previa" />}
              {file.type.startsWith('video') && <video src={previewUrl} controls width="800" />}
              {file.type === 'application/pdf' && <embed src={previewUrl} type="application/pdf" width="800" height="400" />}
              {file.type !== 'image' && file.type !== 'video' && file.type !== 'application/pdf' && (
                <a href={previewUrl} download>{file.name}</a>
              )}
            </>
          )}
        </FileInput>

        <SectionTitle>Asignar Roles</SectionTitle>
        <CheckboxContainer>
          <label>
            <input
              type="checkbox"
              checked={formData.roles.length === allRoles.length}
              onChange={() => setFormData((prev) => ({ ...prev, roles: prev.roles.length === allRoles.length ? [] : allRoles }))} />
            &nbsp;Seleccionar todos
          </label>
          {allRoles.map((role) => (
            <label key={role}>
              <input type="checkbox" checked={formData.roles.includes(role)} onChange={() => toggleRole(role)} />
              &nbsp;{role}
            </label>
          ))}
        </CheckboxContainer>

        <ButtonContainer>
          <AddButton type="submit">
            <FontAwesomeIcon icon={faFileCirclePlus} /> Agregar Capacitación
          </AddButton>
          <BackButton type="button" onClick={() => router.push('/table')}>
            <FontAwesomeIcon icon={faArrowLeft} /> Regresar
          </BackButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default AddTraining;