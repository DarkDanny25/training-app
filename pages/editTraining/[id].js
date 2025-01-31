import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Notification from '../../frontend/components/notification';
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
  const [fileUrl, setFileUrl] = useState('');
  const [originalFileName, setOriginalFileName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  const allRoles = ['asesor', 'asesorJR', 'gerente_sucursal', 'gerente_zona'];
  const allTypes = ['document', 'video'];

  const supportedTypes = {
    document: ['pdf', 'docx', 'pptx'],
    video: ['mp4'],
  };

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/training/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { title, description, type, roles, fileUrl, section, module, submodule, originalFileName } = response.data;
        setFormData({ title, description, type, roles, section, module, submodule });
        setInitialData({ title, description, type, roles, section, module, submodule, fileUrl, originalFileName });

        if (fileUrl) {
          setFileUrl(fileUrl);
          setOriginalFileName(originalFileName);
          setPreviewUrl(fileUrl);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        handleNotification('Error al cargar los datos del material', 'error');
      }
    };

    if (id) fetchTraining();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleRole = (role) => {
    setFormData((prev) => {
      const newRoles = prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles: newRoles };
    });
  };

  const handleWidgetOpen = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'darkdanny25',
        uploadPreset: 'jewl7kdx',
        sources: ['local', 'url', 'camera', 'dropbox', 'facebook', 'instagram'],
        resourceType: 'auto',
      },
      (error, result) => {
        if (error) {
          setNotificationMessage('Error al cargar el archivo');
          setNotificationType('error');
          setShowNotification(true);
          return;
        }

        if (result.event === 'success') {
          const uploadedFile = result.info;
          const fileExtension = uploadedFile.format.toLowerCase();

          if (formData.type && !supportedTypes[formData.type]?.includes(fileExtension)) {
            setFileUrl('');
            setPreviewUrl('');
            setNotificationMessage('El tipo de archivo no coincide con el tipo seleccionado');
            setNotificationType('error');
            setShowNotification(true);
            return;
          }

          setFileUrl(uploadedFile.secure_url);
          setOriginalFileName(uploadedFile.original_filename);
          setPreviewUrl(uploadedFile.secure_url);
          setNotificationMessage('Archivo cargado con éxito');
          setNotificationType('success');
          setShowNotification(true);
        }
      }
    );
    widget.open();
  };

  const handleNotification = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const validateInputs = () => {
    if (formData.title.length < 5 || formData.title.length > 100) {
      handleNotification('El título debe tener entre 5 y 100 caracteres.', 'error');
      return false;
    }
    if (formData.description.length < 10 || formData.description.length > 500) {
      handleNotification('La descripción debe tener entre 10 y 500 caracteres.', 'error');
      return false;
    }
    if (formData.section.length < 3 || formData.section.length > 50) {
      handleNotification('La sección debe tener entre 3 y 50 caracteres.', 'error');
      return false;
    }
    if (formData.module && (formData.module.length < 3 || formData.module.length > 50)) {
      handleNotification('El módulo debe tener entre 3 y 50 caracteres.', 'error');
      return false;
    }
    if (formData.submodule && (formData.submodule.length < 3 || formData.submodule.length > 50)) {
      handleNotification('El submódulo debe tener entre 3 y 50 caracteres.', 'error');
      return false;
    }
    if (!formData.roles.length) {
      handleNotification('Debes seleccionar al menos un rol.', 'error');
      return false;
    }
    if (formData.type && !fileUrl) {
      handleNotification('Debes cargar un archivo para el tipo seleccionado.', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!validateInputs()) {
      return;
    }

    const updatedData = {
      ...formData,
      fileUrl: fileUrl || initialData.fileUrl,
      originalFileName: originalFileName || initialData.originalFileName,
    };

    const hasChanges = Object.keys(updatedData).some((key) => {
      return JSON.stringify(updatedData[key]) !== JSON.stringify(initialData[key]);
    });

    if (formData.type !== initialData.type && fileUrl) {
      const fileExtension = fileUrl.split('.').pop().toLowerCase();
      if (!supportedTypes[formData.type]?.includes(fileExtension)) {
        setNotificationMessage('El nuevo archivo no coincide con el tipo seleccionado');
        setNotificationType('error');
        setShowNotification(true);
        return;
      }
    }

    if (!hasChanges) {
      handleNotification('No se realizaron cambios', 'error');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/training/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      handleNotification('Capacitación actualizada con éxito');
      setTimeout(() => router.push('/table'), 3000);
    } catch (error) {
      handleNotification(error.response?.data?.error || 'Error al actualizar la capacitación', 'error');
    }
  };

  const getDisplayValue = (value) => value || '';

  if (loading) return <p>Cargando datos...</p>;

  return (
    <Container>
      {showNotification && (
        <Notification message={notificationMessage} type={notificationType} onClose={() => setShowNotification(false)} />
      )}

      <Form onSubmit={handleSubmit}>
        <Title>Editar Capacitación</Title>
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
        
        <Input type="text" name="section" value={getDisplayValue(formData.section)} onChange={handleChange} placeholder="Sección" required />
        <Input type="text" name="module" value={getDisplayValue(formData.module)} onChange={handleChange} placeholder="Módulo" />
        <Input type="text" name="submodule" value={getDisplayValue(formData.submodule)} onChange={handleChange} placeholder="Submódulo (opcional)" />
        
        <FileInput>
          <label onClick={handleWidgetOpen}>
            <FontAwesomeIcon icon={faUpload} /> Seleccionar Archivo
          </label>
          {previewUrl && <embed src={previewUrl} type="application/pdf" width="800" height="400" />}
        </FileInput>
        
        <SectionTitle>Asignar Roles</SectionTitle>
        <CheckboxContainer>
          {allRoles.map((role) => (
            <label key={role}>
              <input type="checkbox" checked={formData.roles.includes(role)} onChange={() => toggleRole(role)} />
              &nbsp;{role}
            </label>
          ))}
        </CheckboxContainer>
        
        <ButtonContainer>
          <EditTrainingButton type="submit">
            <FontAwesomeIcon icon={faSave} /> Actualizar Capacitación
          </EditTrainingButton>
          <BackButton type="button" onClick={() => router.push('/table')}>
            <FontAwesomeIcon icon={faArrowLeft} /> Regresar
          </BackButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default EditTraining;