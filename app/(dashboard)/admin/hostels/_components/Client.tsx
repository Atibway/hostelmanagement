"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import {  useRouter } from 'next/navigation'
import React from 'react'
import { HostelColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'



interface ProductClientProps {
data: HostelColumn[]
}

const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {
    const router = useRouter()

  return (
    <>
          <div className='flex items-center justify-between'>
              <Heading
                  title={`Hostels (${data.length})`}
                  description='Manage  your Hostels'
              />

              <Button onClick={()=> router.push(`/admin/hostels/create`)}>
                  <Plus className='mr-2 h-4 w-4'/>
                  Add New
              </Button>
          </div>
          <Separator />
          <DataTable
              columns={columns}
              data={data}
              searchKey='name'
          />

    </>
  )
}

export default ProductClient

