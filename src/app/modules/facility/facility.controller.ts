import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { FacilityService } from './facility.service'

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.createFacilityIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility added successfully',
    data: result,
  })
})
const updateFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.updateFacilityFromDB(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility updated successfully',
    data: result,
  })
})
const deleteFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.deleteFacilityFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility deleted successfully',
    data: result,
  })
})
const getAllFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.getAllFacilityFromDB(req.query)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facilities retrieved successfully',
    data: result,
  })
})

const getSingleFAcility = catchAsync(async(req, res) => {
  const result = await FacilityService.getSingleFacilityFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility data retrieved successfully',
    data: result,
  })
})

export const FacilityController = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
  getSingleFAcility
}
