"use client"

import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { error } from "console";
import { register } from "module";
import { useForm } from "react-hook-form";
import z from 'zod'
import { Schema } from "zod/v3";
import { zodResolver } from '@hookform/resolvers/zod'

export function ProductAddForm() {

const productSchema = z
  .object({
    productName: z.string().min(3),
    catagory: z.string().nonempty({ message : "Select any one catagory"}),
    brand: z.string().nonempty({ message : "Select any Brand"}),
    price: z.string(),
    description: z.string().min(10)
  })

const { register, handleSubmit, formState : { errors } } = useForm ({ resolver : zodResolver(productSchema) })
  
type Tlogin = z.infer<typeof productSchema>

const submit = (data : Tlogin) =>{
    console.log(data);
}

  return (
    <ShowcaseSection title="Contact Form" className="!p-6.5">
      <form onSubmit={handleSubmit(submit)} action="#">

        <InputGroup
          register = {register("productName")}
          label="Product Name"
          type="text"
          placeholder="Enter your Product Name"
          className="mb-4.5"
          required
        />
        {errors.productName && ( <p className='text-red-500'> {errors.productName.message as string} </p>)}


        <Select
          register={(register("catagory"))}
          label="Catagory"
          placeholder="Select the Catagory"
          className="mb-4.5"
          items={[
            { label: "United States", value: "USA" },
            { label: "United Kingdom", value: "UK" },
            { label: "Canada", value: "Canada" },
          ]}
          
        />
        {errors.catagory && ( <p className='text-red-500'> {errors.catagory.message as string} </p>)}

        <Select
          register={(register("brand"))}
          label="Brand"
          placeholder="Select your subject"
          className="mb-4.5"
          items={[
            { label: "United States", value: "USA" },
            { label: "United Kingdom", value: "UK" },
            { label: "Canada", value: "Canada" },
          ]}
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
