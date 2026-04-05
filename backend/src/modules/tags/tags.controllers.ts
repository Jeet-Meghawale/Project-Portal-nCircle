import {Request, Response} from "express";
import { sendResponse } from "../../utils/send.response";
import { tagsService } from "./tags.services";


export const tagsController = {
    async createTag(req:Request, res:Response){
        const name = req.validated!.body.name;
        const result = await tagsService.createTag(name);
        sendResponse(res, 200, result, "Tag Created");
    },
    async getAllTags(req:Request, res:Response){
        const result = await tagsService.getAllTags();
        sendResponse(res, 200, result, "Tags Retrieved");
    },
    async getTagByName(req:Request, res:Response){
        const name = req.validated!.body.name;
        const result = await tagsService.getTagByName(name);
        sendResponse(res, 200, result, "Tag Retrieved");
    },
    async deleteTag(req:Request, res:Response){
        const name = req.validated!.body.name;
        const result = await tagsService.deleteTag(name);
        sendResponse(res, 200, result, "Tag Deleted");

    }
}

