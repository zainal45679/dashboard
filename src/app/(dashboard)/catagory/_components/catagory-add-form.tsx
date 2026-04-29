"use client"

import { categoryApi } from "@/api/category-api";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function CatagoryAddForm() {

const catagorySchema = z.object({
  name : z.string().min(3),
  description : z.string().min(10)
})

const { register, handleSubmit, formState : {errors} } = useForm({resolver : zodResolver(catagorySchema)})

type Tlogin = z.infer<typeof catagorySchema>

const submit = async ( data : Tlogin ) => {
  const res = await categoryApi.createCategory(data);
  try {
    if (res.data.success) {
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    toast.error("Server Error")
  }
}

  return (
    <ShowcaseSection title="Category Form" className="!p-6.5">
      <form onSubmit={handleSubmit(submit)} action="#">
        <InputGroup
          register={register("name")}
          label="Product Name"
          type="text"
          placeholder="Enter your Product name "
          className="mb-4.5"
        />
        {errors.name && ( <p className='text-red-500'> {errors.name.message as string} </p>)}

        <InputGroup
          register={register("description")}
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
