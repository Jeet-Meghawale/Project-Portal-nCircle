import { reviewsRepository } from "./reviews.repository";
import { createReviewDTO, getReviewByFilterDTO, updateReviewDTO } from "./reviews.types";


export const reviewsServices = {
    createReview(dto: createReviewDTO) {
        const data = {
            title: dto.title,
            description: dto.description ?? null,
            progress: dto.progress ?? 0,
            workspace: {
                connect: { id: dto.workspaceId }
            }
        }
        return reviewsRepository.createReview(data);
    },
    getReviewById(id: string) {
        return reviewsRepository.getReviewById(id);
    },
    getReviewByFilter(filter: getReviewByFilterDTO) {
        const updatedFilter: any = {};

        if (filter.title !== undefined) {
            updatedFilter.title = filter.title;
        }

        if (filter.workspaceId !== undefined) {
            updatedFilter.workspaceId = filter.workspaceId;
        }

        if (filter.description !== undefined) {
            updatedFilter.description = filter.description;
        }

        if (filter.progress !== undefined) {
            updatedFilter.progress = filter.progress;
        }
        return reviewsRepository.getReviewByFilter(updatedFilter);
    },
    async updateReview(id: string, dto: updateReviewDTO) {
        const review = await reviewsRepository.getReviewById(id);
        if(review === null){
            return null
        } 
        const data : any ={};
        if (dto.title !== undefined) {
            data.title = dto.title;
        }

        if (dto.workspaceId !== undefined) {
            data.workspaceId = dto.workspaceId;
        }

        if (dto.description !== undefined) {
            data.description = dto.description;
        }

        if (dto.progress !== undefined) {
            data.progress = dto.progress;
        }
        return reviewsRepository.updateReview(id, data);
    }
}