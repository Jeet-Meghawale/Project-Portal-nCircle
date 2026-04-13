import de from "zod/v4/locales/de.js";
import { prisma } from "../../database/client"


export const tagsRepository = {
    createTag(name:string){
        return prisma.tags.create({
            data:{
                name
            }
        });
    },
    getAllTags(){
        return prisma.tags.findMany();
    },
    getTagByName(name:string){
        return prisma.tags.findUnique({
            where:{
                name
            }
        });
    },
    deleteTag(name:string){
        return prisma.tags.delete({
            where:{
                name
            }
        });
    }
}