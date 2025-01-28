import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  SectionTitle,
  ModuleContainer,
  ModuleTitle,
  MaterialContainer,
  MaterialTitle,
  MaterialDescription,
  Title,
  MaterialLink,
  MaterialRoles,
  SubmoduleTitle,
  SectionDivider,
  ContentContainer,
  ErrorBadge,
  InputSearch,
  IconWrapper,
} from '../frontend/styles/training.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

const CapacitationPage = () => {
  const [materials, setMaterials] = useState({});
  const [filteredMaterials, setFilteredMaterials] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [noMaterialsError, setNoMaterialsError] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token de autenticación no encontrado.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/training', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Object.keys(response.data).length === 0) {
          setNoMaterialsError(true);
        } else {
          setMaterials(response.data);
          setFilteredMaterials(response.data);
        }
      } catch (err) {
        console.error('Error al cargar los materiales de capacitación:', err);
      }
    };

    fetchMaterials();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = Object.keys(materials).reduce((acc, section) => {
      const filteredModules = Object.keys(materials[section]).reduce((modAcc, module) => {
        const filteredMaterialsForModule = materials[section][module].filter((material) => {
          return (
            material.title.toLowerCase().includes(query) ||
            material.description.toLowerCase().includes(query) ||
            (material.roles && material.roles.join(' ').toLowerCase().includes(query)) ||
            (material.submodule && material.submodule.toLowerCase().includes(query))
          );
        });

        if (filteredMaterialsForModule.length > 0) {
          modAcc[module] = filteredMaterialsForModule;
        }

        return modAcc;
      }, {});

      if (Object.keys(filteredModules).length > 0) {
        acc[section] = filteredModules;
      }

      return acc;
    }, {});

    setFilteredMaterials(filtered);
  };

  const renderMaterialLink = (material) => {
    const baseUrl = 'http://localhost:5000';
    return (
      <MaterialLink href={`${baseUrl}${material.fileUrl}`} target="_blank">
        {material.type === 'video' ? 'Ver Video' : 'Ver Documento'}
      </MaterialLink>
    );
  };

  return (
    <ContentContainer>
      <Title>Material de Capacitación</Title>
      
      <InputSearch value={searchQuery} onChange={handleSearch}>
        <input type="text" placeholder="Búsqueda de Materiales..." />
        <IconWrapper>
          <FontAwesomeIcon icon={faSearch} />
        </IconWrapper>
      </InputSearch>
      
      <SectionDivider />

      {noMaterialsError ? (
        <ErrorBadge>
          <FontAwesomeIcon icon={faExclamationCircle} style={{ fontSize: '15px' }} /> No hay materiales de capacitación disponibles.
        </ErrorBadge>
      ) : (
        Object.keys(filteredMaterials).map((section) => (
          <div key={section}>
            <SectionTitle>Sección: {section}</SectionTitle>
            {Object.keys(filteredMaterials[section]).map((module) => (
              <div key={module}>
                <ModuleContainer>
                  <ModuleTitle>Módulo: {module || 'Sin módulo'}</ModuleTitle>
                  {filteredMaterials[section][module].length > 0 ? (
                    filteredMaterials[section][module].map((material) => (
                      <MaterialContainer key={material._id}>
                        <MaterialTitle>Título: {material.title}</MaterialTitle>
                        <MaterialDescription>Descripción: {material.description}</MaterialDescription>
                        <MaterialRoles>Roles asignados: {material.roles?.join(', ') || 'No asignados'}</MaterialRoles>
                        {material.submodule ? (
                          <SubmoduleTitle>Submódulo: {material.submodule}</SubmoduleTitle>
                        ) : (
                          <p>Sin submódulo</p>
                        )}
                        <div>{renderMaterialLink(material)}</div>
                      </MaterialContainer>
                    ))
                  ) : (
                    <p>Este módulo no contiene materiales disponibles.</p>
                  )}
                </ModuleContainer>
                <SectionDivider />
              </div>
            ))}
          </div>
        ))
      )}
    </ContentContainer>
  );
};

export default CapacitationPage;