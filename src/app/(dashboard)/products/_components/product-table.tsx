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
    category: string;
    brand: string;
    price: number;
    description: string;
    brandDetails: any;
    categoryDetails: any;
  }]
}

export async function ProductTable({data}: Props) {

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5 flex w-full justify-between items-start">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Top Products
        </h2>
        <Link href="/products/add" className="dark:bg-white px-3 py-1 dark:text-dark font-bold rounded-lg">
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

              <TableCell>{product.brandDetails?.name}</TableCell>

              <TableCell>{product.categoryDetails?.name}</TableCell>

              <TableCell>{product.price}</TableCell>

              <TableCell className="pr-5 text-right text-green-light-1 sm:pr-6 xl:pr-7.5">
                {product.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
