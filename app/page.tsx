"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Login() {
    const router = useRouter();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Here, you would normally check login credentials via API.
    // For now, we just navigate:
    router.push("/dashboard");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg p-6 sm:p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
