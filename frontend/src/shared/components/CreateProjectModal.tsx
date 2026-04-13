import { useState } from "react";
import { useCreateProject } from "../../features/workspace/hooks/useCreateProject";

const CreateProjectModal = ({ onClose }: any) => {
  const { mutate, isPending } = useCreateProject();

  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
  });

  const handleSubmit = () => {
    mutate(form, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="card w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Create Project</h2>

        <input
          placeholder="Title"
          className="w-full mb-3 p-2 bg-gray-800 rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Company"
          className="w-full mb-3 p-2 bg-gray-800 rounded"
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full mb-3 p-2 bg-gray-800 rounded"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSubmit}
            className="btn-primary"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;