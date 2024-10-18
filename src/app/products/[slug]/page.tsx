import ProductTemplate from "@/components/product/product-template";
import { getProductBySlug, getProductList } from "@/lib/burger-service";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const { products } = await getProductList();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return {
    title: `${product.name} | Burger Store`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Burger Store`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductTemplate product={product} />;
}
