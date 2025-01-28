import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const Input = styled.input`
  background-color: #f1f1f1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1e1e1e;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

export const Textarea = styled.textarea`
  background-color: #f1f1f1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1e1e1e;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
    min-height: 80px;
  }
`;

export const Select = styled.select`
  background-color: #f1f1f1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1e1e1e;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

export const FileInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
  }

  input[type='file'] {
    display: none;
  }

  img, video, embed {
    max-width: 100%;
    max-height: 300px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 10px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    label {
      font-size: 14px;
      padding: 8px 16px;
    }
  }
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  color: #555;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const EditTrainingButton = styled.button`
  padding: 14px 24px;
  background-color: #ffc107;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff9800;
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 20px;
  }
`;

export const BackButton = styled.button`
  padding: 14px 24px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #5a6268;
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px 20px;
  }
`;