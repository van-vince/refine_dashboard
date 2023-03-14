import express from "express";

import {
    createCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerDetail,
    updateCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.route("/").get(getAllCustomers);
router.route("/:id").get(getCustomerDetail);
router.route("/").post(createCustomer);
router.route("/:id").patch(updateCustomer);
router.route("/:id").delete(deleteCustomer);

export default router;