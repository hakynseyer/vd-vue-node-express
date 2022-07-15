import { Request, Response, NextFunction } from "express";

import { Validator } from "../../../validator";

export class rank_Val {
  public static midd(req: Request, res: Response, next: NextFunction) {
    const { rank, description } = req.body;

    const valRank = Validator.basic(rank, 4, 30);
    const valDescription = Validator.basic(description, 4, 255);

    if (!valRank.length && !valDescription.length) next();
    else {
      res.status(406).json({
        error: {
          rank: valRank,
          description: valDescription,
        },
      });
    }
  }
}
