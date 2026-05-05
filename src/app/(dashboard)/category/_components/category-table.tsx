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
import { categoryApi } from "@/api/category-api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  data : [{
    _id: string;
    name: string;
    image: string;
    description: string;
  }]
}

export function CategoryTable({data}: Props) {

  const router = useRouter()

  const handleDelete = async(id : string) => {
    const res = await categoryApi.deleteCategory(id)
    try {
      if (res.data.success) {
        toast.success(res.data.message)
        router.refresh()
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error("Server Error")
    }
  }

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5 flex w-full justify-between items-start">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Top Categories
        </h2>
        <Link href="/category/add" className="dark:bg-white px-3 py-1 dark:text-dark  bg-primary text-white font-bold rounded-lg">
          ADD
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
              Category Name
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((category) => (
            <TableRow
              className="text-base font-medium text-dark dark:text-white"
              key={category._id}
            >
              <TableCell className="flex min-w-fit items-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                {/* <Image
                  src={category.image}
                  className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                  width={60}
                  height={50}
                  alt={"Image for product " + category.name}
                  role="presentation"
                /> */}
                <div>{category.name}</div>
              </TableCell>

              <TableCell>{category.description}</TableCell>

              <TableCell><Link href={`/category/${category._id}`}><EditIcon/></Link></TableCell>

              <TableCell><DeleteIcon onClick={()=>{handleDelete(category._id)}}/></TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
