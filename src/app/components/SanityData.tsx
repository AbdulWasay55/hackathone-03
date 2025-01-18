import { client } from '@/sanity/lib/client'
import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type sanityData ={
    title : string,
    price: number,
    priceWithoutDiscount: number,
    badge: string,
    image: string,
    category: string,
    description: string,
    inventory: number,
    tags: string[],
    
  }
  

const  SanityData = async () => {
    const fetchData : sanityData[] = await client.fetch(`*[_type == 'products']`)

  return (
    <div>
        <h1 className=' font-bold text-[32px] text-[navy] flex justify-center my-10'>Sanity Fetch Date </h1>
        <div className="  grid sm:grid-cols-2 gap-10 lg:grid-cols-3 mx-5 mb-5">
            {fetchData.map((product , index)=>(
                <div key={product.title + index} className="flex flex-col gap-[10px] items-center bg-[#ebe3eb] p-[20px] rounded-2xl">
                    <div className="flex flex-col gap-[10px] justify-center ">
                        <Image src={urlFor(product.image).url()} alt='' width={300} height={200} className=" rounded-xl sm:w-[400px] sm:h-[300px]"/>
                        <div className=' font-medium text-[navy] bg-[white] p-2 rounded-lg'>
                                   {product.title}
                        </div>
                        <div className='text-slate-500'>{product.description}</div>
                        <div className=' text-[navy] font-medium'>Price {product.price}$</div>
                    </div>
                </div>

            ))}
        </div>

    </div>
  )
}

export default SanityData