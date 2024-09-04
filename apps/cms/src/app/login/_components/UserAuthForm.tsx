"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "@repo/database/services/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { setToken } from "@/lib/tokenUtil";

const formSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
const UserAuthForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await login(values);
    if (res.data?.token) {
      setToken(res.data.token);
      router.push("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: res.message,
      });
    }
  };
  return (
    <section>
      <h2 className="text-2xl font-bold">Login</h2>
      <p className="mb-4 mt-2 text-sm text-muted-foreground">
        Enter your email below to login to your account
      </p>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="block w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default UserAuthForm;
