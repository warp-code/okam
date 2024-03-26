"use server";

import { createClient } from '@/utils/supabase/server';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { NFTStorage } from 'nft.storage';

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    return;
  }

  const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

  try {
    const cid = await client.storeBlob(new Blob([file], { type: file.type }));

    return { name: file.name, mimeType: file.type, cid: cid };
  } catch (e: any) {
    console.error("An error occured while uploading the file: ", e);

    return;
  }
};

export async function getAll<T>(tableName: string): Promise<PostgrestSingleResponse<T[]>> {
  const supabase = createClient();

  return await supabase
    .from(tableName)
    .select("*");
}

export async function getOne<T>(tableName: string, id: number): Promise<PostgrestSingleResponse<T>> {
  const supabase = createClient();

  return await supabase
    .from(tableName)
    .select("*")
    .eq("id", id)
    .single<T>();
}

export async function create<T>(tableName: string, data: any[]): Promise<PostgrestSingleResponse<T[]>> {
  const supabase = createClient();

  return await supabase
    .from(tableName)
    .insert<T>(data)
    .select();

}
