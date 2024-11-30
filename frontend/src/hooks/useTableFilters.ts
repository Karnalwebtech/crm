import { useState, useMemo } from "react";

type SearchableItem = {
  id: number | string;
  status: string; // Assuming there's a status field in your items
  [key: string]: any;
};

export function useTableFilters<T extends SearchableItem>(
  items: T[],
  searchKeys: (keyof T)[],
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
 
  const filteredItems = useMemo(() => {
    return items?.filter((item) => {
      // Check if the item matches the search term
      const matchesSearch = searchKeys.some((key) =>
        item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Check if the item's status matches the selected statuses
      const matchesStatus =
        statusFilter.length === 0 || // No filter applied
        statusFilter.toString().toLowerCase().includes(item.status.toLowerCase()); // Filter by 'status' field

      // Return true only if both conditions are met
      return matchesSearch && matchesStatus;
    });
  }, [items, searchKeys, searchTerm, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredItems,
  };
}
