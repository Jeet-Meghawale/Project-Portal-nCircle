import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.util";
import { ApiError } from "../utils/api.error";
import { prisma } from "../database/client";


export const authMiddleware=async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new ApiError(401 , "Authorization Header Missing");
    }
    const parts = authHeader.split(" ");
    if(parts.length!==2 || parts[0]!=="Bearer"){
        throw new ApiError(401 , "Invalid Authorization format");
    }
    const token  = parts[1]!;
    try{
        const decoded=verifyAccessToken(token ) as {userId:string};
        req.userId = decoded.userId;
        let user= await prisma.user.findUnique({
            where : {id:decoded.userId},
            select : { role : true} 
        })
        req.role=user!.role;
        next();
    }
    catch(err){
        throw new ApiError(401 , "Invalid or expired token");
    }
};
