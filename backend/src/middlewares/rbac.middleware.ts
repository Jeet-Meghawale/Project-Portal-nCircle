import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/client";


export const authorize =
  (...allowedRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {

    const user = await prisma.user.findUnique({
      where: { id: req.userId! },
      select: { role: true }
    });

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }

    next();
  };