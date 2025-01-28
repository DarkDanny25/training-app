import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  margin-top: 60px;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 15px;
  }

  @media (max-width: 425px) {
    margin-top: 30px auto;
    padding: 10px;
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
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 12px;
    width: 100%;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: 100%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
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
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
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

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const AddButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background-color: #218838;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 5px 10px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  text-align: left;
  border-radius: 8px;
  overflow: hidden;
  table-layout: auto;

  @media (max-width: 1024px) {
    font-size: 14px;
    width: 90%;
    display: block;
    overflow-x: auto;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
    display: block;
    overflow-x: auto;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const TableHead = styled.thead`
  background-color: #292929;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const TableBody = styled.tbody`
  color: #2e2e2e;
`;

export const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;

  &:last-child {
    text-align: center;
  }

  &.center {
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 10px;
  }
`;

export const FileLink = styled.a`
  color: #1a73e8;
  text-decoration: none;
  font-weight: normal;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #6a4caf;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 35px;
  margin: 20px 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 28px;
    margin: 15px 0;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin: 10px 0;
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
  background-color: ${props => (props.active ? '#292929' : '#f0f0f0')};
  color: ${props => (props.active ? '#fff' : '#333')};
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
    padding: 5px 10px;
  }
`;

export const ActionButton = styled.button`
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
    padding: 3px;
  }
`;

export const FAQButton = styled.button`
  background-color: #f1c40f;
  color: white;
  padding: 8px 16px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #f39c12;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
    margin: 8px auto;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 5px 10px;
    margin: 12px auto;
  }
`;