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
import { productApi } from "@/api/product-api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AlertDialog from "../../ui-elements/confirm/page";
import { useState } from "react";

type Props = {
  data : [{
    _id: string;
    name: string;
    image: string;
    category: string;
    brand: string;
    price: number;
    description: string;
    brandDetails: any;
    categoryDetails: any;
  }]
}



export function ProductTable({data}: Props) {

  const router = useRouter()

  const handleDelete = async(id: string) => {
    const res = await productApi.deleteProduct(id)
    try{
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

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5 flex w-full justify-between items-start">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Top Products
        </h2>
        <Link href="/products/add" className="dark:bg-white px-3 py-1 dark:text-dark font-bold  bg-primary text-white rounded-lg">
            ADD
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
              Product Name
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((product) => (
            <TableRow
              className="text-base font-medium text-dark dark:text-white"
              key={product._id}
            >
              <TableCell className="flex min-w-fit items-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                {/* <Image
                  src={product.image}
                  className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                  width={60}
                  height={50}
                  alt={"Image for product " + product.name}
                  role="presentation"
                /> */}
                <div>{product.name}</div>
              </TableCell>

              <TableCell>{product.brandDetails[0]?.name}</TableCell>

              <TableCell>{product.categoryDetails[0]?.name}</TableCell>

              <TableCell>{product.price}</TableCell>


              <TableCell className="pr-5 sm:pr-6 xl:pr-7.5">
                {product.description}
              </TableCell>
              <TableCell><Link href={`products/${product._id}`}><EditIcon/></Link></TableCell>
              <TableCell><DeleteIcon onClick={() => {setDeleteId(product._id); setOpen(true)}}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        onConfirm={() => { handleDelete(deleteId); setOpen(false); }}
      />
    </div>
  );
}
