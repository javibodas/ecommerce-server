import { Application } from "express";
import { healthCheck } from "../apps/shared/controllers/StatusController";

export const loadApiEndpoints = (app: Application): void => {
  app.get("/api/v1/healthcheck", healthCheck)
};
