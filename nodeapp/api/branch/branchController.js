import ResObject from "../../util/ResObject.js";
import express from "express";
import branchService from "./branchService.js";

const router = express.Router();

router.post('/branchData', dataCreate);
router.get('/getBranchData', dataGet);
router.delete('/deleteBranchData', dataDelete);
router.get('/getAllBranch', getAllBranch)

function dataCreate(req, res, next) {
    const body = req.body ?? {};
    branchService.createData(body)
        .then(obj => new ResObject(res, obj))
        .catch(next);
}

function dataGet(req, res, next) {
    const id = req.query.locaitonId ?? null;
    branchService.getCreatedData(id)
        .then(obj => new ResObject(res, obj))
        .catch(next);
};

function getAllBranch(req, res, next){
    branchService.getAllBr()
    .then(obj=> new ResObject(res, obj))
    .catch(next)
}

function dataDelete(req, res, next) {
    const id = req.query._id ?? null;
    branchService.deleteCreatedData(id)
        .then(obj => new ResObject(res, obj))
        .catch(next);
}

export default router;
