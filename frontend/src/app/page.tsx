"use client";

import Card from "@/app/_components/Card";
import CategoryCheckbox from "@/app/_components/CategoryCheckbox";
import LoadingIndicator from "@/app/_components/LoadingIndicator";
import Pagination from "@/app/_components/Pagination";
import TextInput from "@/app/_components/TextInput";
import { categories } from "@/app/_examples/categories";
import { datasets } from "@/app/_examples/datasets";
import { useForm } from "@tanstack/react-form";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const handleSubmit = (e: any) => {
    // console.log(e);
    return e;
  };

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => categories,
  });

  const form = useForm({
    defaultValues: {
      search: "",
      categories: categoriesQuery.isFetching
        ? []
        : (categoriesQuery.data?.map((x) => {
            return { id: x.id, text: x.text, checked: false };
          }) as Array<{ id: number; text: string; checked: boolean }>),
    },
    onSubmit: (e) => handleSubmit(e.value),
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

  const [page, setPage] = useState(1);
  const [resultsLength, setResultsLength] = useState(0);

  const datasetQuery = useQuery({
    queryKey: ["datasets", form.state.values, page],
    queryFn: () => {
      const params = form.state.values;

      let datasetsToReturn = datasets;

      if (params.search) {
        datasetsToReturn = datasetsToReturn.filter((x) =>
          x.title.includes(params.search)
        );
      }

      if (params.categories.some((x) => x.checked)) {
        const ids = params.categories.filter((x) => x.checked).map((x) => x.id);

        datasetsToReturn = datasetsToReturn.filter((x) =>
          x.categories.some((y) => ids.includes(y))
        );
      }

      const x = selectDatasets(datasetsToReturn, page);

      return x;
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="h-full max-w-270 flex flex-col gap-y-12 mx-auto">
      <div className="min-w-full text-center">
        {categoriesQuery.isFetching ? (
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
            </form>

            <div className="flex flex-row flex-wrap py-8 sm:gap-3 gap-y-3">
              {datasetQuery.isFetching ? (
                <div className="h-24 w-24 mx-auto mt-40">
                  <LoadingIndicator />
                </div>
              ) : (
                datasetQuery.data?.map((dataset) => {
                  return (
                    <Card
                      key={dataset.id}
                      id={dataset.id}
                      image={dataset.image}
                      title={dataset.title}
                      description={dataset.description}
                      buyPrice={dataset.buyPrice}
                    />
                  );
                })
              )}
            </div>

            <div className="py-8">
              <Pagination elementsNum={90} setPage={setPage} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
