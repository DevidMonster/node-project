import { Request, Response, NextFunction } from "express";

export const errorHandler = (error: any, req: Request, res:Response, next: NextFunction) => {
    return res.status(400).json({
        error: error.message
    })
}