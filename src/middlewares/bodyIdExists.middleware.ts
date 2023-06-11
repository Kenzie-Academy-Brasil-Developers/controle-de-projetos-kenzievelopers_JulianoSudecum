import { iProjectResult } from './../interfaces/projects.interface';
import { iDeveloperResult } from './../interfaces/developer.interface';
import { NextFunction, Request, Response } from "express";
import { client } from '../database';
import AppError from '../error';

const bodyIdExists = async (req:Request, res: Response, next: NextFunction):Promise<void> => {
    const { developerId } = req.body

    const query: iProjectResult = await client.query(
        'SELECT * FROM "projects" WHERE "developerId" = $1',[developerId]
    )

    if(query.rowCount === 0){
        throw new AppError("Project not found", 404)
    }

    return next()
}

export default bodyIdExists