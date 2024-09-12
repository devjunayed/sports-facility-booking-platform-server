import z from 'zod'

const createVacilityValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Facility name is required',
      invalid_type_error: 'Facility name is invalid',
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

export const FacilityValidation = {
    createVacilityValidationSchema
}
