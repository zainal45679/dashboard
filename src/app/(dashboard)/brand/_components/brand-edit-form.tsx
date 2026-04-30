"use client"

import { brandApi } from "@/api/brand-api";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type Props = {
  data : {
    _id : string,
    name : string,
    description : string
  }
}

const brandSchema = z.object({
  name : z.string().min(3),
  description : z.string().min(3)
})

export type Tlogin = z.infer<typeof brandSchema>

export function BrandEditForm({data} : Props){

const router = useRouter()


const { 
  handleSubmit, 
  register, 
  formState : { errors }} 
  = useForm({ 
    resolver : zodResolver(brandSchema),
    defaultValues : {
      name : data.name,
      description : data.description
    }
   })


const id = data._id

const submit = async( data : Tlogin)=>{
  const res = await brandApi.updateBrand(data, id);
  try {
    if(res.data.success){
      toast.success(res.data.message)
      router.push("/brand")
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    toast.error("Not created")
  }
}

  return (
    <ShowcaseSection title="Brand Edit Form" className="!p-6.5">
      <form onSubmit={handleSubmit(submit)} action="#">
        <InputGroup
          register={register("name")}
          label="Brand Name"
          type="text"
          placeholder="Enter your brand name "
          className="mb-4.5"
        />
        {errors.name && ( <p className='text-red-500'> {errors.name.message as string} </p>)}

        <InputGroup
          register={register("description")}
          label="Description"
          type="text"
          placeholder="Enter your brand description"
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
