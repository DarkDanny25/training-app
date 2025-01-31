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
  font-size: 28px;
  margin: 0 0 5px;

  @media (max-width: 768px) {
    font-size: 26px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const Input = styled.input`
  padding: 12px 15px;
  padding-left: 40px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1e1e1e;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
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
  pointer-events: none;
  color: #888;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const TextRedirect = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
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
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
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

export const TipMessage = styled.p`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  background-color: #ffcc00;
  color: #292929;
  font-size: 14px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 10;
  animation: ${slideIn} 0.3s ease-out;
  transition: opacity 0.3s;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    bottom: -19px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: #ffcc00 transparent transparent transparent;
  }

  b {
    color: #d45f00;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 10px;
    width: 250px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px;
    width: 220px;
  }
`;