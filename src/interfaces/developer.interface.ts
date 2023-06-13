import { QueryResult } from "pg"

export interface iDeveloper {
    id: number,
    name: string,
    email: string
}

export type iDeveloperCreate = Omit<iDeveloper, "id">
export type iDeveloperUpdate = Partial<iDeveloperCreate>
export type iDeveloperRead = Array<iDeveloper>
export type iDeveloperResult = QueryResult<iDeveloper>

export interface iDeveloperInfos {
    id: number,
    developerSince: Date,
    preferredOs: "Windows" | "Linux" | "MacOS",
    developerId: number
}

export type iDeveloperInfosCreate = Omit<iDeveloperInfos, "id" | "developerId">
export type iDeveloperInfosResult = QueryResult<iDeveloperInfos>

export interface iDeveloperRetrieveResult {
    developerId: number,
    developerName: string,
    developerEmail: string,
    developerInfoDeveloperSince: Date | null,
    developerInfoPreferredOS: "Windows" | "Linux" | "MacOS" | null
}