import TodoItem from "./TodoItem";
import styles from "./TodoItems.module.css";

const TodoItems = ({ todoItems, onDeleteClick, onUpdateClick }) => {
  return (
    <div className={styles.itemsContainer}>
      {todoItems.map((item) => (
        <TodoItem
          key={item.todoId}  // Ensure each TodoItem has a unique key
          todoId={item.todoId} // Pass the todoId correctly
          todoName={item.todoName}
          todoDate={item.todoDate}
          onDeleteClick={onDeleteClick}
          onUpdateClick={onUpdateClick}
        />
      ))}
    </div>
  );
};

export default TodoItems;
