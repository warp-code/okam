"use client";

import CategoryCheckbox from "@/app/_components/CategoryCheckbox";
import TextInput from "@/app/_components/TextInput";
import TextareaInput from "@/app/_components/TextareaInput";
import ImageUploader from "@/app/_components/ImageUploader";
import { categories } from "@/app/_examples/categories";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function CreateDatasetForm({
  nftStorageApiKey,
}: {
  nftStorageApiKey: string;
}) {
  const { push } = useRouter();

  const handleSubmit = (e: any) => {
    console.log(e);
    console.log(nftStorageApiKey);
  };

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => categories,
  });

  const form = useForm({
    defaultValues: {
      name: "",
      coverImage: {
        name: null,
        mimeType: null,
        cid: null,
      } as { name: string | null; mimeType: string | null; cid: string | null },
      description: "",
      categories: categoriesQuery.isFetching
        ? []
        : (categoriesQuery.data?.map((x) => {
            return { id: x.id, text: x.text, checked: false };
          }) as Array<{ id: number; text: string; checked: boolean }>),
      files: [],
    },
    onSubmit: (e) => handleSubmit(e),
  });

  return (
    <div className="h-full max-w-192 flex flex-col mx-auto">
      <form
        className="flex flex-col min-w-full text-center gap-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          void form.handleSubmit();
        }}
      >
        <h2 className="text-gray-50 font-semibold text-3xl/9.5 pb-6 text-left">
          Create dataset
        </h2>

        <form.Field name="name">
          {(field) => (
            <TextInput
              label="Name"
              name={field.name}
              value={field.state.value}
              handleOnChange={(event) => field.handleChange(event.target.value)}
            />
          )}
        </form.Field>

        <form.Field name="coverImage">
          {(field) => (
            <ImageUploader
              label="Cover image"
              name={field.name}
              value={field.state.value}
              nftStorageApiKey={nftStorageApiKey}
              handleOnChange={(event: any) => field.handleChange(event)}
            />
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <TextareaInput
              label="Description"
              name={field.name}
              value={field.state.value}
              handleOnChange={(event) => field.handleChange(event.target.value)}
            />
          )}
        </form.Field>

        <h4 className="text-gray-50 text-lg text-left">Tags</h4>

        <div className="flex flex-row flex-wrap py-4 gap-3">
          <form.Field name="categories" mode="array">
            {(field) => {
              return field.state.value.map((category, i) => {
                return (
                  <form.Field key={i} name={`categories[${i}].checked`}>
                    {(subField) => {
                      return (
                        <CategoryCheckbox
                          name={subField.name}
                          label={category.text}
                          value={subField.state.value}
                          handleOnChange={(event) =>
                            subField.handleChange(event.target.checked)
                          }
                        />
                      );
                    }}
                  </form.Field>
                );
              });
            }}
          </form.Field>
        </div>

        <h4 className="text-gray-50 text-lg text-left">Files</h4>

        {/* <Uploader id="file" /> */}

        <div className="flex flex-col gap-6">
          <div className="flex flex-row  justify-between">
            <div className="flex flex-row gap-x-2.5">
              <span className="btn btn-xs btn-secondary my-auto select-none">
                IPFS
              </span>
              <span className="text-gray-50 break-all my-auto">
                QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
              </span>
            </div>

            <button type="button" className="text-gray-400 text-sm">
              Delete
            </button>
          </div>

          <div className="flex flex-row  justify-between">
            <div className="flex flex-row gap-x-2.5">
              <span className="btn btn-xs btn-secondary my-auto select-none">
                IPFS
              </span>
              <span className="text-gray-50 break-all my-auto">
                QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR
              </span>
            </div>

            <button type="button" className="text-gray-400 text-sm">
              Delete
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-x-2.5 py-2.5">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => push("/")}
          >
            Cancel
          </button>

          <form.Subscribe>
            {(formState) => (
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                disabled={!formState.canSubmit}
              >
                Create
              </button>
            )}
            {/* <button
              type="submit"
              className="btn btn-sm btn-primary"
              disabled={!canSubmit}
            >
              Create
            </button> */}
          </form.Subscribe>

          {/* <button type="submit" className="btn btn-sm btn-primary">
            Create
          </button> */}
        </div>
      </form>
    </div>
  );
}
