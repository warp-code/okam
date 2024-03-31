"use client";

import Card from "@/app/_components/Card";
import CategoryCheckbox from "@/app/_components/CategoryCheckbox";
import LoadingIndicator from "@/app/_components/LoadingIndicator";
import TextInput from "@/app/_components/TextInput";
import { getAll } from "@/utils/actions/serverActions";
import { Category, Dataset, DatasetModel, SearchModel } from "@/app/types";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getBuyPrice } from "@/contracts/actions";

export default function Home() {
  const [datasets, setDatasets] = useState<DatasetModel[]>([]);
  const [filteredDatasets, setFilteredDatasets] = useState<DatasetModel[]>([]);

  const filterDatasets = (model: SearchModel) => {
    let datasetsToReturn = datasets;

    if (model.search.length) {
      datasetsToReturn = datasetsToReturn.filter((dataset) =>
        dataset.name.includes(model.search)
      );
    }

    if (model.categories.some((category) => category.checked)) {
      const ids = model.categories
        .filter((category) => category.checked)
        .map((category) => category.id);

      datasetsToReturn = datasetsToReturn.filter((dataset) =>
        dataset.categories.some((id) => ids.includes(id))
      );
    }

    setFilteredDatasets(datasetsToReturn);
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

  const datasetQuery = useQuery({
    queryKey: ["datasets"],
    queryFn: async (query) => {
      if (!query.queryKey.length) return;

      const { data, error } = await getAll<Dataset>(query.queryKey[0]);

      if (error) {
        console.log(error);
        return;
      }

      await Promise.all(
        (data as DatasetModel[]).map(async (datum) => {
          const buyPrice = await getBuyPrice(BigInt(datum.token_id));

          datum.buyPrice = buyPrice;
        })
      );

      setDatasets(data as DatasetModel[]);
      setFilteredDatasets(data as DatasetModel[]);

      return data;
    },
  });

  const form = useForm({
    defaultValues: {
      search: "",
      categories: categoriesQuery.isFetching
        ? []
        : categoriesQuery.data?.map((category) => {
            return {
              id: category.id,
              text: category.text,
              checked: false,
            };
          }),
    } as SearchModel,
    onSubmit: (event) => filterDatasets(event.value),
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
              onChange={(event) => {
                event.persist();
                event.stopPropagation();

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
              {datasetQuery.isFetching ? (
                <div className="h-24 w-24 mx-auto mt-40">
                  <LoadingIndicator />
                </div>
              ) : (
                filteredDatasets.map((dataset) => {
                  return (
                    <Card
                      key={dataset.id}
                      id={dataset.id}
                      image={dataset.cover_image}
                      title={dataset.name}
                      description={dataset.description}
                      buyPrice={dataset.buyPrice}
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
