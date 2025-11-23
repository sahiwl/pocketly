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
import { Link } from "react-router";

export function Signup() {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Pocketly</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link to="/signin" className="text-sm font-medium hover:underline">
              Already have an account?
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="username@x.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium leading-none">
              username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="username"
              required
            />
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
            <Input id="password" type="password" required />
          </div>
          <Button className="w-full" size="lg">
            Login
          </Button>
          {/*<Button variant="outline" className="w-full" size="lg">
            Login with Google
          </Button>*/}
        </CardContent>
      </Card>
    </div>
  );
}
