
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import SuggestedProducts from "@/app/components/Suggested/SuggestedProduct";
import AddToCartButton from "@/app/components/AddToCartButton";

// Type for Sanity Data
type SanityData = {
  id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  badge: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  category: {
    _id: string;
    name: string;
  };
  description: string;
  inventory: number;
  tags: string[];
};

// Fetch product data for static generation
export async function generateStaticParams() {
  const products = await client.fetch(`*[_type == "products"]{id}`);
  return products.map((product: { id: string }) => ({
    id: product.id,
  }));
}

// Get product details by ID
async function getProduct(id: string): Promise<SanityData> {
  return client.fetch(
    `*[_type == "products" && id == $id][0]{
      id, 
      title, 
      price, 
      priceWithoutDiscount, 
      badge, 
      image, 
      category->{_id, name}, 
      description, 
      inventory, 
      tags
    }`,
    { id }
  );
}

// Fetch suggested products by category, excluding the current product
async function getSuggestedProducts(
  categoryId: string,
  currentProductId: string
): Promise<SanityData[]> {
  return client.fetch(
    `*[_type == "products" && category._ref == $categoryId && id != $currentProductId][0...4]{
      id, 
      title, 
      price, 
      image, 
      category->{_id, name}
    }`,
    { categoryId, currentProductId }
  );
}



export default async function ProductPage({ params,}: { params: { id: string };}) {
  // Fetch product details and suggested products
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Product not found
      </div>
    );
  }

  const suggestedProducts = await getSuggestedProducts(
    product.category._id,
    product.id
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div>
          <Image
            src={urlFor(product.image).url() || "/placeholder.svg"}
            alt={product.title}
            width={600}
            height={600}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div className="w-[380px] sm:w-[543px] h-[607px] flex flex-col gap-10">
            {/* Product Title */}
            <h1 className="w-[380px] sm:w-[500px] h-[132px] text-[#272343] text-[60px] leading-[66px] font-bold">
              {product.title}
            </h1>

            {/* Price */}
            <div className="w-[144px] h-[44px] rounded-[100px] bg-[#029FAE] text-[20px] leading-[22px] text-white p-3 text-center">
              ${product.price} USD
            </div>

            {/* Divider Line */}
            <div className="w-[380px] sm:w-[543px] h-[1px] border-[#D9D9D9] border-[1px]" />

            {/* Product Description */}
            <p className="w-[380px] sm:w-[543px] h-[101px] text-[#272343] opacity-60 text-[22px] leading-[33px] mb-4">
              {product.description}
            </p>

            {/* Add to Cart Button */}
           
             
              <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image: urlFor(product.image).url() || "/placeholder.svg",
              }}
              
            />
            
          </div>
        </div>
      </div>

      {/* Suggested Products */}
      <SuggestedProducts products={suggestedProducts} />
    </div>
  );
}
