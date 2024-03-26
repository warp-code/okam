export type File = {
  name: string | null;
  mimeType: string | null;
  cid: string | null;
};

export type Category = {
  id: number;
  text: string;
  checked: boolean;
};

export type Dataset = {
  id?: number;
  name: string;
  cover_image: string;
  description: string;
  file_cid: string;
  author: string;
  quadratic_param: number;
  linear_param: number;
  constant_param: number;
};

export type DatasetCategory = {
  id?: number;
  dataset_id: number;
  category_id: number;
};