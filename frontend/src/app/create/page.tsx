"use client";

import CategoryCheckbox from "@/app/_components/CategoryCheckbox";
import TextInput from "@/app/_components/TextInput";
import TextareaInput from "@/app/_components/TextareaInput";
import ImageUploader from "@/app/_components/ImageUploader";
import FileUploader from "@/app/_components/FileUploader";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { create, getAll } from "@/app/actions";
import { Category, CreateModel, Dataset, OkamFile } from "@/app/types";
import { useLayoutEffect } from "react";
import LoadingIndicator from "@/app/_components/LoadingIndicator";

export default function Create() {
  const { push } = useRouter();
  const { address, isDisconnected } = useAccount();

  useLayoutEffect(() => {
    if (isDisconnected) {
      push("/");
    }
  }, [isDisconnected, push]);

  const createDataset = async (model: CreateModel) => {
    const dataset = {
      name: model.name,
      cover_image: model.coverImage,
      description: model.description,
      file_cid: model.file.cid,
      author: address,
      quadratic_param: 3,
      linear_param: 2,
      constant_param: 1,
      categories: model.categories
        .filter((category) => category.checked)
        .map((category) => category.id),
    } as Dataset;

    const { data, error } = await create<Dataset>("datasets", [dataset]);

    if (error) {
      console.error(error);
      return;
    }

    push(`/details/${data[0].id}`);
  };

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async (query) => {
      if (!query.queryKey.length) return;

      const { data, error } = await getAll<Category>(query.queryKey[0]);

      if (error) {
        console.error(error);

        return [];
      }

      return data;
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      coverImage: {
        name: "",
        mimeType: "",
        cid: "",
      },
      description: "",
      categories: categoriesQuery.isLoading
        ? []
        : categoriesQuery.data?.map((category) => {
            return {
              id: category.id,
              text: category.text,
              checked: false,
            };
          }),
      file: {
        name: "",
        mimeType: "",
        cid: "",
      },
    } as CreateModel,
    onSubmit: (event) => createDataset(event.value),
  });

  return (
    <div className="max-w-192 flex flex-col mx-auto">
      {categoriesQuery.isLoading ? (
        <div className="min-w-full text-center">
          <div className="h-24 w-24 mx-auto mt-40">
            <LoadingIndicator />
          </div>
        </div>
      ) : (
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

          <form.Field
            name="name"
            validators={{
              onChange: ({ value: name }) =>
                !name.length ? "Name is required." : undefined,
            }}
          >
            {(field) => (
              <TextInput
                label="Name"
                name={field.name}
                value={field.state.value}
                handleOnChange={(event) =>
                  field.handleChange(event.target.value)
                }
                errors={field.state.meta.errors}
              />
            )}
          </form.Field>

          <form.Field
            name="coverImage"
            validators={{
              onChange: ({ value: coverImage }) =>
                !coverImage.cid.length ? "Cover image is required." : undefined,
            }}
          >
            {(field) => (
              <ImageUploader
                label="Cover image"
                name={field.name}
                value={field.state.value}
                handleOnChange={(file: OkamFile) => field.handleChange(file)}
                errors={field.state.meta.errors}
              />
            )}
          </form.Field>

          <form.Field
            name="description"
            validators={{
              onChange: ({ value: description }) =>
                !description.length ? "Description is required." : undefined,
            }}
          >
            {(field) => (
              <TextareaInput
                label="Description"
                name={field.name}
                value={field.state.value}
                handleOnChange={(event) =>
                  field.handleChange(event.target.value)
                }
                errors={field.state.meta.errors}
              />
            )}
          </form.Field>

          <h4 className="text-gray-50 text-lg text-left">Tags</h4>

          <div className="flex flex-col gap-y-6 min-w-full">
            <form.Field
              name="categories"
              mode="array"
              validators={{
                onChange: ({ value: categories }) =>
                  !categories.some((category) => category.checked)
                    ? "At least one category is required"
                    : undefined,
              }}
            >
              {(field) => (
                <>
                  <div className="flex flex-row flex-wrap pt-4 gap-3">
                    {field.state.value?.map((category, i) => (
                      <form.Field key={i} name={`categories[${i}].checked`}>
                        {(subField) => {
                          return (
                            <CategoryCheckbox
                              name={subField.name}
                              label={category.text}
                              value={subField.state.value}
                              handleOnChange={(event) => {
                                subField.handleChange(event.target.checked);
                                field.handleChange(field.state.value);
                              }}
                            />
                          );
                        }}
                      </form.Field>
                    ))}
                  </div>

                  {(field.state.meta.errors?.length as number) > 0 && (
                    <div className="text-left text-gray-400 text-sm">
                      {field.state.meta.errors.join(" ")}
                    </div>
                  )}
                </>
              )}
            </form.Field>
          </div>

          <form.Field
            name="file"
            validators={{
              onChange: ({ value: file }) =>
                !file.cid.length ? "File is required." : undefined,
            }}
          >
            {(field) => (
              <FileUploader
                label="File"
                name={field.name}
                value={field.state.value}
                handleOnChange={(file: OkamFile) => field.handleChange(file)}
                handleClear={() =>
                  field.setValue({
                    name: "",
                    cid: "",
                    mimeType: "",
                  } as OkamFile)
                }
                errors={field.state.meta.errors}
              />
            )}
          </form.Field>

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
            </form.Subscribe>
          </div>
        </form>
      )}
    </div>
  );
}
