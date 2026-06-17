const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service')
const likeModel = require('../models/likes.model')
const saveModel = require('../models/save.model')
const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')
const { v4: uuid} = require("uuid")

async function createFood(req, res) {
    try {
        if (!req.foodPartner) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: "Video file is required" });
        }

        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id
        });

        res.status(201).json({
            message: "Food created successfully",
            food: foodItem
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create food item" });
    }
}

async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({}).limit(50).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Food items fetched successfully",
            foodItems
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch food items" });
    }
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}

async function saveFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        if (!foodId) {
            return res.status(400).json({ message: "Food ID is required" });
        }

        const isAlreadySaved = await saveModel.findOne({
            user: user._id,
            food: foodId
        });

        if (isAlreadySaved) {
            await saveModel.deleteOne({
                user: user._id,
                food: foodId
            });

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { savesCount: -1 }
            });

            return res.status(200).json({ message: "Food unsaved successfully" });
        }

        const save = await saveModel.create({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: 1 }
        });

        res.status(201).json({
            message: "Food saved successfully",
            save
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to save food item" });
    }
}

async function getSaveFood(req, res) {
    try {
        const user = req.user;
        const savedFoods = await saveModel.find({ user: user._id }).populate('food');
        if (!savedFoods || savedFoods.length === 0) {
            return res.status(200).json({ message: "No saved foods found", savedFoods: [] });
        }

        res.status(200).json({
            message: "Saved foods retrieved successfully",
            savedFoods
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve saved foods" });
    }
}



module.exports={
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSaveFood

}