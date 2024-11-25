'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { updateHostel } from '@/actions/update-hostel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'


const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be positive'),
  amenities: z.array(z.object({ name: z.string().min(1, 'Amenity name is required') })),
  images: z.array(z.object({ url: z.string().url('Must be a valid URL') }))
})

type HostelData = {
  name: string;
  location: string;
  description: string;
  price: number;  // Ensure this is typed as `number`
  amenities: { name: string; }[];
  images: { url: string; }[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
}


export default function UpdateHostelForm({ hostel }: { hostel: HostelData }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: hostel.name,
      location: hostel.location,
      description: hostel.description,
      price: hostel.price,
      amenities: hostel.amenities,
      images: hostel.images
    }
  })

  const { fields: amenityFields, append: appendAmenity, remove: removeAmenity } = useFieldArray({
    control: form.control,
    name: 'amenities'
  })

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: 'images'
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('location', values.location)
    formData.append('description', values.description)
    formData.append('price', values.price.toString())
    values.amenities.forEach(amenity => formData.append('amenities', amenity.name))
    values.images.forEach(image => formData.append('images', image.url))

    const result = await updateHostel(hostel.id, formData)

    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Success',
        description: 'Hostel updated successfully!'
      })
      router.push(`/admin/hostels`)
    }
    setIsSubmitting(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hostel Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Night</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Amenities</FormLabel>
              {amenityFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`amenities.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2 mt-2">
                          <Input {...field} />
                          <Button type="button" variant="outline" size="icon" onClick={() => removeAmenity(index)}>
                            -
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendAmenity({ name: '' })}>
                Add Amenity
              </Button>
            </div>
            <div>
              <FormLabel>Images</FormLabel>
              {imageFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`images.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2 mt-2">
                          <Input {...field} />
                          <Button type="button" variant="outline" size="icon" onClick={() => removeImage(index)}>
                            -
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendImage({ url: '' })}>
                Add Image
              </Button>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Hostel'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

