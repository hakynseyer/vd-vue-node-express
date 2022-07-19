import { computed } from "vue";
import type { ComputedRef } from "vue";
import { TypeSelectOptions, TypeRank } from "@TS/interfaces";

import { Fetch, FETCH_METHODS } from "@Assets/ts/fetch";

import { EM } from "@Assets/ts/mitt";

declare var THE_SERVER: any;

interface FormData {
  rank: {
    data: string;
    error: string;
  };
  description: {
    data: string;
    error: string;
  };
}

export class FormClass {
  private _form: FormData;

  private _rankSelected: TypeRank;

  constructor() {
    this.clearData();

    this._rankSelected = null;
  }

  public clearData() {
    EM.emit("VIEW_RANKS_titleForm", "Nuevo Rango");

    if (this._rankSelected !== null) this._rankSelected = null;

    this._form = {
      rank: {
        data: "",
        error: "",
      },
      description: { data: "", error: "" },
    };
  }

  get rank(): string {
    return this._form.rank.data;
  }
  set rank(rank: string) {
    this._form.rank.data = rank;
  }
  get rankError(): string {
    return this._form.rank.error;
  }

  get description(): string {
    return this._form.description.data;
  }
  set description(description: string) {
    this._form.description.data = description;
  }
  get descriptionError(): string {
    return this._form.description.error;
  }

  get rankSelected(): TypeRank {
    return this._rankSelected;
  }
  set rankSelected(rank: TypeRank) {
    this._rankSelected = rank;
  }

  get enableSend(): ComputedRef<boolean> {
    return computed<boolean>((): boolean => {
      const noEmpty: boolean =
        this._form.rank.data.length && this._form.description.data.length
          ? true
          : false;

      if (noEmpty) return false;

      return true;
    });
  }

  get titleSend(): ComputedRef<string> {
    return computed<string>((): string => {
      if (this._rankSelected === null) return "Crear Rango";
      else return "Editar Rango";
    });
  }

  public async sendForm(): Promise<void> {
    EM.emit("COMPONENT_ALERT_launchAlert", {
      color: "warning",
      message: "Enviando Datos al Servidor",
      status: true,
    });

    const bodyRequest = {
      rank: this._form.rank.data,
      description: this._form.description.data,
    };

    if (this._rankSelected !== null) bodyRequest["id"] = this._rankSelected.id;

    const request: Request = Fetch.request(
      this._rankSelected === null
        ? `${THE_SERVER.host}/rango/crear`
        : `${THE_SERVER.host}/rango/actualizar`,
      this._rankSelected === null ? FETCH_METHODS.POST : FETCH_METHODS.PUT,
      bodyRequest
    );

    try {
      const res = await fetch(request);
      const datos = await res.json();

      switch (res.status) {
        case 200:
          EM.emit("COMPONENT_ALERT_launchAlert", {
            color: "success",
            message:
              this._rankSelected === null
                ? `Rango ${datos.newRank.rank} creado`
                : `Rango ${datos.rank.rank} actualizado`,
            status: true,
            timer: 5000,
          });

          // Actualizar Tabla
          EM.emit("VIEW_RANKS_updateTable");

          // Limpiar Datos
          this.clearData();

          return;
          break;
        case 406:
          Object.keys(this._form).forEach((key) => {
            if (datos.error[key] !== null && datos.error[key] !== undefined)
              this._form[key].error = datos.error[key];
          });

          EM.emit("COMPONENT_ALERT_launchAlert", { status: false });

          return;
          break;
      }
    } catch (e) {
      console.error(e);
    }

    EM.emit("COMPONENT_ALERT_launchAlert", {
      color: "danger",
      message: "Hubo un problema con el servidor",
      status: true,
    });
  }

  public async deleteRank(rank: TypeRank): Promise<void> {
    this.clearData();

    const request: Request = Fetch.request(
      `${THE_SERVER.host}/rango/eliminar`,
      FETCH_METHODS.DELETE,
      {
        id: rank.id,
      }
    );

    try {
      const res = await fetch(request);

      switch (res.status) {
        case 204:
          EM.emit("COMPONENT_ALERT_launchAlert", {
            color: "success",
            message: `Rango ${rank.rank} eliminado`,
            status: true,
            timer: 5000,
          });

          // Actualizar Tabla
          EM.emit("VIEW_RANKS_updateTable");

          return;
          break;
      }
    } catch (e) {
      console.error(e);
    }

    EM.emit("COMPONENT_ALERT_launchAlert", {
      color: "danger",
      message: "Hubo un problema con el servidor",
      status: true,
    });
  }
}
