import styled from '@emotion/styled';

export const UserTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 90%;
  margin: 60px auto 0;

  @media (max-width: 768px) {
    padding: 15px;
    margin: 40px auto 0;
  }

  @media (max-width: 480px) {
    padding: 10px;
    margin: 20px auto 0;
  }
`;

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  border-radius: 8px;
  overflow: hidden;
  table-layout: fixed;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const UserTableHead = styled.thead`
  background-color: #292929;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const UserTableBody = styled.tbody`
  color: #2e2e2e;
`;

export const UserTableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: #f2f2f2;
  }
`;

export const UserTableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  word-wrap: break-word;
  text-align: ${({ align }) => (align === 'center' ? 'center' : 'left')};

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 10px 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding: 8px 10px;
  }
`;

export const UserActionButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  margin: 0 4px;
  font-size: 18px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  &.edit {
    color: #ffc107;
  }

  &.delete {
    color: #dc3545;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 4px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 4px 6px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  align-items: center;
  gap: 10px;
  color: #888;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding-right: 30px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1e1e1e;
    outline: none;
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 8px;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #999;
  cursor: pointer;
`;

export const UserManagementTitle = styled.h2`
  text-align: center;
  font-size: 35px;
  margin: 20px 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 28px;
    margin: 35px 0;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 10px 0;
 
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

export const PaginationButton = styled.button`
  background-color: ${({ active }) => (active ? '#292929' : '#f0f0f0')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 0 4px;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background-color: #ccc;
    color: #000;
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #bbb;
    cursor: not-allowed;
    border-color: #ddd;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 6px 12px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    padding: 4px 8px;
  }
`;