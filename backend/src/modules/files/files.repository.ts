import { get } from "node:http";
import { prisma } from "../../database/client";
import { Prisma } from "@prisma/client";

export const FilesRepository = {
    createFile(data: Prisma.FileCreateInput) {
        return prisma.file.create({
            data
        });
    },
    deleteFile(id: string) {
        return prisma.file.delete({
            where: {
                id
            }
        });
    },
    getFileById(id: string) {
        return prisma.file.findUnique({
            where: {
                id
            }
        });
    },
    getFilesForThread(threadId: string) {
        return prisma.file.findMany({
            where: {
                threadId
            }
        });
    },
};