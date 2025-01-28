import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  max-width: 90%;
  margin: 50px auto;
  padding: 20px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;

  @media (max-width: 768px) {
    max-width: 95%;
    padding: 15px;
  }

  @media (max-width: 425px) {
    max-width: 100%;
    padding: 10px;
  }
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  @media (max-width: 425px) {
    font-size: 1.6rem;
    margin-bottom: 15px;
  }
`;

export const InputSearch = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;

  input {
    width: 100%;
    padding: 10px 40px 10px 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-family: inherit;
    transition: border-color 0.3s;

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 10px 35px 10px 10px;
    }

    @media (max-width: 425px) {
      font-size: 12px;
      padding: 8px 30px 8px 10px;
    }
  }

  &:focus-within input {
    border-color: #1e1e1e;
    outline: none;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #888;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 425px) {
    font-size: 16px;
  }
`;

export const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 425px) {
    gap: 10px;
  }
`;

export const FAQItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }

  @media (max-width: 425px) {
    margin-bottom: 10px;
  }
`;

export const Question = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }

  @media (max-width: 425px) {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
`;

export const Answer = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (max-width: 425px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

export const Divider = styled.hr`
  height: 1px;
  border: none;
  border-top: 1px solid #292929;
  margin: 20px 0;
  width: 100%;
  box-sizing: border-box;
  opacity: 0.6;

  @media (max-width: 768px) {
    margin: 15px 0;
  }

  @media (max-width: 425px) {
    margin: 10px 0;
  }
`;

export const ErrorBadge = styled.div`
  background-color: #ff4d4f;
  color: white;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }

  @media (max-width: 425px) {
    font-size: 13px;
    padding: 6px;
  }
`;