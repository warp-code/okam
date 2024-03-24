"use client";

import Category from "@/app/_components/Category";
import TextInput from "@/app/_components/TextInput";
import TextareaInput from "@/app/_components/TextareaInput";
import Uploader from "@/app/_components/Uploader";
import { categories } from "@/app/_examples/categories";
import { useState } from "react";

export default function Create() {
  const [files, setFiles] = useState([]);

  return (
    <div className="h-full max-w-270 flex flex-col mx-auto">
      <form className="flex flex-col min-w-full text-center gap-y-6">
        <h2 className="text-gray-50 font-semibold text-3xl/9.5 pb-6 text-left">
          Create dataset
        </h2>

        <TextInput label="Name" id="name" />

        <Uploader label="Cover image" id="coverImage" />

        <TextareaInput label="Description" id="description" />

        <h4 className="text-gray-50 text-lg text-left">Tags</h4>
        {
          <div className="flex flex-row flex-wrap py-4 gap-3">
            {categories.map((category) => {
              return <Category key={category.id} name={category.text} />;
            })}
          </div>
        }

        <h4 className="text-gray-50 text-lg text-left">Files</h4>

        <Uploader id="file" />

        <div className="flex flex-row">
          <div>
            <span></span>
            <span></span>
          </div>
          <button type="button"></button>
        </div>
      </form>
    </div>
  );
}
