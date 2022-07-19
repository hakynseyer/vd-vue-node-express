import { computed } from "vue";
import type { ComputedRef } from "vue";
import { TypeSelectOptions, TypeProvider } from "@TS/interfaces";

import { Fetch, FETCH_METHODS } from "@Assets/ts/fetch";

import { EM } from "@Assets/ts/mitt";

declare var THE_SERVER: any;

interface FormData {
  company: {
    data: string;
    error: string;
  };
  description: {
    data: string;
    error: string;
  };
  user: {
    data: number;
    error: string;
  };
}

export class FormClass {
  private _form: FormData;

  private _userList: any;

  private _providerSelected: TypeProvider;

  constructor() {
    this.clearData();

    this._userList = null;

    this._providerSelected = null;
  }

  public clearData() {
    EM.emit("VIEW_PROVIDERS_titleForm", "Nuevo Proveedor");

    if (this._providerSelected !== null) this._providerSelected = null;

    this._form = {
      company: {
        data: "",
        error: "",
      },
      description: { data: "", error: "" },
      user: {
        data: 0,
        error: "",
      },
    };
  }

  get userList(): any {
    return this._userList;
  }

  get company(): string {
    return this._form.company.data;
  }
  set company(company: string) {
    this._form.company.data = company;
  }
  get companyError(): string {
    return this._form.company.error;
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

  get user(): number {
    return this._form.user.data;
  }
  set user(user: number) {
    this._form.user.data = user;
  }
  get userError(): string {
    return this._form.user.error;
  }

  get providerSelected(): TypeProvider {
    return this._providerSelected;
  }
  set providerSelected(provider: TypeProvider) {
    this._providerSelected = provider;
  }

  get enableSend(): ComputedRef<boolean> {
    return computed<boolean>((): boolean => {
      const noEmpty: boolean =
        this._form.company.data.length &&
        this._form.description.data.length &&
        this._form.user.data > 0
          ? true
          : false;

      if (noEmpty) return false;

      return true;
    });
  }

  get titleSend(): ComputedRef<string> {
    return computed<string>((): string => {
      if (this._providerSelected === null) return "Crear Proveedor";
      else return "Editar Proveedor";
    });
  }

  public async getUserList(): Promise<void> {
    const request: Request = Fetch.request(
      `${THE_SERVER.host}/usuario`,
      FETCH_METHODS.GET
    );

    try {
      const res = await fetch(request);
      const data = await res.json();

      this._userList = data.users.map((user) => {
        return {
          value: user.id,
          label: `${user.name} ${user.surname_first} ${user.surname_second}`,
        };
      });

      return;
    } catch (e) {
      console.error(e);
    }

    EM.emit("COMPONENT_ALERT_launchAlert", {
      color: "danger",
      message: "Hubo un problema con el servidor",
      status: true,
    });
  }

  public async sendForm(): Promise<void> {
    EM.emit("COMPONENT_ALERT_launchAlert", {
      color: "warning",
      message: "Enviando Datos al Servidor",
      status: true,
    });

    const bodyRequest = {
      company: this._form.company.data,
      description: this._form.description.data,
      user: this._form.user.data,
    };

    if (this._providerSelected !== null)
      bodyRequest["id"] = this._providerSelected.id;

    const request: Request = Fetch.request(
      this._providerSelected === null
        ? `${THE_SERVER.host}/proveedor/crear`
        : `${THE_SERVER.host}/proveedor/actualizar`,
      this._providerSelected === null ? FETCH_METHODS.POST : FETCH_METHODS.PUT,
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
              this._providerSelected === null
                ? `Proveedor ${datos.newProvider.company} creado`
                : `Proveedor ${datos.provider.company} actualizado`,
            status: true,
            timer: 5000,
          });

          // Actualizar Tabla
          EM.emit("VIEW_PROVIDERS_updateTable");

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

  public async deleteProvider(provider: TypeProvider): Promise<void> {
    this.clearData();

    const request: Request = Fetch.request(
      `${THE_SERVER.host}/proveedor/eliminar`,
      FETCH_METHODS.DELETE,
      {
        id: provider.id,
      }
    );

    try {
      const res = await fetch(request);

      switch (res.status) {
        case 204:
          EM.emit("COMPONENT_ALERT_launchAlert", {
            color: "success",
            message: `Proveedor ${provider.company} eliminado`,
            status: true,
            timer: 5000,
          });

          // Actualizar Tabla
          EM.emit("VIEW_PROVIDERS_updateTable");

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
