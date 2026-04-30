"use client"

import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { error } from "console";
import { register } from "module";
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
  categories : any,
  data:{
    _id : string,
    name : string,
    category : string,
    brand : string,
    price : string,
    description :string,
  }
}

const productSchema = z
  .object({
    name: z.string().min(3),
    category: z.string().nonempty({ message : "Select any one Category"}),
    brand: z.string().nonempty({ message : "Select any Brand"}),
    price: z.coerce.number(),
    description: z.string().min(10)
  })

export type Tlogin = z.infer<typeof productSchema>

export function ProductEditForm({brands, categories, data}: Props) {

const router = useRouter()

const { 
  register, 
  handleSubmit, 
  formState : { errors } 
} 
= useForm (
  { 
    resolver : zodResolver(productSchema),
    defaultValues : {
      name : data?.name,
      category : data?.category,
      brand : data?.brand,
      price : data?.price,
      description : data?.description
    }
  })



const id = data?._id

const submit = async(data : Tlogin) =>{
  try {
    const res = await productApi.updateProduct(id, data);
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
      <form key={data?._id} onSubmit={handleSubmit(submit)} action="#">

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
          placeholder="Select the Category"
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
          placeholder="Select your subject"
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
          UPDATE
        </button>
      </form>
    </ShowcaseSection>
  );
}
