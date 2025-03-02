"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md p-8 bg-black rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          Authentication Error
        </h1>

        {error === "AccessDenied" ? (
          <div>
            <p className="mb-4">
              You are not authorized to access this application. Only
              pre-registered users can log in.
            </p>
            <p className="mb-4">
              Please contact the administrator if you believe you should have
              access.
            </p>
          </div>
        ) : (
          <p className="mb-4">
            An error occurred during authentication. Please try again later.
          </p>
        )}

        <Link
          href="/"
          className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
