import express from "express";

import {
    createWarehouse,
    deleteWarehouse,
    getAllWarehouses,
    getWarehouseDetail,
    updateWarehouse,
} from "../controllers/warehouseController.js";

const router = express.Router();

router.route("/").get(getAllWarehouses);
router.route("/:id").get(getWarehouseDetail);
router.route("/").post(createWarehouse);
router.route("/:id").patch(updateWarehouse);
router.route("/:id").delete(deleteWarehouse);

export default router;