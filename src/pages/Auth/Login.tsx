import { useForm } from "react-hook-form";
import { Form, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
const Login = () => {
  const form = useForm();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-800">
      <AnimatedBackground />

      <div className="relative  flex flex-col h-full w-full items-center justify-center px-[20px]">
        {/* content */}
        <div className="w-full shadow-sm md:w-[400px] flex flex-col items-center justify-center bg-white border-input p-4 rounded-md">
          <div className="w-full flex items-center justify-center gap-2 mb-6">
            <img
            loading="lazy"
              src="/images/Logomark.svg"
              alt="logo"
              className="w-[40px] h-[40px]"
            />
            <h1 className="H3">Alina Social</h1>
          </div>
          <form className="w-full space-y-4">
            <Form {...form}>
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" type="email" className="h-11" />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    className="h-11"
                  />
                </FormControl>
              </FormItem>
            </Form>
            <Button
              className="w-full h-11"
              type="submit"
              variant={"neutral"}
              aria-label="Login"
            >
              Login
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline"
              aria-label="Register"
            >
              Register
            </Link>
          </p>
          <div className="w-full h-[1px] bg-input mt-6" />
          {/* social login */}
          <div className="w-full flex flex-col items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              className="w-full h-11"
              size={"lg"}
              aria-label="Login with Google"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="main-grid-item-icon mr-2 "
                fill="none"
              >
                <path
                  d="M24 12.276c0-.816-.067-1.636-.211-2.438H12.242v4.62h6.612a5.549 5.549 0 0 1-2.447 3.647v2.998h3.945C22.669 19.013 24 15.927 24 12.276Z"
                  fill="#4285F4"
                />
                <path
                  d="M12.241 24c3.302 0 6.086-1.063 8.115-2.897l-3.945-2.998c-1.097.732-2.514 1.146-4.165 1.146-3.194 0-5.902-2.112-6.873-4.951H1.302v3.09C3.38 21.444 7.612 24 12.242 24Z"
                  fill="#34A853"
                />
                <path
                  d="M5.369 14.3a7.053 7.053 0 0 1 0-4.595v-3.09H1.302a11.798 11.798 0 0 0 0 10.776L5.369 14.3Z"
                  fill="#FBBC04"
                />
                <path
                  d="M12.241 4.75a6.727 6.727 0 0 1 4.696 1.798l3.495-3.425A11.898 11.898 0 0 0 12.243 0C7.611 0 3.38 2.558 1.301 6.615l4.067 3.09C6.336 6.862 9.048 4.75 12.24 4.75Z"
                  fill="#EA4335"
                />
              </svg>
              Log in with Google
            </Button>
            <Button
              variant="outline"
              className="w-full h-11"
              size={"lg"}
              aria-label="Login with Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="main-grid-item-icon mr-2"
                fill="none"
              >
                <path
                  d="m17.543 13.398.661-4.31h-4.136V6.29c0-1.18.578-2.329 2.43-2.329h1.88V.291S16.673 0 15.042 0c-3.407 0-5.633 2.064-5.633 5.802v3.285H5.622v4.311h3.786v10.42a15.015 15.015 0 0 0 4.66 0v-10.42h3.475Z"
                  fill="#1877F2"
                />
              </svg>
              Log in with Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


