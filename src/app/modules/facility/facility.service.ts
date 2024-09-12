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
  // updating data
  await Facility.findByIdAndUpdate(id, {isDeleted: true})

  // showing updated data
  const facility = await Facility.findById(id)
  return facility
}

export const FacilityService = {
  createFacilityIntoDB,
  updateFacilityFromDB,
  deleteFacilityFromDB
}
