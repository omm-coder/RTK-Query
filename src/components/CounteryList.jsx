import { FaSearch } from "react-icons/fa";
import { useGetCountriesQuery } from "../services/countryApi";
import { useState } from "react";
import Country from "./Countery";

function CountryList() {
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { currentData, error, isLoading, isFetching } = useGetCountriesQuery({
    page,
    limit,
    search,
    region: selectedValue,
  });

  const countries = currentData?.data?.objects ?? [];
  const more = currentData?.data?.meta?.more ?? false;

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-8 sm:px-8">
      {isLoading ? (
        <h1 className="py-20 text-center text-3xl font-light text-gray-500">
          Loading countries...
        </h1>
      ) : error ? (
        <h1 className="my-10 text-center text-xl font-medium text-red-600">
          Failed to load countries.
        </h1>
      ) : (
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore Countries
            </h1>
            <p className="mt-2 text-gray-500">
              Discover countries around the world.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-base outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search for a country..."
              />
            </div>

            <div className="w-full sm:w-56">
              <select
                value={selectedValue}
                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                onChange={(e) => {
                  setSelectedValue(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All regions</option>
                <option value="africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="asia">Asia</option>
                <option value="antarctic">Antarctica</option>
                <option value="oceania">Oceania</option>
                <option value="europe">Europe</option>
              </select>
            </div>
          </div>

          {/* Country Grid */}
          {isFetching && !currentData ? (
            <div className="mb-8 flex min-h-[50vh] w-full items-center justify-center">
              <h1 className="text-center text-2xl font-light text-gray-500">
                Fetching countries...
              </h1>
            </div>
          ) : (
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {countries.length > 0 ? (
                countries.map((country) => (
                  <Country key={country.uuid} country={country} />
                ))
              ) : (
                <h2 className="col-span-full py-16 text-center text-xl font-medium text-gray-500">
                  No countries found.
                </h2>
              )}
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row">
            <p className="text-sm text-gray-500">
              Page <span className="font-semibold text-gray-900">{page}</span>
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
                className="rounded-xl border border-gray-200 px-5 py-2.5 font-medium text-gray-700 transition hover:border-blue-500 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-white"
              >
                Previous
              </button>

              <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-blue-600 px-3 font-semibold text-white">
                {page}
              </span>

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!more}
                className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CountryList;
