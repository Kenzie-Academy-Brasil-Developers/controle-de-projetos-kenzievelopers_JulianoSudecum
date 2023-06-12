import handleError from "./handleErrors.middlewares";
import emailAlreadyExistsMiddleware from "./emailAlreadyExists.middleware";
import verifyIdParam from "./verifyIdParams.middleware";
import infosAlreadyExists from "./infosAlreadyExists.middleware";
import bodyIdExists from "./bodyIdExists.middleware";
import verifyOS from "./otherOS.middlewares";
import developerInfosAlreadyExists from "./developerInfosAlreadyExists.middlewares";

export {
    handleError,
    emailAlreadyExistsMiddleware,
    verifyIdParam,
    infosAlreadyExists,
    bodyIdExists,
    verifyOS,
    developerInfosAlreadyExists
}