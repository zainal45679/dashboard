import React from 'react'

import { categoryApi } from '@/api/category-api'
import { CategoryTable } from './_components/category-table'

const api = async()=>{
  const response = await categoryApi.getAllCategory()
  return response.data.data.categories
}

const page = async() => {

  const data = await api();
  console.log(data);

  return (
    <div>
      <CategoryTable data={data}/>
    </div>
  )
}

export default page