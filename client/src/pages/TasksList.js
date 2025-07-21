import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { fetchTask, deleteTask, toggleTaskComplete } from "../http/TaskAPI";
import userStore from "../store/UserStore";
import {
  Container,
  Spinner,
  Button,
  Card,
  ListGroup,
  Badge,
  ButtonGroup,
  Stack,
} from "react-bootstrap";
import { PencilSquare, CheckCircle, Trash, Plus } from "react-bootstrap-icons";
import CreateTask from "../models/CreateTask";
import EditTask from "../models/EditTask";
import { useTranslation } from "react-i18next";

const TasksList = observer(() => {
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (userStore.isAuth) {
      loadTasks();
    }
  }, [userStore.isAuth]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTask();
      setTasks(data);
    } catch (e) {
      console.error("Ошибка загрузки задач", e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      await toggleTaskComplete(id);
      await loadTasks();
    } catch (e) {
      console.error("Ошибка изменения статуса задачи", e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (e) {
      console.error("Ошибка удаления задачи", e);
    }
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setEditVisible(true);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <Stack direction="horizontal" className="mb-4 justify-content-between">
        <h2 className="mb-0">{t("tasks.title")}</h2>
        <Button
          variant="primary"
          onClick={() => setCreateVisible(true)}
          className="d-flex align-items-center gap-2"
        >
          <Plus size={20} /> {t("tasks.create")}
        </Button>
      </Stack>

      {tasks.length === 0 ? (
        <Card className="text-center p-4">
          <Card.Body>
            <Card.Text>У вас пока нет задач. Создайте первую!</Card.Text>
            <Button variant="primary" onClick={() => setCreateVisible(true)}>
              Создать задачу
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {tasks.map((task) => (
            <ListGroup.Item
              key={task.id}
              className={`py-3 ${task.isComplete ? "bg-light" : ""}`}
            >
              <Stack
                direction="horizontal"
                gap={3}
                className="align-items-start"
              >
                <div className="flex-grow-1">
                  <Stack
                    direction="horizontal"
                    gap={2}
                    className="align-items-center mb-2"
                  >
                    <h5
                      className={`mb-0 ${
                        task.isComplete
                          ? "text-decoration-line-through text-muted"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h5>
                    {task.isComplete && (
                      <Badge bg="success" pill>
                        {t("tasks.complete")}
                      </Badge>
                    )}
                  </Stack>

                  {task.description && (
                    <p className="text-muted mb-2">{task.description}</p>
                  )}

                  {task.dueDate && (
                    <div className="d-flex align-items-center gap-1 text-muted">
                      <small>
                        <strong>{t("tasks.due")}</strong>{" "}
                        {new Date(task.dueDate).toLocaleDateString()}
                      </small>
                    </div>
                  )}
                </div>

                <ButtonGroup size="sm">
                  <Button
                    variant={
                      task.isComplete ? "outline-warning" : "outline-success"
                    }
                    onClick={() => handleToggleComplete(task.id)}
                    title={
                      task.isComplete
                        ? "Возобновить задачу"
                        : "Завершить задачу"
                    }
                  >
                    <CheckCircle size={18} />
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleEditClick(task)}
                    title="Редактировать"
                  >
                    <PencilSquare size={18} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(task.id)}
                    title="Удалить"
                  >
                    <Trash size={18} />
                  </Button>
                </ButtonGroup>
              </Stack>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <CreateTask
        show={createVisible}
        onHide={() => setCreateVisible(false)}
        onTaskCreated={loadTasks}
      />

      <EditTask
        show={editVisible}
        onHide={() => {
          setEditVisible(false);
          setCurrentTask(null);
        }}
        task={currentTask}
        onTaskUpdated={loadTasks}
      />
    </Container>
  );
});

export default TasksList;
