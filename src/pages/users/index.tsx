import React, { useEffect, useState } from "react"
import Layout from "@/components/layout/Layout"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/router'


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

export default function Users(props:AboutProps) {
    const router = useRouter()
    const {page , per_page , total , total_pages} = props.users
    const [perPage , setPerPage] = useState<any>()
    const [currentPage , setCurrentPage] = useState<any>()
    const [firstName , setFirstName] = useState<any>()

    const renderPages = () =>{
        let html = []
        for (let index = 1; index <= total_pages; index++) {
            html.push(index)
        }
        return html.map((i , index)=>{
          return  <li key={index} onClick={()=>{ setCurrentPage(i) }} className={`page-item  ${page === i ? 'active': ''}`}><a className="page-link" >{i}</a></li>
        })
    }


    useEffect(()=>{
        if(router.query.per_page || router.query.page || router.query.s){
            setCurrentPage(router.query.page)
            setPerPage(router.query.per_page)
            setFirstName(router.query.s)
        }
    }, [])

    useEffect(()=>{
        if(perPage || currentPage || firstName){
            router.push({
                pathname: 'users',
                query: {
                    per_page:perPage,
                    page: currentPage,
                    s:firstName
                },
            })
        }
    } , [perPage , currentPage , firstName])

    return (
    <>
     <Layout  
        title="Users"
        metaDesc="This is about page"
      >
        <h3 className="px-2">Users</h3>

        <div className="w-100 px-5">
            <div className="input-group mb-3">
                <input value={firstName} onChange={(e)=>{ setFirstName(e.target.value)  }} type="text" className="form-control" placeholder="Search username"  />
            </div>
        </div>

        <div className="row px-5 w-100 ">
           {props.users.data.map((user , index)=>(
                <div key={index} className="col-4 list-group-item">
                    <Link href={`users/${user.id}`} key={user.id} >
                        <div className="card">
                            <div className="card-body">
                                  <Image
                                        src={user.avatar}
                                        alt="Picture of the author"
                                        width={500}
                                        height={500}
                                    />
                                <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
                                <p className="card-text">{user.email}</p>
                                <div className="btn btn-primary">Go somewhere</div>
                            </div>
                        </div>
                    </Link>
                </div>
           ))}
        </div>
        

        <div className="d-flex align-items-center    justify-content-center p-5">
            <nav className="mt-3">
                    <ul className="pagination"> 
                        <li onClick={()=> { page !== 1 ?  setCurrentPage(page-1) : ''  }} className={`${page <= 1 ? 'disabled':''}  page-item`}>
                            <a className="page-link">Previous</a>
                        </li>
                        {renderPages()} 
                        <li onClick={()=> { page !== total_pages ?  setCurrentPage(page+1) : ''  }} className={`${page === total_pages ? 'disabled':''}  page-item`}>
                            <a className="page-link">Next</a>
                        </li>
                    </ul>
            </nav>
            <select onChange={(e)=>{setPerPage(e.target.value)}} className="ms-2 form-select form-select-sm " style={{width:'150px'}}>
                <option selected>Per page</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="6">6</option>
            </select>
        </div>

     </Layout>
    </>
  )
}



export async function getServerSideProps(context:any) {
    let users = await axios.get(`https://reqres.in/api/users?first_name=${context.query.s}&per_page=${context.query.per_page}&page=${context.query.page}`)
    console.log(users.data)
    return {
        props: {
            users: users.data
        }, 
    }
  }