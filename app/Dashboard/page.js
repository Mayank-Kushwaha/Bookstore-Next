import React from 'react';
import UserInfo from "@/components/UserInfo";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/Login");

  return <UserInfo />;
}
