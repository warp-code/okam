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
    <div className="h-full max-w-192 flex flex-col mx-auto">
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
              return (
                <Category
                  key={category.id}
                  id={category.id.toString()}
                  label={category.text}
                />
              );
            })}
          </div>
        }

        <h4 className="text-gray-50 text-lg text-left">Files</h4>

        <Uploader id="file" />

        <div className="flex flex-col gap-6">
          <div className="flex flex-row  justify-between">
            <div className="flex flex-row gap-x-2.5">
              <span className="btn btn-xs btn-secondary my-auto select-none">
                IPFS
              </span>
              <span className="text-gray-50 break-all my-auto">
                QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
              </span>
            </div>

            <button type="button" className="text-gray-400 text-sm">
              Delete
            </button>
          </div>

          <div className="flex flex-row  justify-between">
            <div className="flex flex-row gap-x-2.5">
              <span className="btn btn-xs btn-secondary my-auto select-none">
                IPFS
              </span>
              <span className="text-gray-50 break-all my-auto">
                QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
              </span>
            </div>

            <button type="button" className="text-gray-400 text-sm">
              Delete
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary btn-sm">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
