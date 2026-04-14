import { Eye, Paperclip, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  company?: string;
  description: string;
  tags?: string[];
  status: string;
  onClick?: () => void;
  onViewDetails?: () => void; // ✅ NEW (IMPORTANT)
  actions?: React.ReactNode; // ✅ NEW (IMPORTANT)
}

const ProjectCard = ({
  id,
  title,
  company,
  description,
  tags,
  status,
  onClick,
  onViewDetails,
  actions,
}: Props) => {
  const navigate = useNavigate();

  const safeTags = Array.isArray(tags) ? tags : [];

  // temp static
  const attachments = 2;
  const groups = "1/3";
  
  return (
    <div
      onClick={onClick}
      className="card card-hover cursor-pointer relative group"
    >
      {/* Top */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{title}</h3>

        <span className="bg-green-600 text-black text-xs px-2.5 py-1 rounded-md">
          {status}
        </span>
      </div>

      {/* Company */}
      <p className="text-sm text-gray-400 mt-1">{company}</p>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-4 line-clamp-2">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-5">
        {safeTags.slice(0, 4).map((tag: string) => (
          <span
            key={tag}
            className="text-xs border border-gray-700 px-2 py-1 rounded-md text-gray-300"
          >
            {tag}
          </span>
        ))}

        {safeTags.length > 4 && (
          <span className="text-xs border border-gray-700 px-2 py-1 rounded-md text-gray-300">
            +{safeTags.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 text-gray-400 text-xs mt-5">
        <div className="flex items-center gap-1">
          <Paperclip size={14} />
          {attachments} attachments
        </div>

        <div className="flex items-center gap-1">
          <Users size={14} />
          {groups} groups
        </div>
      </div>

      {/* 🔥 DEFAULT ADMIN ACTION (fallback) */}
      {/* 🔥 DEFAULT ACTION (dynamic) */}
      {!actions && (
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();

              if (onViewDetails) {
                onViewDetails(); // ✅ use passed navigation
              } else {
                navigate(`/admin/projects/${id}`); // fallback
              }
            }}
            className="w-full flex items-center justify-center gap-2 border border-gray-700 py-2 rounded-lg text-white hover:bg-[#1E293B]"
          >
            <Eye size={16} />
            View Details
          </button>
        </div>
      )}

      {/* 🔥 CUSTOM ACTIONS (Student / future roles) */}
      {actions && (
        <div className="mt-5">
          {actions}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;