import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--white);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 250px;
  padding: 1rem;
  box-shadow: 0px 4px 4px rgba(0 0 0 0.3);
  border: 1px solid var(--black);
  color: var(--black);

  hr {
    width: 80%;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  button {
    margin-top: 80px;
    align-self: flex-end;
  }

  svg {
    font-size: 1.1rem;
    color: var(--orange);
    margin-right: 4px;
    transform: translateY(3px);
  }
`;
