import { Router } from "express";
import projectsController from "../controllers/projects.controller";
import { bodyIdExists, projectVerifyId } from "../middlewares";


const projectsRouter: Router = Router()

projectsRouter.use("/:id", projectVerifyId)

projectsRouter.post("", bodyIdExists, projectsController.createProject)
projectsRouter.get("/:id", projectsController.readProject)
projectsRouter.patch("/:id",bodyIdExists ,projectsController.updateProject)

export default projectsRouter