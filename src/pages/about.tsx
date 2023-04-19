import Layout from "@/components/layout/Layout"
import axios from "axios"

interface User {
    avatar:string
    email:string
    first_name:string
    id:number
    last_name:string
}

interface UserObject {
    data:Array<User>
    page:number
    per_page:number
    total:number
    total_pages:number
    support:any
}

interface AboutProps {
    users : UserObject
}

export default function About(props:AboutProps) {
    return (
    <>
     <Layout  
        title="About"
        metaDesc="This is about page"
      >
        <ul className="list-group">
           {props.users.data.map((user)=>(
            <li key={user.id} className="list-group-item disabled" aria-disabled="true">
                <div className="card">
                    <div className="card-body">
                        <img src={user.avatar} className="rounded" alt="..." />
                        <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
                        <p className="card-text">{user.email}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </li>
           ))}
        </ul>

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
