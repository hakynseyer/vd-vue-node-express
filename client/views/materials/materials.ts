export class MaterialsClass {
  private _titleForm: string;

  constructor() {
    this._titleForm = "Nuevo Material";
  }

  get titleForm(): string {
    return this._titleForm;
  }
  set titleForm(titleForm: string) {
    this._titleForm = titleForm;
  }
}
