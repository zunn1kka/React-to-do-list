import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateTask } from "../http/TaskAPI";
import { useTranslation } from "react-i18next";
const EditTask = ({ show, onHide, task, onTaskUpdated }) => {
  const { t } = useTranslation();
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    dueDate: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setEditedTask({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setEditedTask((prev) => ({ ...prev, dueDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!editedTask.title.trim()) {
      setError("Название задачи обязательно");
      setLoading(false);
      return;
    }

    try {
      await updateTask(task.id, editedTask);

      onTaskUpdated();
      onHide();
    } catch (err) {
      console.error("Ошибка при обновлении задачи:", err);
      setError(err.response?.data?.message || "Ошибка при обновлении задачи");
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
        <Modal.Title>{t("form.taskEdit")}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}

          <Form.Group className="mb-3">
            <Form.Label>{t("form.taskTitle")}*</Form.Label>
            <Form.Control
              name="title"
              value={editedTask.title}
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
              value={editedTask.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="me-3">{t("tasks.due")}</Form.Label>
            <DatePicker
              selected={editedTask.dueDate}
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
            {loading ? "Сохранение..." : t("form.save")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditTask;
