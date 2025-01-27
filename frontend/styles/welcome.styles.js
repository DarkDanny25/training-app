import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const WelcomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #292929;
  text-align: center;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

export const Header = styled.header`
  margin-bottom: 30px;

  h1 {
    font-size: 2.5rem;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }

  p {
    font-size: 1.2rem;
    margin: 10px 0 0;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

export const MainContent = styled.div`
  button {
    padding: 15px 30px;
    font-size: 1.1rem;
    background: #ff9800;
    color: #fff;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #e68a00;
    }

    @media (max-width: 768px) {
      padding: 12px 25px;
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
  }
`;

export const Popup = styled.div`
  position: fixed;
  top: 28%;
  left: 36%;
  transform: translate(-50%, -50%);
  background: #fff;
  color: #292929;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  z-index: 1000;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.5s ease-out;
  opacity: 0;
  animation-fill-mode: forwards;

  @media (max-width: 1024px) {
    top: 28%;
    left: 32%;
    transform: translate(-50%, -50%);
    width: 90%;
    padding: 20px;
  }

  @media (max-width: 768px) {
    top: 28%;
    left: 25%;
    transform: translate(-50%, -50%);
    width: 90%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    top: 28%;
    left: 3%;
    transform: translate(-50%, -50%);
    width: 95%;
    padding: 10px;
  }

  h2 {
    font-size: 1.8rem;
    margin-top: 15px;

    @media (max-width: 768px) {
      font-size: 1.6rem;
    }

    @media (max-width: 480px) {
      font-size: 1.4rem;
    }

    span {
      color: #0070f3;
      font-weight: bold;
    }
  }

  p {
    margin: 15px 0;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }

    strong {
      color: #ff9800;
    }
  }
`;

export const PopupHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    width: 80px;
  }
`;

export const PopupBody = styled.div``;

export const PopupFooter = styled.div`
  margin-top: 20px;

  @media (max-width: 480px) {
    margin-top: 15px;
  }
`;

export const CloseButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #218838;
  }

  @media (max-width: 768px) {
    padding: 8px 18px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 7px 15px;
    font-size: 0.9rem;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;