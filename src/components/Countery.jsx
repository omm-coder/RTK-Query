import React from "react";

function Country({ country }) {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="h-48 w-full overflow-hidden bg-gray-100">
        <img
          className="h-full w-full object-cover"
          src={country.flag?.url_svg || ""}  
          alt={country.names?.common || "Country"}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 px-6 py-5">
        <h2 className="mb-1 text-2xl font-bold text-gray-900">
          {country.names.common}
        </h2>

        <p className="font-semibold text-gray-700">
          Population:{" "}
          <span className="font-normal text-gray-500">
            {Number(country.population || 0).toLocaleString()}
          </span>
        </p>

        <p className="font-semibold text-gray-700">
          Region:{" "}
          <span className="font-normal text-gray-500">{country.region}</span>
        </p>

        <p className="font-semibold text-gray-700">
          Capital:{" "}
          <span className="font-normal text-gray-500">
            {country.capitals?.[0]?.name || "No capital"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Country;
