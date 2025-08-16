export interface ILoginInput {
  id: string;
  name: "email" | "password" | "username" | "name";
  type: string;
  placeholder: string;
  validation: {
    required?: string;
    pattern?: RegExp;
   min?: number;
   max?: number;
  };
}
