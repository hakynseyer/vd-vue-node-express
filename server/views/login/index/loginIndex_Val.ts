import { Request, Response, NextFunction } from "express";

import { Validator } from "../../../validator";

export class loginIndex_Val {
  public static midd(req: Request, res: Response, next: NextFunction) {
    const { user, password } = req.body;

    const valUser = Validator.basic(user, 4, 15);
    const valPassword = Validator.basic(password, 4, 15);

    if (!valUser.length && !valPassword.length) {
      console.log("Pasar al siguiente middleware");
      next();
    } else {
      res.status(406).json({
        error: {
          user: valUser,
          password: valPassword,
        },
      });
    }
  }
}
