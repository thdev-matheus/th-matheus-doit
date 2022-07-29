import { Content, AnimationContainer, Background, Container } from "./styles";
import Button from "../../components/Button";
import { Link, Redirect, useHistory } from "react-router-dom";
import Input from "../../components/Input";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export default function Login({ authenticated, setAuthenticated }) {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido!").required("Campo obrigatório!"),
    password: yup.string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const registerFunction = (data) => {
    api
      .post("/user/login", data)
      .then((res) => {
        toast.success("Usuário logado com sucesso!");

        const { token, user } = res.data;
        localStorage.setItem("@doIt:token", JSON.stringify(token));
        localStorage.setItem("@doIt:user", JSON.stringify(user));

        reset();

        setAuthenticated(true);

        history.push("/dashboard");
      })
      .catch((_) => {
        toast.error("E-mail ou senha inválido, tente novamente!");
      });
  };

  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(registerFunction)}>
            <h1>Login</h1>

            <Input
              register={register}
              icon={FiMail}
              label="Email"
              placeholder="Seu email"
              name="email"
              error={errors.email?.message}
            />
            <Input
              register={register}
              icon={FiLock}
              label="Senha"
              placeholder="Sua senha ultra secreta"
              type="password"
              name="password"
              error={errors.password?.message}
            />

            <Button type="submit">Enviar</Button>
            <p>
              Não tem conta? <Link to="/signup">Faça seu cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}
