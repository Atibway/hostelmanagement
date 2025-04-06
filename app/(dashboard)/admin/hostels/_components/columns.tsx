"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type HostelColumn = {
  id: string;
  name: string;
  price: number;
  location: string;
  createdAt: string;
};

export const columns: ColumnDef<HostelColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellActions data={row.original } />
  }


];
