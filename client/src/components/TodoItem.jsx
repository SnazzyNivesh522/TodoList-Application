import { MdDelete } from "react-icons/md";
import { useState } from "react";

function TodoItem({ todoId, todoName, todoDate, onDeleteClick, onUpdateClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(todoName);
  const [newDate, setNewDate] = useState(todoDate);

  const handleUpdate = () => {
    onUpdateClick(todoId, { text: newName, dueDate: newDate }); // Pass the todoId for update
    setIsEditing(false); // Disable editing mode after saving
  };

  return (
    <div className="container">
      <div className="row my-row">
        {isEditing ? (
          <>
            <div className="col-6">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="col-4">
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="col-6">{todoName}</div>
            <div className="col-4">{todoDate}</div>
          </>
        )}

        <div className="col-2">
          {isEditing ? (
            <button
              type="button"
              className="btn btn-success my-button"
              onClick={handleUpdate}
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary my-button"
              onClick={() => setIsEditing(true)}
            >
              Update
            </button>
          )}
          <button
            type="button"
            className="btn btn-danger my-button"
            onClick={() => onDeleteClick(todoId)} // Use todoId for delete
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
