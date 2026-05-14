"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authApi } from "@/api/auth-api";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookie from "js-cookie"


const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type Tlogin = z.infer<typeof loginSchema>;

export default function SigninWithPassword() {

  const { 
    register, 
    handleSubmit, 
    formState : { errors } } 
    = useForm (
      { resolver : zodResolver(loginSchema)},
    )


  const router = useRouter()
  const submit = async (data: any) => {
  const res = await authApi.loginUser(data);
    try {
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("accessToken", res.data.data.accessToken )
        Cookie.set("accessToken", res.data.data.accessToken)
        router.push("/")
        console.log(res);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error); 
      toast.error(res.data.message);
    }
};

  return (
    <form onSubmit={handleSubmit(submit)}>
      <InputGroup
        register={register("email")}
        type="email"
        label="Email"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your email"
        name="email"
        icon={<EmailIcon />}
      />

      <InputGroup
        register={register("password")}
        type="password"
        label="Password"
        className="mb-5 [&_input]:py-[15px]"
        placeholder="Enter your password"
        name="password"
        icon={<PasswordIcon />}
      />

      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="Remember me"
          name="remember"
          withIcon="check"
          minimal
          radius="md"
        />

        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign In
          // <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
  
        </button>
      </div>
    </form>
  );
}
