import styled from '@emotion/styled';

export const EditFAQContainer = styled.div`
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

export const EditFAQCard = styled.div`
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

export const EditFAQTitle = styled.h1`
  font-size: 28px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const EditFAQInput = styled.input`
 background-color: #f1f1f1;
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

export const EditFAQTextArea = styled.textarea`
  background-color: #f1f1f1;
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

export const RoleContainer = styled.div`
  margin: 15px 0;

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

export const RoleLabel = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: 15px;
  font-size: 14px;

  input {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    margin-right: 10px;
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

export const EditFAQButton = styled.button`
  background-color: #ffc107;
  color: white;
  padding: 14px 24px;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #ff9800;
  }

  &:disabled {
    background-color: #ccc;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 20px;
  }
`;

export const BackButton = styled(EditFAQButton)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 20px;
  }
`;