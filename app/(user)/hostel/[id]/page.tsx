import { db } from "@/lib/db"
import HostelDetails from "./_components/hostel-details"
import { getUserBookingsByHostelId } from "@/actions/bookingActions"


const HostelBookingPage = async (
  props:{
    params: Promise<{id:string}>
  }
) => {
  const params = await props.params;

  const hostel = await db.hostel.findUnique({
    where:{
      id: params.id
    },
    include: { images: true, amenities: true },
  })
  const HostelBookedByUser = await getUserBookingsByHostelId({hostelId:hostel?.id})
  const HostelBookedByUserId =  HostelBookedByUser.bookings?.hostelId
  return (
    <HostelDetails
    HostelBookedByUserId={HostelBookedByUserId}
    hostelData={hostel!}
    />
  )
}

export default HostelBookingPage