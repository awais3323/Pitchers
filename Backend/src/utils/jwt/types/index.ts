import { User } from "entities/user";

export interface ResponseTypes {
  cookie(arg0: string, JWT: string, options: { expires: Date; httpOnly: boolean; }): unknown;
  status: (arg0: number) => {
    (): any;
    new (): any;
    cookie: {
      (
        arg0: string,
        arg1: string,
        arg2: { expires: Date; httpOnly: boolean }
      ): {
        (): any;
        new (): any;
        json: {
          (arg0: { success: boolean; user: User; JWT: string }): void;
          new (): any;
        };
      };
      new (): any;
    };
  };
}