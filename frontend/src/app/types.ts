export type OkamFile = {
  name: string;
  mimeType: string;
  cid: string;
};

export type OkamCoverImage = {
  name: string;
  mimeType: string;
  url: string;
};

export type Category = {
  id: number;
  text: string;
};

export type CategoryModel = Category & { checked: boolean };

export type Dataset = {
  id: number;
  name: string;
  cover_image: OkamCoverImage;
  description: string;
  file_cid: string;
  author: string;
  quadratic_param: number;
  linear_param: number;
  constant_param: number;
  categories: number[];
  token_id: string;
  data_to_encrypt_hash: string;
};

export type DatasetModel = Dataset & {
  buyPrice: bigint;
};

export type SearchModel = {
  search: string;
  categories: CategoryModel[];
};

export type CreateModel = {
  name: string;
  coverImage: OkamCoverImage;
  description: string;
  categories: CategoryModel[];
  file: OkamFile;
};

export type DatasetTradingInfo = {
  currentSupply: bigint;
  buyPrice: bigint;
  sellPrice: bigint;
};

export type TokenHolder = {
  id: number;
  address: `0x${string}`;
  token_id: string;
  dataset_id: number;
};

export type FormModel = {
  name: string;
  coverImage: OkamCoverImage;
  description: string;
  categories: CategoryModel[] | undefined;
  file: OkamFile;
};
