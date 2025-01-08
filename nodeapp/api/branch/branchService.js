import mongoose from 'mongoose';
import branchModel from './branchSchema.js';

export default {
    createData,
    getCreatedData,
    deleteCreatedData,
    getAllBr
}

async function createData(body) {
    if (!body) {
        throw new Error('No Data Found');
    }

    const findData = await branchModel.findOne({ locaitonId: body.locaitonId });
    if (!findData) {
        const createRData = new branchModel({
            branchName:body.branchName,
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

async function getCreatedData(locaitonId) {
    try {

        const getData = await branchModel.aggregate([
            { $match: { locaitonId:locaitonId} },
            { $project: {
                branchName:1,
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

async function getAllBr(){
    try {
        const getAll = await branchModel.find({});
        return {message:'success', data:getAll}
    } catch (error) {
        return {message:error.message}
    }
}

async function deleteCreatedData(locaitonId) {
    if (!locaitonId) {
        throw new Error('ID is missing');
    }
    try {
        const deleteData = await branchModel.findOneAndDelete({ locaitonId: locaitonId });
        if (!deleteData) {
            throw new Error('No Data deleted');
        } else {
            return { message: 'Deleted successfully' };
        }
    } catch (error) {
        return { message: error.message };
    }
}
