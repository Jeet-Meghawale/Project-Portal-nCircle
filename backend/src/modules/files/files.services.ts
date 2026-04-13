import { connect } from 'node:http2';
import { s3, S3_bucket } from '../../config/aws.config';
import { FilesRepository } from './files.repository';

async function uploadFileToS3(file: Express.Multer.File) {

    const key = `${Date.now()}-${file.originalname}`;

    const params = {
        Bucket: S3_bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const result = await s3.upload(params).promise();
    return {
        url: result.Location,
        key: result.Key,
        type: file.mimetype,
        name: file.originalname
    };
};

async function deleteFromS3(key: string) {
  await s3.deleteObject({
    Bucket: S3_bucket,
    Key: key,
  }).promise();
}

export const filesService = {
    async uploadFile(file: Express.Multer.File, data: any) {
        const uploadResult = await uploadFileToS3(file);

        const dto = {
            name: uploadResult.name,
            path: uploadResult.url,
            type: uploadResult.type,
            thread: { connect: { id: data.threadId } },
            user: { connect: { id: data.uploadedBy } }
        };
        return FilesRepository.createFile(dto);
    },
    async deleteFile(fileId: string) {
        const file = await FilesRepository.getFileById(fileId);
        if (!file) {
            return ;
        };
        // delete from s3
        const key = file.path.split('/').slice(-1)[0] as string; // get the last part of the url which is the key
        await deleteFromS3(key);
        // delete from database
        return FilesRepository.deleteFile(fileId);
    },
    async getFilesForThread(threadId: string) {
        return FilesRepository.getFilesForThread(threadId);
    },

}