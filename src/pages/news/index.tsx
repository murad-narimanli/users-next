import Layout from "@/components/layout/Layout"
import Link from 'next/link'
let data = [
  {
    news:'test1',
    id:1
  },
  {
    news:'test2',
    id:2
  },
  {
    news:'test3',
    id:3
  },{
    news:'test4',
    id:4
  },
  {
    news:'test5',
    id:5
  }
]

export default function News() {
  return (
    <>
     <Layout  
        title="Contact"
        metaDesc="This is contact page"
      >
        <ul>
          {data.map((d , index)=>{
             return <li key={index}> <Link href={`/news/${d.id}`}>{d.news}</Link> </li>
          })}
        </ul>
     </Layout>
    </>
  )
}
