import Metin2List from '@/components/metin2-list/Metin2List'
import PageTitle from '@/components/page-title'

function Page() {
  return (
    <div className="page-metin2">
      <PageTitle>Metin2 Sunucu Listesi</PageTitle>
      <Metin2List />
    </div>
  )
}

export default Page
