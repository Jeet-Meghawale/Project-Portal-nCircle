import { Request, Response } from "express";
import { reviewsServices } from "./reviews.services";
import { sendResponse } from "../../utils/send.response";

export const reviewController = {

    async createReview(req: Request, res: Response) {
        const dto = req.body;
        const result = await reviewsServices.createReview(dto);

        sendResponse(res, 200, result, "Review Created");
    },
    async getReviewById(req: Request, res: Response) {
        const reviewId = req.params.reviewId as string;

        const result = await reviewsServices.getReviewById(reviewId);
        if (result === null) {
            sendResponse(res, 404, result, "Review Not Found");
        }
        sendResponse(res, 200, result, "Review found");
    },
    async getReviewByFilter(req: Request, res: Response) {
        const filter = req.body;
        const result = await reviewsServices.getReviewByFilter(filter);

        sendResponse(res, 200, result);

    },
    async updateReview(req: Request, res: Response) {
        const id = req.params.reviewId as string;
        const dto = req.body
        const result = await reviewsServices.updateReview(id, dto);
        if (result === null) {
            sendResponse(res, 404, {}, "Review Not Found");
        }
        sendResponse(res, 200, result, "Review Updated");
    },
}