import { LoginForm } from "@/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Login" };

const LoginPage = () => {
  return (
    <section className="grid place-items-center">
      <div className="wrapper w-full">
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Please Login Here</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
