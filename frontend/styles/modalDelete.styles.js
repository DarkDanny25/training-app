import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  50% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 95%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const ModalHeader = styled.h2`
  margin: 0;
  padding: 10px 0;
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const ModalBody = styled.div`
  text-align: center;
  margin: 10px 0;
  font-size: 1rem;
  color: #333;

  p {
    margin-top: 10px;
    font-size: 1rem;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

export const WarningIcon = styled.div`
  font-size: 60px;
  color: #f39c12;
  animation: ${shake} 1.5s infinite;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 45%;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: opacity 0.3s, background-color 0.3s;
  box-sizing: border-box;

  @media (max-width: 480px) {
    width: 100%;
    font-size: 0.9rem;
  }

  &.cancel {
    background-color: #e0e0e0;
    color: #333;
    &:hover {
      background-color: #d4d4d4;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 5px #999;
    }
  }

  &.confirm {
    background-color: #e74c3c;
    color: white;
    &:hover {
      background-color: #c0392b;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 5px #e74c3c;
    }
  }

  &:hover {
    opacity: 0.9;
  }

  &:focus {
    outline: none;
  }
`;