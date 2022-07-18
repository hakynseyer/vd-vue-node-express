import { computed } from "vue";
import type { ComputedRef } from "vue";

import { Fetch, FETCH_METHODS } from "@Assets/ts/fetch";

import { EM } from "@Assets/ts/mitt";
import { useStore } from "@Assets/ts/store";
import { router } from "@Assets/ts/router";

declare var THE_SERVER: any;

interface FormData {
  user: {
    data: string;
    error: string;
  };
  password: {
    data: string;
    error: string;
  };
}

export class FormClass {
  private _form: FormData;

  constructor() {
    this._form = {
      user: {
        data: "yaqueline",
        error: "",
      },
      password: {
        data: "111aaa",
        error: "",
      },
    };
  }

  get user(): string {
    return this._form.user.data;
  }
  set user(user: string) {
    this._form.user.data = user;
  }
  get userError(): string {
    return this._form.user.error;
  }

  get password(): string {
    return this._form.password.data;
  }
  set password(password: string) {
    this._form.password.data = password;
  }
  get passwordError(): string {
    return this._form.password.error;
  }

  get enableSend(): ComputedRef<boolean> {
    return computed<boolean>((): boolean => {
      const noEmpty: boolean =
        this._form.user.data.length && this._form.password.data.length
          ? true
          : false;

      if (noEmpty) return false;

      return true;
    });
  }

  public async sendForm(): Promise<void> {
    EM.emit("COMPONENT_ALERT_launchAlert", {
      color: "warning",
      message: "Enviando Datos al Servidor",
      status: true,
    });

    const request: Request = Fetch.request(
      `${THE_SERVER.host}/login/acceso`,
      FETCH_METHODS.POST,
      {
        user: this._form.user.data,
        password: this._form.password.data,
      }
    );

    try {
      const res = await fetch(request);
      const datos = await res.json();

      switch (res.status) {
        case 200:
          EM.emit("COMPONENT_ALERT_launchAlert", {
            color: "success",
            message: "Usuario Logueado",
            status: true,
            timer: 2000,
          });

          const pinia = useStore();
          pinia.user.name = datos.user.name;
          pinia.user.surnameFirst = datos.user.surname_first;
          pinia.user.rank = datos.user.Rank.rank;
          pinia.token = datos.token;

          router.push({ name: "materials" });
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
}
