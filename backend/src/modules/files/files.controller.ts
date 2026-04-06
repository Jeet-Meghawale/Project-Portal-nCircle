import {Request, Response} from 'express';
import { sendResponse } from '../../utils/send.response';
import { filesService } from './files.services';
import { get } from 'node:http';


export const FilesController = {
    async uploadFile(req: Request, res: Response) {
        const file = req.file;
        const threadId = req.params.threadId as string; 
        const userId = req.userId as string;
        const data = {
            threadId,
            uploadedBy: userId
        };
        if (file===undefined || file===null) {
           sendResponse(res, 400, {}, "No file uploaded");  
           return;  
        };
        const result = await filesService.uploadFile(file, data );
        sendResponse(res, 200, result, "File uploaded successfully");
    },
    async deleteFile(req: Request, res: Response) {
        const fileId = req.params.fileId as string;
        const result = await filesService.deleteFile(fileId);
        if(!result) {
            sendResponse(res, 404, {}, "File not found");
            return;
        }
        sendResponse(res, 200, result, "File deleted successfully");
    },
    getFilesForThread(req: Request, res: Response) {
        const threadId = req.params.threadId as string;
        const result = filesService.getFilesForThread(threadId);
        sendResponse(res, 200, result, "Files retrieved successfully");
    }

};