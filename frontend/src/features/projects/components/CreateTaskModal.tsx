import { useState } from "react";
import { useCreateTask } from "../hooks/useCreateTask";

const CreateTaskModal = ({ projectId, onClose }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, isPending } = useCreateTask();

  const handleSubmit = () => {
    if (!title || !description) return;

    mutate(
      {
        projectId,
        title,
        description,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#0B0F19] p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Create Task</h2>

        <input
          className="w-full mb-3 p-2 bg-black border border-gray-700 rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-4 p-2 bg-black border border-gray-700 rounded"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 border border-gray-600 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;