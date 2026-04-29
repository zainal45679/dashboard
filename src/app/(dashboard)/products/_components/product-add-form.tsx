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

export function ProductAddForm() {

const [brand, setBrand] = useState([]);
const [category, setCategory] = useState([]);

useEffect(()=>{
  const fetchBrand = async () =>{
    const res = await brandApi.getAllBrands()
    setBrand(res.data.data.brands)
  }
  const fetchCategory = async () => {
    const res = await categoryApi.getAllCategory()
    setCategory(res.data.data.categories)
  }
  fetchBrand()
  fetchCategory()
},[])

const brandOptions = brand.map((b) => ({
  label: b.name,
  value: b._id,
}));

const categoryOptions = category.map((c) => ({
  label: c.name,
  value: c._id,
}));

const productSchema = z
  .object({
    name: z.string().min(3),
    category: z.string().nonempty({ message : "Select any one catagory"}),
    brand: z.string().nonempty({ message : "Select any Brand"}),
    price: z.string(),
    description: z.string().min(10)
  })

const { register, handleSubmit, formState : { errors } } = useForm ({ resolver : zodResolver(productSchema) })

type Tlogin = z.infer<typeof productSchema>

const submit = async(data : Tlogin) =>{
  try {
    const res = await productApi.createProduct(data);
    console.log(res);
    if (res.data.message) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    toast.error("Server error")
  }
}

  return (
    <ShowcaseSection title="Contact Form" className="!p-6.5">
      <form onSubmit={handleSubmit(submit)} action="#">

        <InputGroup
          register = {register("name")}
          label="Product Name"
          type="text"
          placeholder="Enter your Product Name"
          className="mb-4.5"
          required
        />
        {errors.name && ( <p className='text-red-500'> {errors.name.message as string} </p>)}

        <Select
          register={(register("category"))}
          label="Catagory"
          placeholder="Select the Catagory"
          className="mb-4.5"
          items={categoryOptions}
        />
        {errors.category && ( <p className='text-red-500'> {errors.category.message as string} </p>)}

        <Select
          register={(register("brand"))}
          label="Brand"
          placeholder="Select your subject"
          className="mb-4.5"
          items={brandOptions}
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
