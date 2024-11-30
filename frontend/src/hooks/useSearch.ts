import { useState, useEffect, useMemo } from 'react'

type SearchableItem = {
  id: number | string
  [key: string]: any
}

export function useSearch<T extends SearchableItem>(
  items: T[],
  searchKeys: (keyof T)[],
  initialSearchTerm: string = ''
) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  const filteredItems = useMemo(() => {
    return items?.filter((item) =>
      searchKeys.some((key) =>
        item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [items, searchKeys, searchTerm])

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  }
}