import { iDeveloperResult } from './../interfaces/developer.interface';
import { NextFunction, Request, Response } from "express";
import { client } from '../database';
import AppError from '../error';

const verifyIdParam = async (req:Request, res: Response, next: NextFunction):Promise<void> => {
    const { id } = req.params

    const query: iDeveloperResult = await client.query(
        'SELECT * FROM "developers" WHERE "id" = $1',[id]
    )

    if(query.rowCount === 0){
        throw new AppError("Developer not found", 404)
    }

    return next()
}

export default verifyIdParam