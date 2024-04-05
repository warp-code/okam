"use client";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import {
  create,
  getAll,
  uploadFileToIpfs,
  uploadFileToSupabase,
} from "@/utils/actions/serverActions";
import { Category, Dataset, OkamCoverImage } from "@/app/types";
import { useLayoutEffect } from "react";

import Form from "@/pages/_components/Form";

export default function Create() {
  const { push } = useRouter();
  const { isDisconnected } = useAccount();

  useLayoutEffect(() => {
    if (isDisconnected) {
      push("/");
    }
  }, [isDisconnected, push]);

  const uploadFormData = async (
    file: File | undefined
  ): Promise<OkamCoverImage> => {
    if (!file) {
      console.error("No file was uploaded.");

      return {
        name: "",
        mimeType: "",
        url: "",
      } as OkamCoverImage;
    }

    if (file.size > 10485760) {
      console.error("File size is greater than 10 MB");
    }

    const formData = new FormData();

    formData.append("file", file as File);

    return await uploadFileToSupabase(formData);
  };

  return (
    <Form
      uploadFileToIpfs={async (formData: FormData) => {
        return await uploadFileToIpfs(formData);
      }}
      uploadImage={async (file: File) => {
        return await uploadFormData(file);
      }}
      getAllCategories={async () => {
        return await getAll<Category>("categories");
      }}
      createDatasetFunction={async (dataset: Dataset) => {
        return await create<Dataset>("datasets", [dataset]);
      }}
    />
  );
}
