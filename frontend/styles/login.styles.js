import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 50px 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    padding: 40px 20px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  padding-left: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1e1e1e;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

export const IconWrapper = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #888;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const TextRedirect = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 15px;
  color: #555;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      color: #6a4caf;
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 53%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #888;

  &:hover {
    color: #555;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const Notification = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  border-radius: 8px;
  width: 90%;
  max-width: 300px;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => (props.type === 'error' ? '#dc3545' : '#28a745')};
  color: white;
  animation: ${slideIn} 0.3s ease-out;
  font-size: 16px;

  svg {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;