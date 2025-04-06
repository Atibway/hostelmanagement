
import { db } from '@/lib/db'
import { format } from 'date-fns'
import { UsersColumn } from './_components/columns'
import UsersClient from './_components/Client'

const page = async() => {
    const bookings = await db.user.findMany()

      const formattedUsers: UsersColumn[] = bookings.map((item) => ({
 id: item.id,
 name: item.name,
 role: item.role,
 email: item.email,
 createdAt: format(item.updatedAt, "MMMM do, yyyy")
}))
  return (
   
    <div className='flex-col'>
    <div className='flex-1 space-y-4 p-6 '>
    <UsersClient
    data={formattedUsers}
    />
</div>
</div>
  )
}

export default page