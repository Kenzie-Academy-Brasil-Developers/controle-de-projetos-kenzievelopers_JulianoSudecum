import { iDeveloperResult } from './../interfaces/developer.interface';
import { NextFunction, Request, Response } from "express";
import { client } from '../database';
import {AppError} from '../error';

const projectVerifyId = async (req:Request, res: Response, next: NextFunction):Promise<void> => {
    const { id } = req.params

    const query: iDeveloperResult = await client.query(
        'SELECT * FROM "projects" WHERE "id" = $1',[id]
    )

    if(query.rowCount === 0){
        throw new AppError("Project not found", 404)
    }

    return next()
}

export default projectVerifyId