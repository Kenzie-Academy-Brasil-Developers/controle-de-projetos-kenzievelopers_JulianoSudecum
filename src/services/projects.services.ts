import  format  from 'pg-format';
import { iProjectResult, iProjectCreate, iProjectUpdate } from './../interfaces/projects.interface';
import { query } from 'express';
import { iProject } from "../interfaces/projects.interface";
import { client } from '../database';

const retrieveProject = async (projectId: string):Promise<iProject> =>{

    const query: iProjectResult = await client.query(
        'SELECT * FROM "projects" WHERE "id" = $1;',[projectId]
    )

    return query.rows[0]
}

const createProject = async (payload: iProjectCreate):Promise<iProject> => {
    const queryFormat:string = format(
        'INSERT INTO "projects" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const query: iProjectResult = await client.query(queryFormat)
    
    return query.rows[0]
}

const updateProject = async (payload:iProjectUpdate, projectId:string):Promise<iProject> => {
    const queryFormat:string = format(
        'UPDATE "projects" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    )

    const query: iProjectResult = await client.query(queryFormat, [projectId])

    return query.rows[0]
}

export default { retrieveProject, createProject, updateProject }