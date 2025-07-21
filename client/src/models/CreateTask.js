import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createTask } from "../http/TaskAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";

const CreateTask = ({ show, onHide, onTaskCreated }) => {
  const { t } = useTranslation();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setNewTask((prev) => ({ ...prev, dueDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!newTask.title.trim()) {
      setError("Название задачи обязательно");
      setLoading(false);
      return;
    }

    try {
      await createTask({
        ...newTask,
        dueDate: newTask.dueDate?.toISOString(),
      });
      setNewTask({
        title: "",
        description: "",
        dueDate: null,
      });
      onHide();
      if (onTaskCreated) {
        await onTaskCreated();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка при создании задачи");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("form.taskCreate")}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form.Group className="mb-3">
            <Form.Label>{t("form.taskTitle")}*</Form.Label>
            <Form.Control
              name="title"
              value={newTask.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t("form.description")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={newTask.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="me-3">{t("tasks.due")}</Form.Label>
            <DatePicker
              selected={newTask.dueDate}
              onChange={handleDateChange}
              minDate={new Date()}
              dateFormat="dd.MM.yyyy"
              className="form-control"
              isClearable
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>
            {t("form.cancel")}
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Создание..." : t("form.create")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateTask;
