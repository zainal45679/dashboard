import { bannerApi } from '@/api/banner-api'
import { BannerTable } from './_components/banner-table'

const api = async ()=> {
  const response = await bannerApi.getAllBanner()
  return response.data.data.banners
}

const page = async () => {

  const banners = await api();
  console.log(banners);

  return (
    <div>
      <BannerTable data={banners} />
    </div>
  )
}

export default page