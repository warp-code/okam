import { PostgrestSingleResponse, createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function getOne<T>(
  tableName: string,
  id: number
): Promise<PostgrestSingleResponse<T>> {
  return await supabase.from(tableName).select("*").eq("id", id).single<T>();
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