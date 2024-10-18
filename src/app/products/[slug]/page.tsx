import { AddToCart } from "@/components/cart/add-to-cart";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug, getProductList } from "@/lib/burger-service";
import { formatPennyValue } from "@/utils/helpers";
import { MoveLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { products } = await getProductList();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return {
    title: `${product.name} | Burger Store`,
    description: product.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: `${product.name} | Burger Store`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto mb-4 mt-8 max-w-3xl">
        <Button asChild={true} variant={"outline"}>
          <Link href="/" className="gap-2">
            <MoveLeft />
            Go back to Products
          </Link>
        </Button>
      </div>
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <AspectRatio ratio={800 / 400}>
              <Image
                alt="The Ultimate Cheeseburger"
                className="object-cover"
                height="400"
                src={product.image}
                style={{
                  aspectRatio: "800/400",
                  objectFit: "cover",
                }}
                width="800"
              />
            </AspectRatio>
          </div>
          <div className="grid gap-2">
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <Separator />
          <div className="flex items-end justify-between gap-6">
            <div className="grid gap-2">
              <h3 className="text-xl font-semibold">Calories</h3>
              <p className="font-bold text-muted-foreground">
                {product.calorie}
              </p>
            </div>
            <span className="text-right text-3xl font-bold">
              {formatPennyValue(product.price)}
            </span>
          </div>
          <Separator />
        </CardContent>
        <CardFooter>
          <AddToCart className="w-full" size="lg" product={product}>
            Add to Cart
          </AddToCart>
        </CardFooter>
      </Card>
    </div>
  );
}
