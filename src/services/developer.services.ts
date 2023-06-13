import { iDeveloperCreate, iDeveloperResult, iDeveloperUpdate, iDeveloperInfosCreate, iDeveloperInfosResult, iDeveloperInfos, iDeveloperRetrieveResult } from './../interfaces/developer.interface';
import { iDeveloper } from "../interfaces/developer.interface";
import format from 'pg-format';
import { client } from '../database';

const create = async(payload:iDeveloperCreate):Promise<iDeveloper> => {
    
    const queryFormat:string = format(
        'INSERT INTO "developers" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const query: iDeveloperResult = await client.query(queryFormat)
    
    return query.rows[0]
}

const retrieve = async (developerId:string):Promise<iDeveloperRetrieveResult> =>{
    const query:iDeveloperResult = await client.query(
        'SELECT * FROM "developers" WHERE "id" = $1',[developerId]
    )

    const queryInfos:iDeveloperInfosResult = await client.query(
        'SELECT * FROM "developerInfos" WHERE "developerId" = $1',[developerId]
    )

    const developer =  {...query.rows[0]}
    const infos = {...queryInfos.rows[0]}

    const ObjResult:iDeveloperRetrieveResult = {
        developerId: developer.id,
        developerName: developer.name,
        developerEmail: developer.email,
        developerInfoDeveloperSince: infos.developerSince || null,
        developerInfoPreferredOS: infos.preferredOs || null
    }
    

    return ObjResult
}

const destroy = async (developerId:string):Promise<void> =>{
    await client.query('DELETE FROM "developers" WHERE "id" = $1',[developerId])
}

const update = async (payload:iDeveloperUpdate, developerId:string):Promise<iDeveloper> => {
    const queryFormat:string = format(
        'UPDATE "developers" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const query: iDeveloperResult = await client.query(queryFormat, [developerId])

    return query.rows[0]
}

const createInfos = async (payload: iDeveloperInfosCreate):Promise<iDeveloperInfos> => {
    const queryFormat:string = format(
        'INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const query:iDeveloperInfosResult = await client.query(queryFormat)

    return query.rows[0]
}

export default { create, retrieve, destroy, update, createInfos }