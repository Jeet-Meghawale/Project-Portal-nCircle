import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/rbac.middleware";
import { Role } from "@prisma/client";
import { validate } from "../../middlewares/zod.validator.middleware";
import { createReviewSchema, getReviewByFilterSchema, reviewIdParamSchemaa, updateReviewSchema } from "../../validators/reviews.validator";
import { asyncHandler } from "../../utils/async.handler";
import { reviewController } from "./reviews.controller";

const router = Router();

router.use(authMiddleware);
router.use(authorize(Role.ADMIN))


// create review
router.post(
    "/",
    validate({ body: createReviewSchema }),
    asyncHandler(reviewController.createReview)
);

// get review by filter
router.get(
    "/filter",
    validate({params : getReviewByFilterSchema}),
    asyncHandler(reviewController.getReviewByFilter)
)
// get  review by id
router.get(
    "/:reviewId",
    validate({params : reviewIdParamSchemaa}),
    asyncHandler(reviewController.getReviewById)
)
// update review
router.patch(
    "/:reviewId",
    validate({
        params : reviewIdParamSchemaa,
        body : updateReviewSchema
    }),
    asyncHandler(reviewController.updateReview)
)


export default router;