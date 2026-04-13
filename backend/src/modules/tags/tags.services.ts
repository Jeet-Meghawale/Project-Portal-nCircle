import { tagsRepository } from "./tags.repositories";

export const tagsService = {
    createTag(name:string){
        return tagsRepository.createTag(name);
    },
    getAllTags(){
        return tagsRepository.getAllTags();
    },
    getTagByName(name:string){
        return tagsRepository.getTagByName(name);
    },
    deleteTag(name:string){
        return tagsRepository.deleteTag(name);
    }
}