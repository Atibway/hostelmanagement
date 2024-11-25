

import React from 'react'
import ProductForm from './_components/HostelForm'
import { db } from '@/lib/db'
import CreateHostelPage from './_components/HostelForm'

const ProductPage = async() => {


  return (
    <div className='flex-col'>
        
             <CreateHostelPage/>
</div>
    
  )
}

export default ProductPage

