"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CheckCheck, X } from "lucide-react";

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
  username: string;
  isPaid: boolean;
};

export const columns: ColumnDef<BookingsColumn>[] = [
  {
    accessorKey: "name",
    header: "Hostel Name",
  },
  {
    accessorKey: "username",
    header: "User Name",
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
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
     cell:({row})=> {
          
          return(
            <div>
            {row.getValue("isPaid") ? (
              <CheckCheck className="text-green-700"/>
            ) : (
              <X className="text-red-700"/>
            )}
            </div>
          )
        }
  },

];
