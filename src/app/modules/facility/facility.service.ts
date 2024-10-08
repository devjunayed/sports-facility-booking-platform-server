/* eslint-disable @typescript-eslint/no-explicit-any */
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
const getAllFacilityFromDB = async ({search = "",  minPrice = 0, maxPrice = Infinity}) => {
  const query: any = { isDeleted: { $ne: true } };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } }
    ];
  }

  

  if (minPrice || maxPrice) {
    query.pricePerHour = { $gte: minPrice, $lte: maxPrice };
  }

  const result = await Facility.find(query);
  return result;
};


const getSingleFacilityFromDB = async(id: string) => {
  const result = await Facility.findOne({_id: id});
  return result;
}

export const FacilityService = {
  createFacilityIntoDB,
  updateFacilityFromDB,
  deleteFacilityFromDB,
  getAllFacilityFromDB,
  getSingleFacilityFromDB
}
