import styles from './alltasks.module.css';
import { Task } from '../Task/task';

interface AllTasksProps {
  tasks: any;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

export function AllTasks({ tasks, onDelete, onComplete }: AllTasksProps) {
  const noOfTasks = tasks.length;
  const completedTasks = tasks.filter((task: any) => task.isCompleted).length;
  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Created tasks</p>
          <span>{noOfTasks}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed tasks</p>
          <span>
            {completedTasks} of {noOfTasks}
          </span>
        </div>
      </header>

      <div className={styles.list}>
        {tasks.map((task: any) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        ))}
      </div>
    </section>
  );
}
