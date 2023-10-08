import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Cart from "@/components/Cart";

export default async function Cartpage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/Login");

  return <Cart />;
}
