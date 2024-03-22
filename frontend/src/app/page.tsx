import Card from "@/app/_components/Card";
import Category from "@/app/_components/Category";
import Pagination from "@/app/_components/Pagination";
import SearchBar from "@/app/_components/SearchBar";
import { categories } from "@/app/_examples/categories";
import { datasets } from "@/app/_examples/datasets";

export default function Home() {
  return (
    <div className="h-full max-w-270 flex flex-col gap-y-12 mx-auto">
      <div className="min-w-full text-center">
        <h1 className="text-green-400 font-semibold text-4xl/11 pb-6">
          Find ML training data
        </h1>

        <SearchBar name="search" placeholder="I am searching for..." />

        <div className="flex flex-row flex-wrap py-4 gap-3">
          {categories.map((category) => {
            return <Category key={category.id} name={category.text} />;
          })}
        </div>

        {/* Cards */}
        <div className="flex flex-row flex-wrap py-8 sm:gap-3 gap-y-3">
          {datasets.map((dataset) => {
            return (
              <Card
                key={dataset.id}
                id={dataset.id}
                image={dataset.image}
                title={dataset.title}
                description={dataset.description}
                price={dataset.price}
              />
            );
          })}
        </div>

        {/* Pagination */}
        <div className="py-8">
          <Pagination />
        </div>
      </div>
    </div>
  );
}
