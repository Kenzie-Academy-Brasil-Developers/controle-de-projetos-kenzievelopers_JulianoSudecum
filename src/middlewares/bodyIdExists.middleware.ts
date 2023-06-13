import { iProjectResult } from './../interfaces/projects.interface';
import { NextFunction, Request, Response } from "express";
import { client } from '../database';
import { AppError } from '../error';

const bodyIdExists = async (req:Request, res: Response, next: NextFunction):Promise<void> => {
    const { developerId } = req.body


    const query: iProjectResult = await client.query(
        'SELECT * FROM "developers" WHERE "id" = $1',[developerId]
    )

    if(query.rowCount === 0){
        throw new AppError("Developer not found.", 404)
    }

    return next()
}

export default bodyIdExists