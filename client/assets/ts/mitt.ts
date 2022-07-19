import mitt, { Emitter } from "mitt";
import {
  TypeAlertData,
  TypeMaterial,
  TypeProvider,
  TypeUser,
  TypeRank,
} from "@TS/interfaces";

type Events = {
  APP_h1: string;

  COMPONENT_ALERT_launchAlert: TypeAlertData;

  VIEW_MATERIALS_FORM_materialSelected: TypeMaterial;
  VIEW_MATERIALS_FORM_deleteMaterial: TypeMaterial;
  VIEW_MATERIALS_titleForm: string;
  VIEW_MATERIALS_updateTable: void;

  VIEW_PROVIDERS_FORM_providerSelected: TypeProvider;
  VIEW_PROVIDERS_FORM_deleteProvider: TypeProvider;
  VIEW_PROVIDERS_titleForm: string;
  VIEW_PROVIDERS_updateTable: void;

  VIEW_USERS_FORM_userSelected: TypeUser;
  VIEW_USERS_FORM_deleteUser: TypeUser;
  VIEW_USERS_titleForm: string;
  VIEW_USERS_updateTable: void;

  VIEW_RANKS_FORM_rankSelected: TypeRank;
  VIEW_RANKS_FORM_deleteRank: TypeRank;
  VIEW_RANKS_titleForm: string;
  VIEW_RANKS_updateTable: void;
};

export const EM: Emitter<Events> = mitt<Events>();
