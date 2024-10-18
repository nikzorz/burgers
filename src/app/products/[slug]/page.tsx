import ProductTemplate from "@/components/product/product-template";
import { getProductBySlug, getProductList } from "@/lib/burger-service";
import { Metadata } from "next";
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

  return <ProductTemplate product={product} />;
}
