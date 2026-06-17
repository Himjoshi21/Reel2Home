const express = require("express");
const foodController = require("../controllers/food.controller")
const  authMiddleware = require("../middleware/auth.middleware")

const multer = require("multer");
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 100 * 1024 * 1024 // 100 MB max
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("video/")) {
            return cb(new Error("Only video uploads are allowed"));
        }
        cb(null, true);
    }
});

/*Post /api/food/[protected]*/
router.post('/',authMiddleware.authFoodPartnerMiddleware,upload.single("video"),foodController.createFood);


/*GET /api/food/ */
router.get(
    "/",
    authMiddleware.authAnyMiddleware,
    foodController.getFoodItems
)

router.post('/like', authMiddleware.authUserMiddleware, foodController.likeFood)

router.post('/save', authMiddleware.authUserMiddleware, foodController.saveFood)

router.get('/save', authMiddleware.authUserMiddleware, foodController.getSaveFood)

module.exports = router;
