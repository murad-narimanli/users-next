import Layout from "@/components/layout/Layout"
import { useRouter } from 'next/router'


export default function News() {

  const router = useRouter()

  console.log(router)
    
  return (
    <>
     <Layout  
        title="news detail"
        metaDesc="This is news page"
      >
        this is detail {router.query.id}
     </Layout>
    </>
  )
}
