import { iDeveloperResult } from './../interfaces/developer.interface';
import { NextFunction, Request, Response } from "express";
import { client } from '../database';
import {AppError} from '../error';

const emailAlreadyExists = async(req:Request, res:Response, next:NextFunction):Promise<void> => {
    const { email } = req.body
    if(!email){
        return next()
    }


    const query:iDeveloperResult = await client.query(
        'SELECT * FROM "developers" WHERE "email" = $1',
        [email]
    )

    if(query.rowCount !== 0) throw new AppError("Email already exists", 409)

    return next()
}

export default emailAlreadyExists 