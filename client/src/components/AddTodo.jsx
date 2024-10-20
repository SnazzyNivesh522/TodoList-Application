import { useRef, useState } from "react";
import { MdAddTask } from "react-icons/md";


function AddTodo({ onNewItem }) {
  const [itemName, setItemName] = useState("");
  const [itemDueDate, setItemDueDate] = useState("");

  const noOfUpdates=useRef(0);

  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };
  const handleDateChange = (event) => {
    setItemDueDate(event.target.value);
  };

  const handleButtonClick = () => {
    onNewItem(itemName, itemDueDate);
    setItemName("");
    setItemDueDate("");
  };

  return (
    <div className="container text-center">
      <form className="row my-row" onSubmit={handleButtonClick}>
        <div className="col-6">
          <input type="text" value={itemName} placeholder="Enter Todo Here" onChange={handleNameChange} />
        </div>
        <div className="col-4">
          <input type="date" value={itemDueDate} onChange={handleDateChange} />
        </div>
        <div className="col-2">
          <button type="button" className="btn btn-success my-button" onClick={handleButtonClick}>
            <MdAddTask />
          </button>
        </div>
      </form>

    </div>
  );
}

export default AddTodo; 