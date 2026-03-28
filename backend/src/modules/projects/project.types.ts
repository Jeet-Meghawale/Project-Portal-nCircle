export interface CreateProjectDTO {
  title: string;
  description: string;
  visibility: "LISTED" | "UNLISTED";
}

export interface UpdateProjectDTO {
  title?: string;
  description?: string;
  visibility?: "LISTED" | "UNLISTED";
  isActive?: boolean;
}