import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../../projects/api/projectService";

export const useCreateProject = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:projectService.createProjects,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["projects"]})
        },
    })
}