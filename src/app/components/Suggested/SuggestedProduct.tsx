import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"

type SuggestedProductProps = {
  id: string
  title: string
  price: number
  image: {
    asset: {
      _ref: string
      _type: string
    }
  }
  category: {
    _id: string
    name: string
  }
}

export default function SuggestedProducts({ products }: { products: SuggestedProductProps[] }) {
  if (products.length === 0) {
    return null
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-[#272343]">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
              <Image
                src={urlFor(product.image).url() || "/placeholder.svg"}
                alt={product.title}
                width={300}
                height={300}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

