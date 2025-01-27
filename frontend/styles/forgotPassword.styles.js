import styled from '@emotion/styled';

export const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 50px 30px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  @media (max-width: 768px) {
    padding: 40px 20px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
  }
`;

export const Title = styled.h2`
  text-align: center;
  color: #292929;
  margin-bottom: 20px;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const InputWrapper = styled.div`
  margin-bottom: 15px;
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 15px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1e1e1e;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 10px 12px 10px 35px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 8px 10px 8px 30px;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;

  @media (max-width: 480px) {
    left: 10px;
  }
`;

export const ButtonGenerateToken = styled.button`
  width: 50%;
  padding: 10px;
  font-size: 1rem;
  background: #0070f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    background: #005bb5;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 7px;
    font-size: 0.9rem;
  }
`;

export const ButtonReset = styled(ButtonGenerateToken)`
  background: #28a745;

  &:hover {
    background: #218838;
  }
`;

export const ButtonCancel = styled(ButtonGenerateToken)`
  background: #777;

  &:hover {
    background: #555;
  }
`;

export const Notification = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 15px;
  color: ${(props) => (props.type === 'error' ? '#ff0000' : '#00a800')};
  background: ${(props) => (props.type === 'error' ? '#ffdddd' : '#ddffee')};
  border: 1px solid ${(props) => (props.type === 'error' ? '#ff0000' : '#00a800')};
  border-radius: 5px;
  text-align: center;
  animation: fadeOut 3s forwards;
  z-index: 1000;
  font-size: 0.9rem;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 350px;
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 15px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
`;

export const ModalBody = styled.div`
  margin: auto;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  gap: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const LinkButton = styled.button`
  margin-top: 15px;
  font-size: 14px;
  background: none;
  color: #0070f3;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #6a4caf;
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const IconWrapperRight = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #292929;
  }

  @media (max-width: 480px) {
    right: 10px;
  }
`;