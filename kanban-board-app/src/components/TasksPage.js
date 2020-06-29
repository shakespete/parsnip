import React, { useState } from "react";
import PropTypes from "prop-types";
import TaskList from "./TaskList";

const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];

const TasksPage = ({ tasks, createTask, editStatus }) => {
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setShowNewCardForm(false);
    setTitle("");
    setDescription("");
  };

  const onCreateTask = (e) => {
    e.preventDefault();
    createTask({
      title,
      description,
    });
    resetForm();
  };

  const toggleForm = () => {
    setShowNewCardForm((show) => !show);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const renderTaskLists = () => {
    return TASK_STATUSES.map((status) => {
      const statusTasks = tasks.filter((task) => task.status === status);
      return (
        <TaskList
          key={status}
          status={status}
          tasks={statusTasks}
          onStatusChange={editStatus}
        />
      );
    });
  };

  return (
    <div className="tasks">
      <div className="task-list-header">
        <button type="button" onClick={toggleForm}>
          + New task
        </button>
      </div>
      {showNewCardForm && (
        <form className="task-list-form" onSubmit={onCreateTask}>
          <input
            className="full-width-input"
            onChange={handleTitleChange}
            value={title}
            type="text"
            placeholder="title"
          />
          <input
            className="full-width-input"
            onChange={handleDescriptionChange}
            value={description}
            type="text"
            placeholder="description"
          />
          <button type="submit">Save</button>
        </form>
      )}
      <div className="task-lists">{renderTaskLists()}</div>
    </div>
  );
};

TasksPage.defaultProps = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: -1,
      title: "",
      description: "",
      status: "",
    })
  ),
  createTask: (f) => f,
  editStatus: (f) => f,
};
TasksPage.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
    })
  ),
  createTask: PropTypes.func,
  editStatus: PropTypes.func,
};

export default TasksPage;
