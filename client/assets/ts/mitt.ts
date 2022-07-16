import mitt, { Emitter } from "mitt";
import { ALERT_DATA } from "@TS/interfaces";

type Events = {
  APP_H1: string;
  ALERT: ALERT_DATA;
};

export const EM: Emitter<Events> = mitt<Events>();
