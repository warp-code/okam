"use client";

import { NFTStorage, File, Blob } from "nft.storage";
import { useState } from "react";

export default function NftStorageExample(props: { token: string }) {
  const [file, setFile] = useState<File>();
  const [downloadLink, setDownloadLink] = useState<string>();

  const protocol = "https://nftstorage.link/ipfs/";
  const client = new NFTStorage({ token: props.token });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    try {
      const cid = await client.storeBlob(new Blob([file], { type: file.type }));

      console.log("cid: ", cid);

      setDownloadLink(protocol + cid);
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="Upload" />
      </form>
      {downloadLink && (
        <a
          href={downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          download="something"
        >
          Download
        </a>
      )}
    </>
  );
}
