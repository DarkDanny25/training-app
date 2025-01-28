import styled from '@emotion/styled';

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 90%;
  margin: 50px auto;
  padding: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 95%;
    padding: 4vw;
  }

  @media (max-width: 480px) {
    padding: 5vw;
  }
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  word-wrap: break-word;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 5vw;
  }

  @media (max-width: 480px) {
    font-size: 6vw;
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

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #292929;
  margin-bottom: 16px;
  word-wrap: break-word;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 5vw;
  }

  @media (max-width: 480px) {
    font-size: 6vw;
  }
`;

export const SectionDivider = styled.div`
  border-bottom: 1.5px solid #292929;
  margin-top: 30px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-top: 5vw;
    margin-bottom: 3vw;
  }

  @media (max-width: 480px) {
    margin-top: 6vw;
    margin-bottom: 4vw;
  }
`;

export const ModuleContainer = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #f8f8f8;
  border-radius: 6px;
  background-color: #c9c9c9;
  word-wrap: break-word;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3vw;
  }

  @media (max-width: 480px) {
    padding: 4vw;
  }
`;

export const ModuleTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #292929;
  margin-bottom: 12px;
  word-wrap: break-word;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 4vw;
  }

  @media (max-width: 480px) {
    font-size: 5vw;
  }
`;

export const SubmoduleTitle = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: #1e1e1e;
  margin-bottom: 8px;
  word-wrap: break-word;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 4vw;
  }

  @media (max-width: 480px) {
    font-size: 5vw;
  }
`;

export const MaterialContainer = styled.div`
  padding: 12px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  background-color: #fefefe;
  margin-bottom: 16px;
  word-wrap: break-word;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3vw;
  }

  @media (max-width: 480px) {
    padding: 4vw;
  }
`;

export const MaterialTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: #555;
  margin-top: 6px;
  margin-bottom: 6px;
  word-wrap: break-word;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 4vw;
  }

  @media (max-width: 480px) {
    font-size: 5vw;
  }
`;

export const MaterialDescription = styled.p`
  font-size: 14px;
  color: #777;
  margin-top: 6px;
  margin-bottom: 6px;
  word-wrap: break-word;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 3vw;
  }

  @media (max-width: 480px) {
    font-size: 4vw;
  }
`;

export const MaterialRoles = styled.p`
  font-size: 14px;
  color: #888;
  margin-top: 20px;
  margin-bottom: -5px;
  font-style: italic;
  word-wrap: break-word;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 3vw;
  }

  @media (max-width: 480px) {
    font-size: 4vw;
  }
`;

export const MaterialLink = styled.a`
  display: inline-block;
  font-size: 14px;
  color: #0070f3;
  text-decoration: none;
  margin-right: 8px;
  word-wrap: break-word;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 3vw;
  }

  @media (max-width: 480px) {
    font-size: 4vw;
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
  word-wrap: break-word;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 6px;
  }
`;