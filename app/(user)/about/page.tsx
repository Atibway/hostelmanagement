import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BedDouble, Globe, Users, ThumbsUp } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container dark:bg-primary-foreground mx-auto px-4 py-8">
      <h1 className="text-4xl dark:text-white font-bold text-center mb-8">About HostelWorld</h1>
      
      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h2 className="text-2xl dark:text-white font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            HostelWorld was founded in 2023 with a simple mission: to connect travelers with unique and affordable accommodations around the globe. We believe that travel should be accessible to everyone, and that the best experiences often come from stepping out of your comfort zone and meeting new people.
          </p>
          <p className="text-gray-600 mb-4">
            What started as a small platform has grown into a worldwide community of travelers and hostel owners, all united by the love of adventure and cultural exchange.
          </p>
        </div>
        <div className="relative h-64 md:h-full">
          <Image
            src="https://www.ugabox.com/images/business/directory/Hostels/Hostels-kampala-uganda-ugabox-uganda-business-directory-online-services.jpeg"
            alt="Travelers in a hostel"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>

      <h2 className="text-2xl dark:text-white font-semibold text-center mb-8">Why Choose HostelWorld?</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { icon: BedDouble, title: "Wide Selection", description: "Thousands of hostels in hundreds of destinations" },
          { icon: Globe, title: "Global Community", description: "Connect with travelers from all over the world" },
          { icon: Users, title: "Social Experience", description: "Make new friends and create lasting memories" },
          { icon: ThumbsUp, title: "Verified Reviews", description: "Real reviews from real travelers" },
        ].map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <feature.icon className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-100  dark:bg-gray-800 rounded-lg p-8 mb-12">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-4">
          At HostelWorld, we&apos;re on a mission to make travel more accessible, social, and enriching. We believe that by connecting travelers with unique accommodations and fostering a global community, we can break down barriers and promote cross-cultural understanding.
        </p>
        <p className="text-gray-600">
          Whether you&apos;re a solo backpacker, a group of friends on an adventure, or a family looking for an affordable getaway, HostelWorld is here to help you find the perfect place to stay and create unforgettable memories.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-2xl dark:text-white font-semibold mb-4">Ready to Start Your Adventure?</h2>
        <Button asChild size="lg">
          <Link href="/hostels">Find Your Perfect Hostel</Link>
        </Button>
      </div>
    </div>
  )
}

