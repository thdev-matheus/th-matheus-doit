import { Container } from "./styles";

export default function Button(
  { children, whiteSchema = false, ...rest },
  onClick
) {
  return (
    <Container whiteSchema={whiteSchema} type="button" {...rest}>
      {children}
    </Container>
  );
}
