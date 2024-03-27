"use server";

import { OkamFile } from '@/app/types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { NFTStorage } from 'nft.storage';

const supabase = createClient();
const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

export async function uploadFile(formData: FormData): Promise<OkamFile | undefined> {
  const file = formData.get("file") as File;

  if (!file) {
    return;
  }

  try {
    const cid = await client.storeBlob(new Blob([file], { type: file.type }));

    return { name: file.name, mimeType: file.type, cid: cid } as OkamFile;
  } catch (e: any) {
    console.error("An error occured while uploading the file: ", e);

    return;
  }
};

export async function getAll<T>(tableName: string): Promise<PostgrestSingleResponse<T[]>> {
  return await supabase
    .from(tableName)
    .select("*");
}

export async function getOne<T>(tableName: string, id: number): Promise<PostgrestSingleResponse<T>> {
  return await supabase
    .from(tableName)
    .select("*")
    .eq("id", id)
    .single<T>();
}

export async function create<T>(tableName: string, data: any[]): Promise<PostgrestSingleResponse<T[]>> {
  return await supabase
    .from(tableName)
    .insert<T>(data)
    .select();

}
