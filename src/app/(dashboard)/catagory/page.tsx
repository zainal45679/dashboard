import React from 'react'
import { CatagoryTable } from './_components/catagory-table'
import { categoryApi } from '@/api/category-api'

const api = async()=>{
  const response = await categoryApi.getAllCategory()
  return response.data.data.categories
}

const page = async() => {

  const data = await api();
  console.log(data);

  return (
    <div>
      <CatagoryTable data={data}/>
    </div>
  )
}

export default page