import type { Request, Response, NextFunction } from "express";

const checkRequestBody = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is missing or empty" });
  }
  next();
};

export default checkRequestBody;