export interface ILoginInput {
  id: string;
  name: "email" | "password";
  type: "email" | "password";
  placeholder: string;
  validation: {
    required?: string;
    pattern?: RegExp;
   min?: number;
   max?: number;
  };
}

export interface IRegisterInput {

  id: string;
  name: "email" | "password" | "username" | "name";
  type: "email" | "password" | "text";
  placeholder: string;
  validation: {
    required?: string;
    pattern?: RegExp;
   min?: number;
   max?: number;
  };
}

export interface IGeneralInput {
  id: string;
  name: "full_name" | "username";
  type: "text" | "email" | "password";
  placeholder: string;
  validation: {
    required?: string;
    pattern?: RegExp;
   min?: number;
   max?: number;
  };
}

export interface ISignUpData {
  email: string;
  password: string;
  name: string;
  username: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface IProfile {
  id: string;
  full_name: string;
  username: string;
  email: string;
  bio: string;
  avatar_url: string;
}
