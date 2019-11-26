export interface IUser {
  username: string;
  displayName: string;
  token: string;
  image?: null;
}

export interface IUserFormValues {
  emai: string;
  password: string;
  displayName?: string;
  username?: string;
}
