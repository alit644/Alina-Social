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

