import React from 'react';
import { ModalOverlay, ModalContainer, ModalHeader, ModalBody, ModalFooter, Button, WarningIcon } from '../styles/modalDelete.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>Confirmar Eliminación</ModalHeader>
        <ModalBody>
          <WarningIcon>
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </WarningIcon>
          <p>¿Estás seguro de querer eliminar los datos? Esta acción es irreversible.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} className="cancel">
            <FontAwesomeIcon icon={faTimes} style={{ fontSize: '15px' }} /> Cancelar
          </Button>
          <Button onClick={onDelete} className="confirm">
            <FontAwesomeIcon icon={faTrash} style={{ fontSize: '15px' }} /> Eliminar
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DeleteConfirmationModal;