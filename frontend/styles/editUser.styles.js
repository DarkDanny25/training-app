import styled from '@emotion/styled';

export const EditUserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7fa;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const EditUserCard = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    padding: 20px;
    max-width: 100%;
  }
`;

export const EditUserTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const EditUserInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f1f1f1;
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

export const EditUserButton = styled.button`
  background-color: #ffc107;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff9800;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 18px;
  }
`;

export const BackButton = styled.button`
  background-color: #6c757d;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #495057;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 18px;
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