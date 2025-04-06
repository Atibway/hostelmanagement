
import Heading from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { BookingsColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

interface ProductClientProps {
data: BookingsColumn[]
}

export const BookingsClient: React.FC<ProductClientProps> = ({
    data
}) => {

  return (
    <>
          <div className='flex items-center justify-between'>
              <Heading
                  title={`Bookings (${data.length})`}
                  description='All  Bookings'
              />

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


