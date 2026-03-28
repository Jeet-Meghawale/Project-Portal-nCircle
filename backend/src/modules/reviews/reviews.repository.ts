import { Prisma } from "@prisma/client";
import { prisma } from "../../database/client";

export const reviewsRepository ={
    createReview(data : Prisma.ReviewCreateInput){
        return prisma.review.create({
            data
        });
    },
    updateReview(id:string ,data : Prisma.ReviewUncheckedUpdateInput){
        return prisma.review.update({
            where : {id},
            data
        });
    },
    getReviewById(id:string){
        return prisma.review.findUnique({
            where : {id}
        });
    },
    getReviewByFilter(filter : Prisma.ReviewWhereInput){
        return prisma.review.findMany({
            where : filter
        });
    },
    
    
}