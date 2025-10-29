
export type UserType = {
    name: string;
    mail: string;
    password: string;
    confirmPassword: string;
    roleName: string | null;
    [key:string]:string |null
  };