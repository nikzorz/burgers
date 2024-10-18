import { AddToCart } from "@/components/cart/add-to-cart";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ProductRecord } from "@/types";
import { formatPennyValue } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";

type ProductPreviewProps = {
  product: ProductRecord;
};

export function ProductPreview({ product }: ProductPreviewProps) {
  return (
    <div className="mx-auto h-full w-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
        <Link href={`/products/${product.slug}`}>
          <AspectRatio ratio={16 / 9}>
            <Image
              className="mb-4 h-48 w-full rounded-lg object-cover"
              fill
              src={product.image}
              alt={product.name}
            />
          </AspectRatio>
        </Link>
        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="flex-1 text-gray-500 dark:text-gray-400">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">
              {formatPennyValue(product.price)}
            </span>
            <AddToCart product={product}>Add to Cart</AddToCart>
          </div>
        </div>
      </div>
    </div>
  );
}
