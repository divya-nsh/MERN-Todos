import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="absolute left-0 top-0 flex min-h-screen w-full items-center justify-center pt-20 text-black">
      <div className="translate-y-[-40%] text-center">
        <h1 className="mb-2 text-9xl font-bold text-red-600">404</h1>
        <h2 className="mt-2 text-2xl text-neutral-800">Oops! page not found</h2>
        <Link
          to="/"
          className="mt-6 hover:opacity-80 inline-block rounded-md bg-blue-600 px-4 py-1.5 text-white"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
