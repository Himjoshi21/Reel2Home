const foodPartnerModel = require('../models/foodpartner.model');
const foodModel = require('../models/food.model');


async function getFoodPartnerById(req, res) {
    try {
        const foodPartnerId = req.params.id;

        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });

        if (!foodPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }

        res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve food partner" });
    }
}

module.exports={
    getFoodPartnerById

};

