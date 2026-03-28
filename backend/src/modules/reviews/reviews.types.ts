import  {z} from "zod"
import { createReviewSchema, getReviewByFilterSchema, updateReviewSchema } from "../../validators/reviews.validator"

export type createReviewDTO = z.infer< typeof createReviewSchema>

export type getReviewByFilterDTO = z.infer<typeof getReviewByFilterSchema>

export type updateReviewDTO = z.infer< typeof updateReviewSchema>

