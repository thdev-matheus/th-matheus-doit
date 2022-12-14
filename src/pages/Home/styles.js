import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
`;

export const Content = styled.div`
  max-width: 400px;
  h1 {
    text-shadow: 0px 4px 4px rgba(0 0 0 0.25);
    font-size: 2.5rem;

    span {
      color: #c85311;
    }
  }

  span {
    margin-bottom: 2rem;
    font-size: 1.8rem;
    flex-wrap: wrap;
  }

  div {
    display: flex;
    flex: 1;
    margin-top: 1rem;

    button + button {
      margin-left: 1rem;
    }
  }
`;
