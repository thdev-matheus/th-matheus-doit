import { Redirect, useHistory } from "react-router-dom";
import { Container, InputContainer, TasksContainer } from "./styles";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import Header from "../../components/Header";

export default function Dashboard({ authenticated, setAuthenticated }) {
  const [tasks, setTasks] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem("@doIt:token")) || ""
  );
  const { register, handleSubmit, reset } = useForm();
  const history = useHistory();

  function loadTasks() {
    api
      .get("/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: false,
        },
      })
      .then((res) => {
        const apiTasks = res.data.data.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));

        setTasks(apiTasks);
      })
      .catch((_) => toast.err("Algo deu errado por aqui"));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const onSubmitTask = ({ task }) => {
    if (!task) {
      return toast.error("Complete o campo para enviar uma tarefa!");
    }

    api
      .post(
        "/task",
        {
          description: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((_) => {
        loadTasks();
        reset();
      });
  };

  const handleCompleted = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);

    api
      .put(
        `/task/${id}`,
        { completed: true },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => setTasks(newTasks));
  };

  const handleLogout = () => {
    api
      .post(
        "/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((_) => {
        setAuthenticated(false);

        localStorage.removeItem("@doIt:token");
        localStorage.removeItem("@doIt:user");

        toast.success("Até breve!");

        history.push("/");
      })
      .catch((err) => toast.error("Algo deu errado por aqui"));
  };

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header handleLogout={handleLogout} />
      <Container>
        <InputContainer onSubmit={handleSubmit(onSubmitTask)}>
          <time>15 de junho de 2022</time>
          <section>
            <Input
              icon={FiEdit2}
              placeholder="Nova tarefa"
              register={register}
              name="task"
            />
            <Button type="submit">Adicionar</Button>
          </section>
        </InputContainer>
        <TasksContainer>
          {tasks?.map((task) => (
            <Card
              key={task._id}
              title={task.description}
              date={task.createdAt}
              onClick={() => {
                handleCompleted(task._id);
              }}
            />
          ))}
        </TasksContainer>
      </Container>
    </>
  );
}
