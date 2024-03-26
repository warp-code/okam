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
import { Category, Dataset, DatasetCategory, OkamFile } from "@/app/types";

export default function Create() {
  const { push } = useRouter();
  const { address } = useAccount();

  const handleSubmit = async (e: any) => {
    const dataset = {
      name: e.name,
      cover_image: e.coverImage,
      description: e.description,
      file_cid: e.file.cid,
      author: address,
      quadratic_param: 3,
      linear_param: 2,
      constant_param: 1,
    } as Dataset;

    const { data: datasetData, error: datasetError } = await create<Dataset>(
      "datasets",
      [dataset]
    );

    if (datasetError) {
      console.error(datasetError);
      return;
    }

    const categories = e.categories
      .filter((x: any) => x.checked)
      .map((x: any) => x.id);

    const datasetCategories = categories.map((x: number) => {
      return {
        dataset_id: datasetData[0].id,
        category_id: x,
      };
    });

    const { data: datasetCategoriesData, error: datasetCategoriesError } =
      await create<DatasetCategory>("dataset_categories", datasetCategories);

    if (datasetCategoriesError) {
      console.error(datasetCategoriesError);
      return;
    }

    push(`/details/${datasetData[0].id}`);
  };

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await getAll<Category>("categories");

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
        name: null,
        mimeType: null,
        cid: null,
      } as OkamFile,
      description: "",
      categories: categoriesQuery.isFetching
        ? []
        : categoriesQuery.data?.map((x) => {
            return { id: x.id, text: x.text, checked: false };
          }),
      file: {
        name: null,
        mimeType: null,
        cid: "",
      } as OkamFile,
    },
    onSubmit: (e) => handleSubmit(e.value),
  });

  return (
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
            handleOnChange={(file: OkamFile) => field.handleChange(file)}
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
          {(field) =>
            field.state.value?.map((category, i) => (
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
            ))
          }
        </form.Field>
      </div>

      <form.Field name="file">
        {(field) => (
          <FileUploader
            label="File"
            name={field.name}
            value={field.state.value}
            handleOnChange={(file: OkamFile) => field.handleChange(file)}
            handleClear={() =>
              field.setValue({
                name: null,
                cid: null,
                mimeType: null,
              } as OkamFile)
            }
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
  );
}
