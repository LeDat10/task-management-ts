import { taskRoutes } from "./task.route";
import { Express } from "express";
import { userRoutes } from "./user.route";
import * as authMiddlware from "../middlewares/auth.middleware";

const mainV1Routes = (app: Express): void => {
    const version: string = "/api/v1";

    app.use(version + "/tasks", authMiddlware.requireAuth, taskRoutes);

    app.use(version + "/users", userRoutes);
};

export default mainV1Routes;