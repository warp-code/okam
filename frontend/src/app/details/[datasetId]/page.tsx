"use client";

import { useEffect, useState } from "react";
import { Dataset, datasets } from "@/app/_examples/datasets";
import { useParams } from "next/navigation";

export default function Details() {
  const [dataset, setDataset] = useState<Dataset>();
  const params = useParams();

  useEffect(() => {
    const x = datasets.find(
      (x) => x.id === Number.parseInt(params.datasetId as string)
    );

    setDataset(x);
  }, [params.datasetId]);

  return (
    <div className="h-full max-w-270 flex flex-col gap-y-12 mx-auto">
      <div className="min-w-full text-left">
        <h2 className="text-gray-50 font-semibold text-3xl pb-6">
          {dataset?.title}
        </h2>
      </div>
    </div>
  );
}
