const express = require("express");
const Controllers = require("../controllers/productController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/src/images/product");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/create", upload.single("image"), Controllers.createProduct); //admin
router.get("/getall", Controllers.getProduct); // user/admin
router.get("/get/:id", Controllers.getOneProduct); // user/admin
router.patch("/update/:id", Controllers.updateProduct); // admin
router.patch("/delete/:id", Controllers.deleteProduct); // admin

router.delete("/data-reset", Controllers.dataResetProduct); // admin

module.exports = router;
