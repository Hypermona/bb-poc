import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import Image from "next/image";
const cld = new Cloudinary({
  cloud: {
    cloudName: "hypermona",
  },
});

interface Data {
  title?: string;
  description?: string;
  image?: string;
}

const getPost = async(metaData:any)=>{
  const data = await fetch(metaData?.secure_url);
  return await data.json();
}

async function Card({ metaData }: { metaData: any }) {
  const data = await  getPost(metaData);
  console.log(data)
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <Image
          className="rounded-t-lg"
          src={"https://res.cloudinary.com/hypermona/image/upload/" + data.image!}
          alt={data.title!}
          width={400}
          height={100}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h5>
        </a>
        <p className="mb-3 max-h-20 overflow-hidden font-normal text-gray-700 dark:text-gray-400">
          {data.description}
        </p>
      </div>
    </div>
  );
}

export default Card;
