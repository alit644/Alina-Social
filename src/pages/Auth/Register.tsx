import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schema";
import { REGISTER_INPUST } from "@/data";
import SocialLogin from "@/components/ui/SocialLogin";
import Logo from "@/components/shared/Logo";
import { useAuthStore } from "@/store/Auth/useAuthStore";
import { Loader } from "lucide-react";
interface IFormInput {
  name: string;
  email: string;
  username: string;
  password: string;
}

const Register = () => {

  const { signUp, isLoading } = useAuthStore();

  const form = useForm<IFormInput>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
   await signUp(data);

  };

  //! render Inputs
  const renderInputs = REGISTER_INPUST.map((input) => (
    <FormItem key={input.id}>
      <FormControl>
        <Input
          placeholder={input.placeholder}
          aria-label={input.placeholder}
          type={input.type}
          className="h-10"
          {...form.register(input.name, input.validation)}
        />
      </FormControl>
      <FormMessage>{form.formState.errors[input.name]?.message}</FormMessage>
    </FormItem>
  ));

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:bg-gradient-to-br dark:from-[#0a0a0a] dark:via-[#000001] dark:to-[#0a0a0a]">
      <AnimatedBackground />

      <div className="relative  flex flex-col h-full w-full items-center justify-center px-[20px] ">
        {/* content */}
        <div className="w-full shadow-sm sm:w-[400px] flex flex-col items-center justify-center bg-white  border-input p-4  rounded-md dark:bg-card">
          <div className="w-full mb-6">
            <Logo />
          </div>
          <section className="w-full space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
              >
                {renderInputs}

                <Button
                  className="w-full h-10"
                  type="submit"
                  variant={"default"}
                  aria-label="Register"
                  title="Register"
                  disabled={isLoading}
                >
                 {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                  Register
                </Button>
              </form>
            </Form>
          </section>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[var(--primary-900)] hover:underline"
              aria-label="Login"
              title="Login"
            >
              Login
            </Link>
          </p>
          <div className="w-full h-[1px] bg-input mt-4" />
          {/* SocialLogin */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
