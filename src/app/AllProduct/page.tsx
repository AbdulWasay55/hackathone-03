'use client'
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../../../context/CartContex';


type SanityDataForAllProducts = {
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
      _ref: string;
      _type: string;
    };
    description: string;
    inventory: number;
    tags: string[];
  };

const SanityData = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<SanityDataForAllProducts[]>([]); // State to store fetched products

  useEffect(() => {
    const fetchProducts = async () => {
      const productTitles = [
        "Rose Luxe Armchair",
        "Citrus Edge",
        "Ivory Charm",
        "Library Stool Chair",
        "Sleek Spin",
        "Modern Cozy",
        "Scandi Dip Set",
        "Nordic Spin",
        "Gray Elegance"
      ];

      try {
        // Fetch products from Sanity
        const fetchData: SanityDataForAllProducts[] = await client.fetch(
          `*[_type == 'products' && title in $titles]{
            id, 
            title, 
            price, 
            priceWithoutDiscount, 
            badge, 
            image, 
            category->, 
            description, 
            inventory, 
            tags
          }`,
          { titles: productTitles }
        );
        setProducts(fetchData); // Update state with fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once


  



    
  return (
    <div>
        <div className=' font-semibold text-[#272343] text-[40px] my-20 flex justify-center'>Our Products</div>

        <div className="grid sm:grid-cols-2 gap-10 lg:grid-cols-3 mx-12 sm:mx-5 mb-5 xl:grid-cols-4">
        {products.map((product) => (
          
            <div  key={product.id} className="w-[312px] h-[377px] flex flex-col gap-[14px] justify-center  ">
              {/* Product Image */}
              <Link
              href={`/product/${product.id}`}
             
              className="flex flex-col gap-[10px] items-center  p-[20px] rounded-2xl">
              <Image
                src={urlFor(product.image).url() || "/placeholder.svg"}
                alt={product.title}
                width={312}
                height={312}
                className="rounded-md object-cover"
              />
              </Link>
              
              {/* Product Info */}
              <div className="w-[312px] flex justify-between h-[51px]">
                <div className="w-[256px] h-[51px] flex flex-col gap-[10px]">
                  <p className="text-[16px] leading-[20.8px]">{product.title}</p>
                  <p className="text-[18px] leading-[19.8px] text-[#272343] font-bold">
                    ${product.price}
                  </p>
                </div>
                {/* Cart Icon */}
                <div className="w-11 h-11 rounded-lg bg-[#F0F2F3] flex items-center justify-center active:bg-[#029FAE] active:text-[white]">
                  <IoCartOutline
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        image: urlFor(product.image).url(),
                      })
                    }
                    className="w-6 h-6 cursor-pointer "
                  />
                </div>
              </div>
            </div>
           
         
        ))}
      </div>
    </div>
  )
}

export default SanityData