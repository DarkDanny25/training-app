import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  background-color: ${({ type }) => (type === 'success' ? '#28a745' : '#dc3545')};
  color: #fff;
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease-out;
  z-index: 9999;
`;

export const NotificationContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-size: 14px;
  }

  svg {
    font-size: 18px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #f8f9fa;
  }
`;