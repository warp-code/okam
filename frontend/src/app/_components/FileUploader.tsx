"use client";

import { NFTStorage } from "nft.storage";

export default function FileUploader({
  name,
  nftStorageApiKey,
  value,
  label,
  placeholder,
  handleOnChange,
}: {
  name: string;
  nftStorageApiKey: string;
  value?:
    | {
        name: string | null;
        mimeType: string | null;
        cid: string | null;
      }
    | undefined;
  label?: string | undefined;
  placeholder?: string | undefined;
  handleOnChange: Function;
}) {
  const client = new NFTStorage({ token: nftStorageApiKey });

  const uploadFile = async (file: File | undefined) => {
    if (!file) {
      return;
    }

    try {
      const cid = await client.storeBlob(new Blob([file], { type: file.type }));

      return { name: file.name, mimeType: file.type, cid: cid };
    } catch (e: any) {
      console.error("An error occured while uploading the file: ", e);

      return;
    }
  };

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="text-gray-50 text-lg text-left cursor-pointer"
        >
          {label}
        </label>
      )}

      <div className="flex flex-col relative border border-green-800 rounded-lg w-full px-6 py-4 gap-y-3 items-center">
        {value?.name ? (
          <div className="flex flex-row gap-x-2.5">
            <span className="btn btn-xs btn-secondary my-auto select-none">
              IPFS
            </span>
            <span className="text-gray-50 break-all my-auto">{value.cid}</span>
          </div>
        ) : (
          <>
            <label
              htmlFor={name}
              className="items-center border border-green-800 rounded-lg p-2.5 max-w-10 max-h-10 cursor-pointer"
            >
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-300"
              >
                <path
                  d="M6.66675 12.3333L10.0001 9M10.0001 9L13.3334 12.3333M10.0001 9V16.5M16.6667 12.9524C17.6847 12.1117 18.3334 10.8399 18.3334 9.41667C18.3334 6.88536 16.2814 4.83333 13.7501 4.83333C13.568 4.83333 13.3976 4.73833 13.3052 4.58145C12.2185 2.73736 10.2121 1.5 7.91675 1.5C4.46497 1.5 1.66675 4.29822 1.66675 7.75C1.66675 9.47175 2.36295 11.0309 3.48921 12.1613"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>

            <label htmlFor={name} className="cursor-pointer">
              <span className="text-green-300">Click to upload</span>
              &nbsp;
              <span className="text-gray-400">or drag and drop</span>
            </label>

            <input
              type="file"
              id={name}
              name={name}
              value={value?.name ?? ""}
              placeholder={placeholder}
              onChange={async (e) => {
                const fileInfo = await uploadFile(e.target.files?.[0]);

                return await handleOnChange(fileInfo);
              }}
              className="sr-only"
            />
          </>
        )}
      </div>
    </>
  );
}
