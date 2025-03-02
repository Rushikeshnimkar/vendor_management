"use client";

import { useSession } from "next-auth/react";
import SignIn from "./pages/signin/page";
import Homepage from "./pages/homepage/page";
import LoadingSpinner from "../component/LoadingSpinner";
import { User } from "next-auth";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-black">
      {status === "authenticated" && session?.user ? (
        <Homepage user={session.user as User} />
      ) : (
        <SignIn />
      )}
    </div>
  );
}
