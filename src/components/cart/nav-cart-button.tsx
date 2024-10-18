import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function NavCartButton() {
  // TODO replace with real data
  const totalItems = 2;

  return (
    <div className="relative inline-block">
      <Button variant="ghost" size="icon" className="relative" asChild={true}>
        <Link href="/cart">
          <ShoppingCart />
          <span className="sr-only">Shopping cart</span>

          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full p-0"
            >
              {totalItems}
            </Badge>
          )}
        </Link>
      </Button>
    </div>
  );
}
