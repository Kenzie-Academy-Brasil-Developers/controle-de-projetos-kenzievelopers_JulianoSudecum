import { Router } from "express";
import developerController from "../controllers/developer.controller";
import { developerInfosAlreadyExists, emailAlreadyExistsMiddleware, verifyIdParam, verifyOS } from "../middlewares";


const developersRouter: Router = Router()

developersRouter.use("/:id", verifyIdParam)

developersRouter.post("", developerController.createDeveloper)

developersRouter.get("/:id", developerController.retrieveDeveloper)
developersRouter.patch("/:id", emailAlreadyExistsMiddleware, developerController.updateDeveloper)
developersRouter.delete("/:id", developerController.destroyDeveloper)

developersRouter.post("/:id/infos", developerInfosAlreadyExists, verifyOS, developerController.createDeveloperInfos)

export default developersRouter