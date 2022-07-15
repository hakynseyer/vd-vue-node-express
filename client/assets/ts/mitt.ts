import mitt, { Emitter } from "mitt";
import { InterAlert } from "@TS/interfaces";

type Events = {
  APP_H1: string;
};

export const EM: Emitter<Events> = mitt<Events>();
