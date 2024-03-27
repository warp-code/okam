export type OkamFile = {
  name: string;
  mimeType: string;
  cid: string;
};

export type Category = {
  id: number;
  text: string;
};

export type CategoryModel = {
  id: number;
  text: string;
  checked: boolean;
};

export type Dataset = {
  id: number;
  name: string;
  cover_image: {
    name: string;
    mimeType: string;
    cid: string;
  };
  description: string;
  file_cid: string;
  author: string;
  quadratic_param: number;
  linear_param: number;
  constant_param: number;
  categories: number[];
};

export type SearchModel = {
  search: string,
  categories: CategoryModel[];
};

export type CreateModel = {
  name: string;
  coverImage: OkamFile;
  description: string;
  categories: CategoryModel[];
  file: OkamFile;
};