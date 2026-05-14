"use client";

import { bannerApi } from "@/api/banner-api";
import FileUploaderSingle from "@/components/FormElements/FileUpload/fileUploaderSingle";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { Select } from "@/components/FormElements/select";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import DropzoneWrapper from "@/components/styles/react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function BannerAddForm() {
  const router = useRouter();

  const MAX_FILE_SIZE = 5000000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const bannerSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(10),
    imageFile: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      ),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(bannerSchema) });

  type Tlogin = z.infer<typeof bannerSchema>;

  const submit = async (data: Tlogin) => {
    const res = await bannerApi.createBanner(data);
    try {
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/banners");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(res.data.message);
    }
  };

  return (
    <ShowcaseSection title="Banner Form" className="!p-6.5">
      <form onSubmit={handleSubmit(submit)} action="#">
        <InputGroup
          register={register("name")}
          label="Banner Name"
          type="text"
          placeholder="Enter your banner name "
          className="mb-4.5"
        />
        {errors.name && (
          <p className="text-red-500"> {errors.name.message as string} </p>
        )}

        <InputGroup
          register={register("description")}
          label="Description"
          type="text"
          placeholder="Enter your banner description"
          className="mb-4.5"
        />
        {errors.description && (
          <p className="text-red-500">
            {" "}
            {errors.description.message as string}{" "}
          </p>
        )}

        <DropzoneWrapper>
          <Typography variant="h6" sx={{ mb: 2.5 }}>
            Image:
            {!!errors.imageFile && (
              <span
                style={{ color: "red", fontSize: "14px", marginLeft: "2px" }}
              >
                Invalid Image format or Image is Required {!!errors.imageFile}
              </span>
            )}
          </Typography>
          <Controller
            name="imageFile"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <FileUploaderSingle
                  file={field.value}
                  setFile={field.onChange}
                  error={errors.imageFile}
                />
              </div>
            )}
          />
        </DropzoneWrapper>

        <button className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          ADD
        </button>
      </form>
    </ShowcaseSection>
  );
}
