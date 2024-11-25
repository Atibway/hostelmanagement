"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BookingsColumn = {
  id: string;
  name: string;
  price: number;
  location: string;
  startDate: string;
  endDate: string;
  telNumber: string;
  guests: number;
};

export const columns: ColumnDef<BookingsColumn>[] = [
  {
    accessorKey: "name",
    header: "Hostel Name",
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
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "telNumber",
    header: "Tel Number",
  },
  {
    accessorKey: "guests",
    header: "Guests",
  }

];
