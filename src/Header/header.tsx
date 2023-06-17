import { useState } from 'react';
import styles from './header.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export function Header({ handleAddTask }: any) {
  const [title, setTitle] = useState('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddTask(title);
    setTitle('');
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <header className={styles.header}>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input
          placeholder="Add a new task"
          onChange={onChangeTitle}
          value={title}
          type="text"
        />
        <button>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
