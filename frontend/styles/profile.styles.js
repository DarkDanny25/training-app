import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
  max-width: 900px;
  margin: 50px auto 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 20px;
    font-size: 28px;
    text-align: center;
  }

  @media (max-width: 768px) {
    max-width: 95%;
    padding: 5vw;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 8vw;

    h1 {
      font-size: 6vw;
    }
  }
`;

export const FormContainer = styled.form`
  width: 150%;

  @media (max-width: 1024px) {
    width: 110%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 45%;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 3vw;
  }

  @media (max-width: 480px) {
    margin-bottom: 4vw;
  }
`;

export const Icon = styled.div`
  position: absolute;
  left: 10px;
  color: #666;
  font-size: 18px;
`;

export const ToggleIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 53%;
  transform: translateY(-50%);
  color: #888;
  font-size: 18px;
  cursor: pointer;
  border: none;
  background-color: transparent;

  &:hover {
    color: #555;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 10px 10px 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1e1e1e;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 2.5vw;
    padding: 8px 10px 8px 35px;
  }

  @media (max-width: 480px) {
    font-size: 4vw;
    padding: 7px 8px 7px 32px;
  }
`;

export const Description = styled.span`
  width: 50%;
  font-size: 14px;
  color: #666;
  text-align: right;
  line-height: 1.5;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 18px;
    text-align: left;
    margin-top: 2vw;
  }

  @media (max-width: 480px) {
    font-size: 5vw;
    margin-top: 3vw;
  }
`;

export const Line = styled.hr`
  height: 1px;
  background-color: #ddd;
  margin: 35px 0;

  @media (max-width: 768px) {
    margin: 6vw 0;
  }

  @media (max-width: 480px) {
    margin: 7vw 0;
  }
`;

export const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &.update {
    background-color: #fdd835;
    color: #fff;

    &:hover {
      background-color: #fbc02d;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  &.delete {
    background-color: #e53935;
    color: #fff;

    &:hover {
      background-color: #c62828;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  @media (max-width: 768px) {
    font-size: 4vw;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    font-size: 5vw;
    padding: 7px 14px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4vw;
  }

  @media (max-width: 480px) {
    gap: 6vw;
  }
`;