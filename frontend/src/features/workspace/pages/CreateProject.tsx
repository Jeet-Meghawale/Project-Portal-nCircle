import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "../hooks/useCreateProject";

// 🔥 Match backend schema
const schema = z.object({
    title: z.string().min(3, "Title required"),
    description: z.string().min(10, "Description too short"),
    visibility: z.union([
        z.literal("LISTED"),
        z.literal("UNLISTED"),
    ]),
});

type FormData = z.infer<typeof schema>;

const CreateProjectPage = () => {
    const navigate = useNavigate();
    const { mutate, isPending } = useCreateProject();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            visibility: "LISTED",
        },
    });

    const onSubmit = (data: FormData) => {
        console.log("FORM DATA:", data);
        mutate(data, {
            onSuccess: () => {
                navigate("/admin/dashboard");
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            {/* Back */}
            <button
                onClick={() => navigate(-1)}
                className="text-gray-400 mb-4"
            >
                ← Back to Dashboard
            </button>

            {/* Title */}
            <h1 className="text-2xl font-semibold">
                Create Problem Statement
            </h1>
            <p className="text-gray-400 mb-6">
                Define a new industry project for students to work on
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5">

                {/* Title */}
                <div>
                    <label className="text-sm text-gray-400">Project Title</label>
                    <input
                        {...register("title")}
                        className="w-full mt-1 p-3 bg-[#0B0F19] border border-gray-800 rounded-lg"
                        placeholder="Enter project title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="text-sm text-gray-400">
                        Problem Description
                    </label>
                    <textarea
                        {...register("description")}
                        className="w-full mt-1 p-3 bg-[#0B0F19] border border-gray-800 rounded-lg"
                        rows={4}
                        placeholder="Describe the problem..."
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Visibility */}
                <div>
                    <label className="text-sm text-gray-400">
                        Visibility
                    </label>
                    <select
                        {...register("visibility")}
                        className="w-full mt-1 p-3 bg-[#0B0F19] border border-gray-800 rounded-lg"
                    >
                        <option value="LISTED">Listed</option>
                        <option value="UNLISTED">Unlisted</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 border border-gray-700 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isPending}
                    >
                        {isPending ? "Creating..." : "Create Problem Statement"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProjectPage;