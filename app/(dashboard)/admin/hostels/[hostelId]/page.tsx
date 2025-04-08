import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import UpdateHostelForm from './_components/UpdateHostelForm'

export default async function EditHostelPage(props: { params: Promise<{ hostelId: string }> }) {
  const params = await props.params;

  const hostel = await db.hostel.findUnique({
    where: { id: params.hostelId },
    include: { amenities: true, images: true }
  })

  if (!hostel) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Hostel: {hostel.name}</h1>
      <UpdateHostelForm hostel={hostel} />
    </div>
  )
}

