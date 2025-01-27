import styled from '@emotion/styled';

export const NavbarContainer = styled.div`
  background-color: #292929;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: white;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  @media (max-width: 768px) {
    display: ${({ isMobileOpen }) => (isMobileOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: #292929;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
`;

export const NavButton = styled.button`
  background: none;
  color: ${({ active }) => (active ? '#fff' : '#888')};
  border: none;
  margin-right: 20px;
  font-size: 16px;
  cursor: pointer;
  padding: 5px 10px;
  position: relative;
  transition: background-color 0.3s;

  &:hover {
    color: #fff;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ active }) => (active ? '#fff' : 'transparent')};
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    font-size: 14px;
  }
`;

export const HamburgerMenu = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const UserButton = styled.button`
  background: none;
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: 15px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 45px;
  right: 20px;
  background-color: #464646;
  color: #f2f4f0;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  padding: 10px;
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    color: #0084ff;
  }

  svg {
    margin-right: 10px;
  }
`;

export const GoodbyeMessage = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50;
  color: white;
  padding: 15px 25px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  z-index: 1000;
  animation: slideIn 0.5s ease-out, fadeOut 1s 2s forwards;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 20px;
    width: 80%;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 15px;
    width: 90%;
  }

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(-30px);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #888;
  margin: 10px 0;
`;