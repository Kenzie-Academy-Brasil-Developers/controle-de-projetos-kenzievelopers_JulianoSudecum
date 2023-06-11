import { QueryResult } from "pg"

export interface iProject {
    id: number,
    name: string,
    description: string,
    repository: string,
    startDate: Date,
    endDate?: Date | undefined | null,
    developerId?: number | undefined | null
}

export type iProjectCreate = Omit<iProject, "id" | "developerId">
export type iProjectUpdate = Partial<iProjectCreate>
export type iProjectResult = QueryResult<iProject>