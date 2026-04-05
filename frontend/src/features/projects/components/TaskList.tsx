import {useTasks} from "../hooks/useTasks";

const TaskList = ({ projectId }: any) => {
  const { data: tasks, isLoading } = useTasks(projectId);

  if (isLoading) return <p className="text-white">Loading tasks...</p>;

  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-400">No tasks yet</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task: any) => (
        <div
          key={task.id}
          className="card flex justify-between items-center"
        >
          <div>
            <h3 className="font-medium">{task.title}</h3>
            <p className="text-gray-400 text-sm">
              {task.description}
            </p>
          </div>

          <span className="text-sm text-gray-400">
            {task.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;