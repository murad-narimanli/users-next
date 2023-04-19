import Layout from "@/components/layout/Layout"
import axios from "axios"


export default function Detail() {
    return (
    <>
     <Layout  
        title="User Detail"
        metaDesc="This is user detail page"
      >
        Salam
     </Layout>
    </>
  )
}




export async function getStaticProps(context:any) {

    let users = await axios.get('https://reqres.in/api/users')
    
    return {
      props: {
        users: users.data
      }, // will be passed to the page component as props
    }
}
