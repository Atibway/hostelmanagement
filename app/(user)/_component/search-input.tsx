
"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);
  const router = useRouter();
  const pathname = usePathname();



  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
console.log("URL",url);

    router.push(url);
  }, [debouncedValue,router, pathname]);

  return (
    <div className="relative w-full">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full pl-9 rounded-full bg-slate-100 focus-visible:ring-sky-200 dark:bg-slate-800 dark:text-white "
        placeholder="Search for a hostel"
      />
    </div>
  );
};
