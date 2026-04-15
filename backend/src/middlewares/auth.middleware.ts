import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.util";
import { prisma } from "../database/client";
import { sendResponse } from "../utils/send.response";


export const authMiddleware=async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        sendResponse(res, 401,null, "Authorization Header Missing");
        return;
    }
    const parts = authHeader.split(" ");
    if(parts.length!==2 || parts[0]!=="Bearer"){
        sendResponse(res, 401,null, "Invalid Authorization format");
        return;
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
        sendResponse(res, 401,null, "Invalid or expired token");
    }
};