import { ProductPreview } from "@/components/product/product-preview";
import { getProductList } from "@/lib/burger-service";

export async function ProductGrid() {
  const { products } = await getProductList();
  return (
    <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductPreview product={product} />
        </li>
      ))}
    </ul>
  );
}
