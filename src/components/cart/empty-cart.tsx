import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Your Cart is Empty
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex justify-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            Looks like you haven't added any items to your cart yet. Start
            shopping to find delicious burgers and more!
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full" size="lg">
            <Link href="/">Go to Store</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
