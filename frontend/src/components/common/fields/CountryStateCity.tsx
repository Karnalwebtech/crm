// import React from "react";
// import { City, Country, State } from "country-state-city";
// import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
// import { Controller, Control, FieldValues, FieldErrors, Path } from "react-hook-form";
// import { SearchIcon } from "lucide-react";

// interface CountryStateCityProps<T extends FieldValues> {
//     control: Control<T>;
//     errors: FieldErrors<T>;
//     name_country: Path<T>; // Ensure name is a valid path in T
//     name_city: Path<T>; // Ensure name is a valid path in T
//     name_state: Path<T>; // Ensure name is a valid path in T
//     label_country: string; // Label for the select field
//     label_state: string; // Label for the select field
//     label_city: string; // Label for the select field
// }

// const CountryStateCity = <T extends FieldValues>({
//     control,
//     name_country,
//     label_country,
//     errors, name_state, name_city, label_state, label_city
// }: CountryStateCityProps<T>) => {
//     const country_data = Country.getAllCountries();
//     const city_data = City.getCitiesOfState("IN", "HR")
//     const state_data = State.getStatesOfCountry('IN');
//     const country_hasError = !!errors[name_country];
//     const city_hasError = !!errors[name_city];
//     const state_hasError = !!errors[name_state];

//     return (
//         <>
//             <div>
//                 <Controller
//                     control={control}
//                     name={name_country}
//                     render={({ field }) => (
//                         <>
//                             <Autocomplete
//                                 {...field} // Spread field props
//                                 value={field.value}
//                                 onSelectionChange={field.onChange}
//                                 defaultItems={country_data}
//                                 aria-label={label_country}
//                                 placeholder={label_country}
//                                  defaultSelectedKey={country_data}
//                                 popoverProps={{
//                                     offset: 10,
//                                     classNames: {
//                                         base: "rounded-large",
//                                         content: "p-1 border-small border-default-100 text-red dark:bg-black",
//                                     },
//                                 }}
//                                 startContent={<SearchIcon className="text-default-400 dark:text-dark_color" strokeWidth={2.5} size={20} />}
//                                 variant="bordered"
//                             >
//                                 {country_data.map((item) => (
//                                     <AutocompleteItem key={item.name} textValue={item.name}>
//                                         {item.name}
//                                     </AutocompleteItem>
//                                 ))}
//                             </Autocomplete>

//                             {country_hasError && (
//                                 <span className="text-red-500 text-sm mt-1">
//                                     {errors[name_country]?.message?.toString()}
//                                 </span>
//                             )}
//                         </>
//                     )}
//                 />
//             </div>
//             <div>
//                 <Controller
//                     control={control}
//                     name={name_state}
//                     render={({ field }) => (
//                         <>
//                             <Autocomplete
//                                 {...field} // Spread field props
//                                 value={field.value}
//                                 onSelectionChange={field.onChange}
//                                 defaultItems={state_data || ""}
//                                 aria-label={label_state}
//                                 placeholder={label_state}
//                                 popoverProps={{
//                                     offset: 10,
//                                     classNames: {
//                                         base: "rounded-large",
//                                         content: "p-1 border-small border-default-100 text-red dark:bg-black",
//                                     },
//                                 }}
//                                 startContent={<SearchIcon className="text-default-400 dark:text-dark_color" strokeWidth={2.5} size={20} />}
//                                 variant="bordered"
//                             >
//                                 {state_data.map((item) => (
//                                     <AutocompleteItem key={item.name} textValue={item.name}>
//                                         {item.name}
//                                     </AutocompleteItem>
//                                 ))}
//                             </Autocomplete>

//                             {state_hasError && (
//                                 <span className="text-red-500 text-sm mt-1">
//                                     {errors[name_state]?.message?.toString()}
//                                 </span>
//                             )}
//                         </>
//                     )}
//                 />
//             </div>
//             <div>
//                 <Controller
//                     control={control}
//                     name={name_city}
//                     render={({ field }) => (
//                         <>
//                             <Autocomplete
//                                 {...field} // Spread field props
//                                 value={field.value}
//                                 onSelectionChange={field.onChange}
//                                 defaultItems={city_data || ""}
//                                 aria-label={label_city}
//                                 placeholder={label_city}
//                                 popoverProps={{
//                                     offset: 10,
//                                     classNames: {
//                                         base: "rounded-large",
//                                         content: "p-1 border-small border-default-100 text-red dark:bg-black",
//                                     },
//                                 }}
//                                 startContent={<SearchIcon className="text-default-400 dark:text-dark_color" strokeWidth={2.5} size={20} />}
//                                 variant="bordered"
//                             >
//                                 {city_data.map((item) => (
//                                     <AutocompleteItem key={item.name} textValue={item.name}>
//                                         {item.name}
//                                     </AutocompleteItem>
//                                 ))}
//                             </Autocomplete>

//                             {city_hasError && (
//                                 <span className="text-red-500 text-sm mt-1">
//                                     {errors[name_city]?.message?.toString()}
//                                 </span>
//                             )}
//                         </>
//                     )}
//                 />
//             </div>
//         </>
//     );
// };

// export default CountryStateCity;
