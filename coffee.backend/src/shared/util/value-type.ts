export class ValueString {
  constructor(value) {
    this._value = value;
  }
  private _value: string;
  public get value(): string {
    return this._value;
  }
}
