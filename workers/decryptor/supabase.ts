import { PostgrestSingleResponse, createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function getOneByTokenId<T>(
  tableName: string,
  id: string
): Promise<PostgrestSingleResponse<T>> {
  return await supabase.from(tableName).select("*").eq("token_id", id).single<T>();
}

export type Dataset = {
  id: number;
  name: string;
  description: string;
  file_cid: string;
  author: string;
  quadratic_param: number;
  linear_param: number;
  constant_param: number;
  token_id: string;
  data_to_encrypt_hash: string;
};