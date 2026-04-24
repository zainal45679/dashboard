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

type Props = {
  data : [{
    _id: string;
    name: string;
    image: string;
    description: string;
  }]
}

export async function CatagoryTable({data}: Props) {

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5 flex w-full justify-between items-start">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Top Products
        </h2>
        <Link href="/catagory/add" className="dark:bg-white px-3 py-1 dark:text-dark font-bold rounded-lg">
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

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
