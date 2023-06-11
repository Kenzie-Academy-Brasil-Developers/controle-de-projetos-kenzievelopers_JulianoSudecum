import { iDeveloperInfosResult } from './../interfaces/developer.interface';
import { NextFunction, Request, Response } from "express";
import { client } from '../database';
import AppError from '../error';

const infosAlreadyExists = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    const developerId = req.params.id
    if(!developerId){
        return next()
    }

    const query:iDeveloperInfosResult = await client.query(
        'SELECT * FROM "developerInfos" WHERE "id" = $1',[developerId]
    )

    if(query.rowCount !== 0) throw new AppError("Developer infos already exists.", 409)

    return next()
}

export default infosAlreadyExists