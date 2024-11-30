export interface Column {
  key: string;
  label: string;
}

export interface Next_form_table_props<T> {
  columns: Column[];
  rows: T[];
  renderCell: (row: T, columnKey: string) => React.ReactNode; // Add renderCell prop
  topContent?: React.ReactNode; 
  footercontent?:React.ReactNode; 
}
