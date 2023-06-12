import { iDeveloperResult } from './../interfaces/developer.interface';
import { NextFunction, Request, Response } from "express";
import { client } from '../database';
import AppError from '../error';

const developerInfosAlreadyExists = async (req:Request, res: Response, next: NextFunction):Promise<void> => {
    const { id } = req.params

    const query: iDeveloperResult = await client.query(
        'SELECT * FROM "developerInfos" WHERE "developerId" = $1',[id]
    )

    if(query.rowCount !== 0){
        throw new AppError("Developer infos already exists.", 409)
    }

    return next()
}

export default developerInfosAlreadyExists