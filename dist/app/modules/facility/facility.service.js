"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityService = void 0;
const facility_model_1 = require("./facility.model");
const createFacilityIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.create(payload);
    return result;
});
const updateFacilityFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // updating data
    yield facility_model_1.Facility.findByIdAndUpdate(id, payload);
    // showing updated data
    const facility = yield facility_model_1.Facility.findById(id);
    return facility;
});
const deleteFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // soft deleting data
    yield facility_model_1.Facility.findByIdAndUpdate(id, { isDeleted: true });
    // showing updated data
    const facility = yield facility_model_1.Facility.findById(id);
    return facility;
});
const getAllFacilityFromDB = (_a) => __awaiter(void 0, [_a], void 0, function* ({ search = "", minPrice = 0, maxPrice = Infinity }) {
    const query = { isDeleted: { $ne: true } };
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } }
        ];
    }
    if (minPrice || maxPrice) {
        query.pricePerHour = { $gte: minPrice, $lte: maxPrice };
    }
    const result = yield facility_model_1.Facility.find(query);
    return result;
});
const getSingleFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findOne({ _id: id });
    return result;
});
exports.FacilityService = {
    createFacilityIntoDB,
    updateFacilityFromDB,
    deleteFacilityFromDB,
    getAllFacilityFromDB,
    getSingleFacilityFromDB
};
