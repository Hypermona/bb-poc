import Card from '@components/card';
import { headers } from 'next/headers';
import Link from 'next/link';


async function getAllPosts(){
    const host = headers().get("host");
    const protocal = process?.env.NODE_ENV==="development"?"http":"https"
    let res = await fetch(`${protocal}://${host}/api`, { cache: "no-store" });
    let posts =await res.json();
    return posts;
}
interface Data {
  title?: string;
  description?: string;
  image?: string;
}
export default async function Home() {
  const posts = await getAllPosts();
  console.log(posts)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 px-8">
      <div className="pointer">
        <Link href="/add">Add Post</Link>
        <div className="flex flex-wrap gap-4 gap-y-20 mt-5">
          {posts.map((p: any, i: any) => (
            <Card key={i} metaData={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
