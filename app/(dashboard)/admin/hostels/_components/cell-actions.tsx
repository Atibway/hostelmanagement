
"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,DropdownMenuLabel, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { HostelColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import {  useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/modals/AlertModel";
import { deleteHostel } from "@/actions/create-hostel";


interface CellActionsProps {
    data: HostelColumn
}

const CellActions: React.FC<CellActionsProps> = ({
    data,
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()


    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Hostel id copied to clipboard")
    }

    const onDelete = async () => {
        try {
          setLoading(true);
         await deleteHostel(data.id)
          router.refresh();
          toast.success("Hostel Deleted");
        } catch (error) {
          toast.error("Something went wrong");
        } finally {
          setLoading(false);
          setOpen(false);
        }
      };

  return (
    <>
    <AlertModal
    isOpen={open}
    onClose={()=> setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    />
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4"/>
</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                  Actions
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={()=> onCopy(data.id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Id
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=> router.push(`/admin/hostels/${data.id}`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=> setOpen(true)}>
                  <Trash className="mr-2 h-4 w-4 text-red-500" />
                  Delete
              </DropdownMenuItem>

          </DropdownMenuContent>
      </DropdownMenu>
    </>

  )
}

export default CellActions

