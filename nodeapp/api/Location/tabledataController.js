import ResObject from "../../util/ResObject.js";
import tabledataService from "./tabledataService.js";
import express from "express";

const router = express.Router();

router.post('/FinanceData', dataCreate);
router.get('/getFinanceData', dataGet);
router.delete('/deleteFinanceData', dataDelete);
router.get('/getAllLocations', getAllLocation)

function dataCreate(req, res, next) {
    const body = req.body ?? {};
    tabledataService.createData(body)
        .then(obj => new ResObject(res, obj))
        .catch(next);
}

function dataGet(req, res, next) {
    const id = req.query._id ?? {};
    tabledataService.getCreatedData(id)
        .then(obj => new ResObject(res, obj))
        .catch(next);
};

function getAllLocation (req, res, next){
    tabledataService.getAllLoc()
    .then(obj=>new ResObject(res, obj))
    .catch(next)
}

function dataDelete(req, res, next) {
    const id = req.query.locaitonId ?? {};
    tabledataService.deleteCreatedData(id)
        .then(obj => new ResObject(res, obj))
        .catch(next);
}

export default router;
