import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

export function Login() {
  type FormDataSignin = {
    usernameOrEmail: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSignin>();
  const { login, loginStatus, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/temp");
    return null;
  }

  const onSubmit = async (data: FormDataSignin) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>Enter your email or username below</CardDescription>
          <CardAction>
            <Link to="/signup" className="text-sm font-medium hover:underline">
              Sign Up
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="usernameOrEmail"
                className="text-sm font-medium leading-none"
              >
                Email or username
              </label>
              <Input
                id="usernameOrEmail"
                type="text"
                placeholder="Email or username"
                {...register("usernameOrEmail", {
                  required: "Username or email is required",
                })}
              />
              {errors.usernameOrEmail && (
                <p className="text-sm text-red-500">
                  {errors.usernameOrEmail.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none"
                >
                  Password
                </label>
                {/*<a href="#" className="text-sm font-medium hover:underline">
                  Forgot your password?
                </a>*/}
              </div>
              <Input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {loginStatus.isError && (
              <div className="text-sm text-red-500 text-center">
                Login failed. Please check your credentials.
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loginStatus.isLoading}
            >
              {loginStatus.isLoading ? "Logging in..." : "Login"}
            </Button>
            {/*<Button variant="outline" className="w-full" size="lg">
              Login with Google
            </Button>*/}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
