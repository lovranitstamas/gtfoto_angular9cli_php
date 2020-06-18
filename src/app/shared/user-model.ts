export class UserModel {
  private _id: string;
  private _name: string;
  private _email: string;
  private _address: string;
  private _dateOfBirth: string;
  private _gender: string;
  private _profilePictureUrl: string;
  private _admin: number;

  /*constructor(param?: UserModel) {
    if (param) {
      Object.assign(this, param);
    }
  }*/

  // id
  get idFunction(): string {
    return this._id;
  }

  set idFunction(id: string) {
    this._id = id;
  }

  // name
  get nameFunction(): string {
    return this._name;
  }

  set nameFunction(name: string) {
    this._name = name;
  }

  // email
  get emailFunction(): string {
    return this._email;
  }

  set emailFunction(email: string) {
    this._email = email;
  }

  // address
  get addressFunction(): string {
    return this._address;
  }

  set addressFunction(address: string) {
    this._address = address;
  }

  // dateOfBirth
  get dateOfBirthFunction(): string {
    return this._dateOfBirth;
  }

  set dateOfBirthFunction(dateOfBirth: string) {
    this._dateOfBirth = dateOfBirth;
  }

  // gender
  get genderFunction(): string {
    return this._gender;
  }

  set genderFunction(gender: string) {
    this._gender = gender;
  }

  // profilePictureUrl

  get profilePictureUrlFunction(): string {
    return this._profilePictureUrl;
  }

  set profilePictureUrlFunction(profilePictureUrl: string) {
    this._profilePictureUrl = profilePictureUrl;
  }

  // admin
  get adminFunction(): number {
    return this._admin;
  }

  set adminFunction(admin: number) {
    this._admin = admin;
  }
}
