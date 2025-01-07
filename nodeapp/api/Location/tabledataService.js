import mongoose from 'mongoose';
import dataModel from './tabledataSchema.js';

export default {
    createData,
    getCreatedData,
    deleteCreatedData,
    getAllLoc
}

async function createData(body) {
    if (!body) {
        throw new Error('No Data Found');
    }

    const findData = await dataModel.findOne({ _id: body._id });
    if (!findData) {
        const createRData = new dataModel({
            locaitonName:body.locaitonName,
            locaitonId:body.locaitonId,
            potentialRev: body.potentialRev,
            competitorVolume: body.competitorVolume,
            competitorMerchant: body.competitorMerchant,
            revenue_Acc: body.revenue_Acc,
            marketShare: body.marketShare,
            commercialDDa: body.commercialDDa
        });

        const createdData = await createRData.save();
        return { message: 'Successfully created', data: createdData };
    } else {
        return { message: 'Data already exists' };
    }
};

async function getCreatedData(id) {
    try {

        const objectID = new mongoose.Types.ObjectId(id)
        const getData = await dataModel.aggregate([
            { $match: { _id: objectID } },
            { $project: {
                locaitonName:1,
                potentialRev: 1,
                competitorVolume: 1,
                competitorMerchant: 1,
                revenue_Acc: 1,
                marketShare: 1,
                commercialDDa: 1
            }}
        ])
        console.log(getData)
        if (getData.length === 0) {
            return { message: "No Data found" };
        }
        return { message: 'Data Fetched', data: getData };
    } catch (error) {
        return { message: error.message };
    }
};

async function getAllLoc(){
    try {
        const getAll = await dataModel.find({});
        return {message:'Success', data:getAll}
    } catch (error) {
        return {message:error.message}
    }
}

async function deleteCreatedData(locaitonId) {
    if (!locaitonId) {
        throw new Error('ID is missing');
    }
    try {
        const deleteData = await dataModel.findOneAndDelete({ locaitonId: locaitonId });
        if (!deleteData) {
            throw new Error('No Data deleted');
        } else {
            return { message: 'Deleted successfully' };
        }
    } catch (error) {
        return { message: error.message };
    }
}
