import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100vw;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 5rem;

  background-color: var(--black);

  h2 {
    color: var(--white);
  }
`;

export const ButtonContainer = styled.div`
  width: 6rem;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin: 0;
  }
`;
