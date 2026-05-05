"use client"

import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { error } from "console";
import { useForm } from "react-hook-form";
import z, { array } from 'zod'
import { Schema } from "zod/v3";
import { zodResolver } from '@hookform/resolvers/zod'
import { productApi } from "@/api/product-api";
import { brandApi } from "@/api/brand-api";
import { useEffect, useState } from "react";
import { categoryApi } from "@/api/category-api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  brands : any,
  categories : any
}

const productSchema = z.object({
  name: z.string(),
  category: z.string(),
  brand: z.string(),
  price: z.coerce.number().min(1, "Price is required"), 
  description: z.string(),
})



export type Tlogin = z.infer<typeof productSchema>

export function ProductAddForm({brands, categories}: Props) {

const { register, handleSubmit, formState : { errors } } = useForm ({ resolver : zodResolver(productSchema) })

const router = useRouter()

const submit = async(data : Tlogin) =>{
  try {
    const res = await productApi.createProduct(data);
    console.log(res);
    if (res.data.message) {
      toast.success(res.data.message)
      router.push("/products")
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    toast.error("Server error")
  }
}

  return (
    <ShowcaseSection title="Product Form" className="!p-6.5">
      <form onSubmit={handleSubmit(submit)} action="#">

        <InputGroup
          register = {register("name")}
          label="Product Name"
          type="text"
          placeholder="Enter your product name"
          className="mb-4.5"
          required
        />
        {errors.name && ( <p className='text-red-500'> {errors.name.message as string} </p>)}

        <Select
          register={(register("category"))}
          label="Category"
          placeholder="Select the category"
          className="mb-4.5"
          items={categories.map((c: any)=>({
            label : c.name,
            value : c._id
          }))}
        />
        {errors.category && ( <p className='text-red-500'> {errors.category.message as string} </p>)}

        <Select
          register={(register("brand"))}
          label="Brand"
          placeholder="Select your brand"
          className="mb-4.5"
          items={brands.map((b: any)=>({
            label : b.name,
            value : b._id
          }))}
        />
        {errors.brand && ( <p className='text-red-500'> {errors.brand.message as string} </p>)}

        <InputGroup
        register = {register("price")}
          label="Price"
          type="number"
          placeholder="Enter the price"
          className="mb-4.5"
        />
        {errors.price && ( <p className='text-red-500'> {errors.price.message as string} </p>)}

        <InputGroup
        register = {register("description")}
          label="Description"
          type="text"
          placeholder="Enter your product description"
          className="mb-4.5"
        />
        {errors.description && ( <p className='text-red-500'> {errors.description.message as string} </p>)}

        <button className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          ADD
        </button>
      </form>
    </ShowcaseSection>
  );
}
