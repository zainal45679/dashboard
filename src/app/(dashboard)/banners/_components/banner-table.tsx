"use client"
import { getTopProducts } from "@/components/Tables/fetch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { bannerApi } from "@/api/banner-api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import IconButton from "@mui/material/IconButton";
import AlertDialog from "../../ui-elements/confirm/page";
import { useState } from "react";
import { storageUrl } from "@/utils/base-url";

type bannerItems = {
  data : [{
    _id : string;
    name : string;
    image : string;
    description : string; 
  }]
}

export function BannerTable({data}: bannerItems) {

  const router = useRouter()
  const api = async (_id: string)=>{
    const res = await bannerApi.deleteBanner(_id)
    try {
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/banners")
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error); 
      toast.error(res.data.message);
    }
  }

  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState("");

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5 flex w-full justify-between items-start">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Top Banners
        </h2>
        <Link href="/banners/add" className="dark:bg-white px-3 py-1 dark:text-dark bg-primary text-white font-bold rounded-lg">
            ADD
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
              Banner Name
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((data) => (
            <TableRow
              className="text-base font-medium text-dark dark:text-white"
              key={data._id}
            >
              <TableCell className="flex min-w-fit items-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                <Image
                  src={storageUrl + data.image}
                  className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                  width={60}
                  height={50}
                  alt={"Image for product " + data.name}
                  role="presentation"
                />
                <div>{data.name}</div>
              </TableCell>
              <TableCell>{data.description}</TableCell>
              <TableCell><Link href={`/banners/${data._id}`}><EditIcon/></Link></TableCell>
              <TableCell>
                <DeleteIcon onClick={() => { setDeleteId(data._id); setOpen(true); }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog
        open={open}
        setOpen={setOpen}
        onConfirm={() => { api(deleteId); setOpen(false); }}
      />
    </div>
  );
}
