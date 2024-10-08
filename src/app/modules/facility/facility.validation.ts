import z from 'zod'

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Facility name is required',
      invalid_type_error: 'Facility name is invalid',
    }),
    image: z.string({
      required_error: 'Facility image is required',
      invalid_type_error: 'Facility image is invalid',
    }),
    description: z.string({
      required_error: 'Facility description is required',
      invalid_type_error: 'Facility description is invalid',
    }),
    pricePerHour: z.number({
      required_error: 'Facility price per hour is required',
      invalid_type_error: 'Facility price per hour is invalid',
    }),
    location: z.string({
      required_error: 'Facility location is required',
      invalid_type_error: 'Facility location is invalid',
    }),
  }),
})
const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Facility name is invalid',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Facility description is invalid',
      })
      .optional(),
    pricePerHour: z
      .number({
        invalid_type_error: 'Facility price per hour is invalid',
      })
      .optional(),
    location: z
      .string({
        invalid_type_error: 'Facility location is invalid',
      })
      .optional(),
  }),
})

export const FacilityValidation = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
}
