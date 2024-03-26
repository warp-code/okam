import CreateDatasetForm from "@/app/create/CreateDatasetForm";

export default function Create() {
  const nftStorageApiKey = process.env.NFT_STORAGE_API_KEY;

  return (
    <div className="h-full max-w-192 flex flex-col mx-auto">
      <CreateDatasetForm nftStorageApiKey={nftStorageApiKey} />
    </div>
  );
}
