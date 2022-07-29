import Button from "../Button";
import { ButtonContainer, HeaderContainer } from "./styles";

export default function Header({ handleLogout }) {
  const name = JSON.parse(localStorage.getItem("@doIt:user")).name;

  return (
    <HeaderContainer>
      <h2>{name}</h2>
      <ButtonContainer>
        <Button whiteSchema onClick={() => handleLogout()}>
          Logout
        </Button>
      </ButtonContainer>
    </HeaderContainer>
  );
}
