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
import { login } from "@repo/database/services/user";
import { useRouter } from "next/navigation";

import { setToken } from "@/lib/tokenUtil";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
const formSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
const UserAuthForm = () => {
  const t = useTranslations("");
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
      <h2 className="text-2xl font-bold">{t("login")}</h2>
      <p className="mb-4 mt-2 text-sm text-muted-foreground">
        {t("enter-email")}
      </p>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
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
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="block w-full" type="submit">
            {t('login')}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default UserAuthForm;
