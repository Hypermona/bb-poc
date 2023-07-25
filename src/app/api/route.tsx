import { NextRequest } from "next/server";
import { appendPost, getPosts, getSlutJsonfilename, storeFile } from "../../../lib/handleJson";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { rm } from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true,
});

export async function POST(req: NextRequest) {
  if (req.body) {
    const body = await req.json();
    console.log("client", body);
    const filename = getSlutJsonfilename(body?.title)
    await storeFile(path.join("db", filename), body);
    const res = await cloudinary.uploader.unsigned_upload(
      path.join("db", filename),
      "u5yrn1d9-bb-poc",
      {
        folder: "bb-poc/blogs",
        resource_type: "raw",
      }
    );
    if(res){
      await rm(path.join("db", filename),(err)=>{
        console.log(err)
      });
    }
    return new Response(JSON.stringify({}), {
      status: 200,
    });
  }
}
export async function GET() {
  let posts = Array;
  return cloudinary.search
    .expression(
      "folder:bb-poc/blogs/*" // add your folder
    )
    .sort_by("public_id", "desc")
    .max_results(10)
    .execute()
    .then((result) => {
      console.log(typeof result?.resources);
      posts = result?.resources;
      return new Response(JSON.stringify(posts), {
        status: 200,
      });
    }).catch((err)=>{
      console.log(err)
    });
  
}
