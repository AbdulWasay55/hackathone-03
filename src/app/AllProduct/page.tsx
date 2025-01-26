'use client'
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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
    title: string; // Add category title for easier filtering
  };
  description: string;
  inventory: number;
  tags: string[];
};

const SanityData = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<SanityDataForAllProducts[]>([]);
  const [categories, setCategories] = useState<string[]>([]); // State for categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Selected categories

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchData: SanityDataForAllProducts[] = await client.fetch(
          `*[_type == 'products']{
            id, 
            title, 
            price, 
            priceWithoutDiscount, 
            badge, 
            image, 
            category->{title}, 
            description, 
            inventory, 
            tags
          }`
        );
        setProducts(fetchData);

        // Extract unique categories from the products
        const uniqueCategories = Array.from(
          new Set(fetchData.map((product) => product.category.title))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected categories
  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((product) =>
          selectedCategories.includes(product.category.title)
        )
      : products;

  // Handle checkbox change
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category) // Remove category
        : [...prev, category] // Add category
    );
  };

  return (
    <div>
      <div className="font-semibold text-[#272343] text-[40px] my-20 flex justify-center">
        Our Products
      </div>

      {/* Category Filter */}
      <div className="flex gap-4 justify-center mb-10">
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="cursor-pointer"
            />
            <span className="text-sm font-medium">{category}</span>
          </label>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 gap-10 lg:grid-cols-3 mx-12 sm:mx-5 mb-5 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-[312px] h-[377px] flex flex-col gap-[14px] justify-center"
          >
            {/* Product Image */}
            <Link
              href={`/product/${product.id}`}
              className="flex flex-col gap-[10px] items-center  p-[20px] rounded-2xl"
            >
              <Image
                src={urlFor(product.image).url() || '/placeholder.svg'}
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
  );
};

export default SanityData;
