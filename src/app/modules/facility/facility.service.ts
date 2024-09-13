import { TFacility } from './facility.interface'
import { Facility } from './facility.model'

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload)
  return result
}

const updateFacilityFromDB = async (id: string, payload: TFacility) => {
  // updating data
  await Facility.findByIdAndUpdate(id, payload)

  // showing updated data
  const facility = await Facility.findById(id)
  return facility
}
const deleteFacilityFromDB = async (id: string) => {
  // soft deleting data
  await Facility.findByIdAndUpdate(id, { isDeleted: true })

  // showing updated data
  const facility = await Facility.findById(id)
  return facility
}
const getAllFacilityFromDB = async () => {
  // getting all facility data except deleted one
  const result = await Facility.find({ isDeleted: { $ne: true } })
  return result
}

export const FacilityService = {
  createFacilityIntoDB,
  updateFacilityFromDB,
  deleteFacilityFromDB,
  getAllFacilityFromDB,
}
