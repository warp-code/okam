"use client";

import Card from "@/app/_components/Card";
import CategoryCheckbox from "@/app/_components/CategoryCheckbox";
import LoadingIndicator from "@/app/_components/LoadingIndicator";
import TextInput from "@/app/_components/TextInput";
import { getAll } from "@/app/actions";
import { Category, Dataset, SearchModel } from "@/app/types";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  const filterDatasets = (model: SearchModel) => {
    return model;
  };

  const penis = (query: any, data: any) => {
    // console.log(data);

    const searchParams = query.queryKey[1] as {
      search: string;
      categories: any[];
    };

    let datasetsToReturn = data as Dataset[];
    // console.log(datasetsToReturn);

    if (searchParams.search) {
      datasetsToReturn = datasetsToReturn.filter((x) =>
        x.name.includes(searchParams.search)
      );
    }

    if (searchParams.categories.some((x) => x.checked)) {
      const ids = searchParams.categories
        .filter((x) => x.checked)
        .map((x) => x.id);

      datasetsToReturn = datasetsToReturn.filter((x) =>
        x.categories.some((y) => ids.includes(y))
      );
    }

    console.log(datasetsToReturn);
    return datasetsToReturn;
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
      search: "",
      categories: categoriesQuery.isPending
        ? []
        : categoriesQuery.data?.map((x) => {
            return {
              id: x.id,
              text: x.text,
              checked: false,
            };
          }),
    } as SearchModel,
    onSubmit: (e) => filterDatasets(e.value),
  });

  const selectDatasets = (array: any[], page: number) => {
    // Calculate the starting index of the section
    const startIndex = (page - 1) * 6;

    // Check if the starting index is within the array bounds
    if (startIndex < array.length) {
      // Slice the array to get the section of 6 elements
      return array.slice(startIndex, startIndex + 6);
    } else {
      // If the starting index is out of bounds, return an empty array
      return [];
    }
  };

  const datasetQuery = useQuery({
    queryKey: ["datasets"],
    queryFn: async (query) => {
      if (!query.queryKey.length) return;

      const { data, error } = await getAll<Dataset>("datasets");

      if (error) {
        console.log(error);
        return;
      }

      return data;
    },
  });

  return (
    <div className="h-full max-w-270 flex flex-col gap-y-12 mx-auto">
      <div className="min-w-full text-center">
        {categoriesQuery.isPending ? (
          <div className="h-24 w-24 mx-auto mt-40">
            <LoadingIndicator />
          </div>
        ) : (
          <>
            <h1 className="text-green-400 font-semibold text-4xl/11 pb-6">
              Find ML training data
            </h1>

            <form
              className="min-w-full text-center"
              onChange={(e) => {
                e.persist();
                e.stopPropagation();

                void form.handleSubmit();
              }}
            >
              <form.Field name="search">
                {(field) => (
                  <TextInput
                    name={field.name}
                    value={field.state.value}
                    placeholder="I am searching for..."
                    handleOnChange={(event) =>
                      field.handleChange(event.target.value)
                    }
                  />
                )}
              </form.Field>

              <div className="flex flex-row flex-wrap py-4 gap-3">
                <form.Field name="categories" mode="array">
                  {(field) =>
                    field.state.value.map((category, i) => (
                      <form.Field key={i} name={`categories[${i}].checked`}>
                        {(subField) => (
                          <CategoryCheckbox
                            name={subField.name}
                            label={category.text}
                            value={subField.state.value}
                            handleOnChange={(event) =>
                              subField.handleChange(event.target.checked)
                            }
                          />
                        )}
                      </form.Field>
                    ))
                  }
                </form.Field>
              </div>
            </form>

            <div className="flex flex-row flex-wrap py-8 sm:gap-3 gap-y-3">
              {datasetQuery.isPending ? (
                <div className="h-24 w-24 mx-auto mt-40">
                  <LoadingIndicator />
                </div>
              ) : (
                datasetQuery.data?.map((dataset) => {
                  return (
                    <Card
                      key={dataset?.id}
                      id={dataset?.id}
                      image={dataset.cover_image}
                      title={dataset.name}
                      description={dataset.description}
                      buyPrice={10}
                    />
                  );
                })
              )}
            </div>

            {/* <div className="py-8">
              <Pagination elementsNum={90} setPage={setPage} />
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}
