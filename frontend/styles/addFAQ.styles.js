import styled from '@emotion/styled';

export const AddFAQContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const AddFAQCard = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const AddFAQTitle = styled.h1`
  font-size: 28px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const AddFAQInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1e1e1e;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
`;

export const AddFAQTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  font-family: inherit;
  height: 150px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1e1e1e;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
    height: 120px;
  }
`;

export const RoleCheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 15px 0;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    transform: scale(1.2);
  }

  span {
    font-size: 16px;
    color: #333;
  }

  @media (max-width: 768px) {
    gap: 8px;
    span {
      font-size: 14px;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const AddFAQButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 14px 24px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
  }

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 20px;
  }
`;

export const BackButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 14px 24px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 20px;
  }
`;