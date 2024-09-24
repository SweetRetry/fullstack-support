"use client";
import { redirect } from "next/navigation";

export function getToken(): string | never {
  const tokenString = localStorage.getItem("token");
  if (tokenString) {
    return JSON.parse(tokenString);
  } else {
    redirect("/login");
  }
}

export function setToken(token: string) {
  if (!token) {
    throw new Error("token is empty");
  }
  localStorage.setItem("token", JSON.stringify(token));
}
