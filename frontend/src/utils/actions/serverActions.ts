"use server";

import { OkamCoverImage, OkamFile } from "@/app/types";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { NFTStorage } from "nft.storage";

const supabase = createClient();
const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

export async function uploadFileToSupabase(
  formData: FormData
): Promise<OkamCoverImage> {
  const file = formData.get("file") as File;

  const extension = file.name.slice(file.name.lastIndexOf("."));
  const fileName = crypto.randomUUID();

  const { data, error } = await supabase.storage
    .from("test")
    .upload(`cover-images/${fileName}${extension}`, file);

  if (error) {
    console.error(
      "An error occured while uploading the file to supabase: ",
      error
    );

    return {
      name: "",
      mimeType: "",
      url: "",
    } as OkamCoverImage;
  }

  const { data: storedFile } = supabase.storage
    .from("test")
    .getPublicUrl(data.path);

  return {
    name: `${fileName}${extension}`,
    mimeType: file.type,
    url: storedFile.publicUrl,
  };
}

export async function uploadFileToIpfs(formData: FormData): Promise<OkamFile> {
  const file = formData.get("file") as File;

  try {
    const cid = await client.storeBlob(new Blob([file], { type: file.type }));

    return {
      name: file.name,
      mimeType: file.type,
      cid: cid,
    } as OkamFile;
  } catch (e: any) {
    console.error("An error occured while uploading the file: ", e);

    return {
      name: "",
      mimeType: "",
      cid: "",
    } as OkamFile;
  }
}

export async function getAll<T>(
  tableName: string
): Promise<PostgrestSingleResponse<T[]>> {
  return await supabase.from(tableName).select<"*", T>("*");
}

export async function getOne<T>(
  tableName: string,
  id: number
): Promise<PostgrestSingleResponse<T>> {
  return await supabase.from(tableName).select("*").eq("id", id).single<T>();
}

export async function create<T>(
  tableName: string,
  data: T[]
): Promise<PostgrestSingleResponse<T[]>> {
  return await supabase.from(tableName).insert<T>(data).select<"*", T>();
}
