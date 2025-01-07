import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const branchSchema = new mongoose.Schema({
    branchName:{
        type:String,
        require:[true,'Locaiton name is required'],
        trim:true
    },
    locaitonId:{
        type:String,
        require:[true, 'Locaiton ID is required'],
        trim:true
    },
    potentialRev: {
        type: String,
        required: [true, 'Potential Revenue is required'],
        trim: true
    }, 
    competitorVolume: {
        type: String,
        required: [true, 'Competitor Processing Volume is required'],
        trim: true
    }, 
    competitorMerchant: {
        type: String,
        required: [true, 'Competitor Merchant is required'],
        trim: true
    },
    revenue_Acc: {
        type: String,
        required: [true, 'Revenue / Account is required'],
        trim: true
    },
    marketShare: {
        type: String,
        required: [true, 'Market share by Revenue is required'],
        trim: true
    },
    commercialDDa: {
        type: String,
        required: [true, 'Commercial DDA is required'],
        trim: true
    }
}, {
    timestamps: true,
    collation: {
        locale: 'en',  
        strength: 1   
    },
    strict: true
});

const branchModel = mongoose.model('branchModel', branchSchema, 'Branch_collection');

export default branchModel;
