"use client";

import TextInput from "@/app/_components/TextInput";
import Uploader from "@/app/_components/Uploader";

export default function Create() {
  return (
    <div className="h-full max-w-270 flex flex-col mx-auto">
      <form className="flex flex-col min-w-full text-center gap-y-6">
        <h2 className="text-gray-50 font-semibold text-3xl/9.5 pb-6 text-left">
          Create dataset
        </h2>

        <TextInput label="Name" id="name" />

        <Uploader label="Cover image" id="coverImage" />
      </form>
    </div>
  );
}
