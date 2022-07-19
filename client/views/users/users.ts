import { EM } from "@Assets/ts/mitt";

export class UsersClass {
  private _titleForm: string;

  constructor() {
    this._titleForm = "Nuevo Usuario";
  }

  get titleForm(): string {
    return this._titleForm;
  }
  set titleForm(titleForm: string) {
    this._titleForm = titleForm;
  }
}
