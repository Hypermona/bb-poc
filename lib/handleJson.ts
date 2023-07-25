import editJsonFile from "edit-json-file";
import path from "path";
import { readFile, writeFile } from "fs";
import slugify from "slugify";


export const appendPost = async(data:any)=>{
    let file = editJsonFile(path.join(process.cwd(),"db","posts.json"));
    console.log("file",file);
    file.append("data",data );
    console.log(file.get())
    file.save()
}

export const getPosts = async()=>{
    let file = editJsonFile(path.join(process.cwd(),"db","posts.json"));
    return file.get()
}
export const storeFile = async(path:string, data:object)=>{
    writeFile(path,JSON.stringify(data),'utf8',(err)=>{
        if(err){
            console.log(err)
        }
    })
}

export const getSlug = (str:string)=>{
    return slugify(str,{lower:true,strict:true,trim:true})
}
export const getSlutJsonfilename = (str:string)=>{
    return `${getSlug(str)}.json`
}


// export const readPost =  async()=>{
//     readFile('post.json', 'utf8', function readFileCallback(err, data){
//     if (err){
//         console.log(err);
//     } else {
//     return data
// }})
// }