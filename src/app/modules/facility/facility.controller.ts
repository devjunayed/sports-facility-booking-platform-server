import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { FacilityService } from "./facility.service";

const createFacility = catchAsync(async(req, res)=> {
    const result = await FacilityService.createFacilityIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Facility added successfully",
        data: result
    });
})

export const FacilityController = {
    createFacility
}