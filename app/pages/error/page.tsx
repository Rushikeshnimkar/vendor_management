"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

// Create a component that uses useSearchParams
function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "An unknown error occurred";

  // Map error codes to user-friendly messages
  if (error === "AccessDenied") {
    errorMessage =
      "You don't have permission to access this application. Please contact your administrator.";
  } else if (error === "Configuration") {
    errorMessage =
      "There is a problem with the server configuration. Please try again later.";
  } else if (error === "Verification") {
    errorMessage =
      "The verification link may have expired or already been used.";
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Authentication Error
        </h2>
        <p className="mt-2 text-gray-600">{errorMessage}</p>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Sign In
        </Link>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 animate-pulse bg-gray-200 rounded-full"></div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">
                Loading...
              </h2>
            </div>
          </div>
        }
      >
        <ErrorContent />
      </Suspense>
    </div>
  );
}
