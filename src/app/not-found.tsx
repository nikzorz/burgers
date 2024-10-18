import { Metadata } from "next";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">Page not found</h1>
      <p>The page you tried to access does not exist.</p>
      <Link className="group flex items-center gap-x-1" href="/">
        <span>Go to frontpage</span>
        <GoArrowUpRight className="duration-150 ease-in-out group-hover:rotate-45" />
      </Link>
    </div>
  );
}
