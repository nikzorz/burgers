import NavCartButton from "@/components/cart/nav-cart-button";
import { ModeToggle } from "@/components/layout/dark-mode-toggle";
import Link from "next/link";

export default async function Nav() {
  return (
    <div className="group sticky inset-x-0 top-0 z-50">
      <header className="relative mx-auto h-16 border-b border-border bg-background duration-200">
        <nav className="flex h-full w-full items-center justify-between">
          <div className="flex h-full flex-1 basis-0 items-center pl-4">
            <Link
              href="/"
              className="text-lg font-semibold uppercase hover:text-foreground/80"
            >
              Burger Store
            </Link>
          </div>

          <div className="flex h-full items-center">
            {/* TODO Search here? */}
            &nbsp;
          </div>

          <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-6 pr-4">
            <NavCartButton />
            <ModeToggle />
          </div>
        </nav>
      </header>
    </div>
  );
}
