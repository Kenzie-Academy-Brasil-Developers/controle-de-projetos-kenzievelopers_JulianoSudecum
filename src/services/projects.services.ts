import { iDeveloper, iDeveloperResult } from './../interfaces/developer.interface';
import  format  from 'pg-format';
import { iProjectResult, iProjectCreate, iProjectUpdate, iProjectRetrieveReturn } from './../interfaces/projects.interface';
import { iProject } from "../interfaces/projects.interface";
import { client } from '../database';

const retrieveProject = async (projectId: string):Promise<iProjectRetrieveReturn> =>{

    const query: iProjectResult = await client.query(
        'SELECT * FROM "projects" WHERE "id" = $1;',[projectId]
    )

    const projectInfo = query.rows[0]

    const developerOwner:iDeveloperResult = await client.query(
        'SELECT * FROM "developers" WHERE "id" = $1;',[projectInfo.developerId]
    )

    const projectReturn:iProjectRetrieveReturn = {
        projectId: projectInfo.id,
        projectName: projectInfo.name,
        projectDescription: projectInfo.description,
        projectRepository: projectInfo.repository,
        projectStartDate: projectInfo.startDate,
        projectEndDate: projectInfo.endDate,
        projectDeveloperName: developerOwner.rows[0].name
    }

    return projectReturn
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