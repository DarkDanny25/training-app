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
  PreviewContainer,
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

  const supportedTypes = {
    document: ['pdf', 'docx', 'pptx'],
    video: ['mp4'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (e.target.name === 'type' && file && !supportedTypes[value]?.includes(file.format)) {
      setFile(null);
      setPreviewUrl('');
    }
  };

  const handleWidgetOpen = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'darkdanny25',
        uploadPreset: 'jewl7kdx',
        sources: ['local', 'url', 'camera', 'dropbox', 'facebook', 'instagram'],
        resourceType: 'auto',
        folder: 'public_files',
      },
      (error, result) => {
        if (error) {
          return showNotification('Error al cargar el archivo', 'error');
        }

        if (result.event === 'success') {
          const uploadedFile = result.info;
          const fileType = uploadedFile.format;

          if (!supportedTypes[formData.type]?.includes(fileType)) {
            setFile(null);
            setPreviewUrl('');
            return showNotification('El tipo de archivo no coincide con el tipo seleccionado', 'error');
          }

          setFile(uploadedFile);
          setPreviewUrl(uploadedFile.secure_url);
          showNotification('Archivo cargado con éxito');
        }
      }
    );
    widget.open();
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const validateInputs = () => {
    if (formData.title.length < 5 || formData.title.length > 100) {
      showNotification('El título debe tener entre 5 y 100 caracteres.', 'error');
      return false;
    }
    if (formData.description.length < 10 || formData.description.length > 500) {
      showNotification('La descripción debe tener entre 10 y 500 caracteres.', 'error');
      return false;
    }
    if (formData.section.length < 3 || formData.section.length > 50) {
      showNotification('La sección debe tener entre 3 y 50 caracteres.', 'error');
      return false;
    }
    if (formData.module && (formData.module.length < 3 || formData.module.length > 50)) {
      showNotification('El módulo debe tener entre 3 y 50 caracteres.', 'error');
      return false;
    }
    if (formData.submodule && (formData.submodule.length < 3 || formData.submodule.length > 50)) {
      showNotification('El submódulo debe tener entre 3 y 50 caracteres.', 'error');
      return false;
    }
    if (!formData.roles.length) {
      showNotification('Debes seleccionar al menos un rol.', 'error');
      return false;
    }
    if (formData.type && !file) {
      showNotification('Debes cargar un archivo para el tipo seleccionado.', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token || !file) return showNotification('Por favor, selecciona un archivo', 'error');

    const { secure_url, original_filename } = file;
    if (!secure_url || !original_filename) return showNotification('Error al cargar el archivo. Intenta nuevamente.', 'error');

    const data = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      roles: formData.roles,
      section: formData.section,
      module: formData.module,
      submodule: formData.submodule,
      fileUrl: secure_url,
      originalFileName: original_filename,
    };

    if (!validateInputs()) {
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/training', data, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
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

        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
          required
          maxLength="100"
        />
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
          maxLength="500"
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
          value={formData.section}
          onChange={handleChange}
          placeholder="Sección"
          required
          maxLength="50"
        />
        <Input
          type="text"
          name="module"
          value={formData.module}
          onChange={handleChange}
          placeholder="Módulo"
          maxLength="50"
        />
        <Input
          type="text"
          name="submodule"
          value={formData.submodule}
          onChange={handleChange}
          placeholder="Submódulo (opcional)"
          maxLength="50"
        />

        <FileInput>
          <label onClick={handleWidgetOpen}>
            <FontAwesomeIcon icon={faUpload} /> Seleccionar Archivo
          </label>
        </FileInput>

        {previewUrl && (
          <PreviewContainer>
            {formData.type === 'document' ? <embed src={previewUrl} type="application/pdf" /> : <video src={previewUrl} controls />}
          </PreviewContainer>
        )}

        <SectionTitle>Asignar Roles</SectionTitle>
        <CheckboxContainer>
          <label>
            <input
              type="checkbox"
              checked={formData.roles.length === allRoles.length}
              onChange={() => setFormData((prev) => ({
                ...prev,
                roles: prev.roles.length === allRoles.length ? [] : allRoles,
              }))}
            /> Seleccionar todos
          </label>
          {allRoles.map((role) => (
            <label key={role}>
              <input
                type="checkbox"
                checked={formData.roles.includes(role)}
                onChange={() => setFormData((prev) => ({
                  ...prev,
                  roles: prev.roles.includes(role)
                    ? prev.roles.filter((r) => r !== role)
                    : [...prev.roles, role],
                }))}
              /> {role}
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