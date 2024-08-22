"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserAuthForm = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    ),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  return (
    <section>
      <h2 className="font-bold text-2xl">Login</h2>
      <p className="text-sm text-muted-foreground mt-2 mb-4">
        Enter your username below to login to your account
      </p>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
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
              </FormItem>
            )}
          />

          <Button className="block w-full">Login</Button>
        </form>
      </Form>
    </section>
  );
};

export default UserAuthForm;
