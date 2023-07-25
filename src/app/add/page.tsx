"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, ChangeEvent } from "react";
import axios from "axios";

interface Data {
  title?: String;
  description?: String;
  image?: String;
}

function Page() {
  const [data, setData] = useState<Data | {}>({});
  const router = useRouter();
  const [Imagedata, setImageData] = useState<File>();
  const onChange = (event: ChangeEvent<any>) => {
    setData((prev) => ({ ...prev, [event?.target?.name]: event?.target?.value }));
  };
  const handleImageChange = (files: FileList | null) => {
    if (!files) return;
    setImageData(files[0]);
  };
  const onSave = async (data: Data) => {
    let image: String | null = null;
    console.log("proceessss",process.env.NEXT_PUBLIC_UPLOAD_PRESET, process.env.NEXT_PUBLIC_CLOUD_NAME);
    try {
      const formData = new FormData();
      formData.append("file", Imagedata!);
      formData.append("folder", "bb-poc/images");
      formData.append("upload_preset", ""+process.env.NEXT_PUBLIC_UPLOAD_PRESET);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/`,
        formData
      );
      if (res?.data) {
        image = res.data.public_id;
      }
    } catch (err) {
      console.log(err);
    }
    try {
      if(Imagedata && !image){
        console.log("image upload failed try again!")
        return
      }
      let res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...data,image}),
      });
      if (res.status === 200) {
        router.replace("/");
      }
    } catch (err) {}
  };
  return (
    <>
      <Link href={"/"}>Go Back</Link>
      <div className="text-center mb-2">Add Post</div>
      <div className="flex flex-col items-center">
        <div className="sm:col-span-4">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="title"
                id="username"
                onChange={onChange}
                autoComplete="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="janesmith"
              />
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
            About
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="description"
              rows={3}
              onChange={onChange}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={""}
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Write a few sentences about yourself.
          </p>
        </div>
        <div className="col-span-full">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            onChange={(e) => handleImageChange(e.target.files)}
            name="image"
            type="file"
          />
        </div>
        <button
          onClick={() => {
            onSave(data);
          }}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Page;
