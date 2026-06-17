const foodPartnerModel = require("../models/foodpartner.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Please login first" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "partner") {
            return res.status(403).json({ message: "Access denied" });
        }

        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if (!foodPartner) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.foodPartner = foodPartner;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Please login first" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "user") {
            return res.status(403).json({ message: "Access denied" });
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

async function authAnyMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === "user") {
            req.user = await userModel.findById(decoded.id);
        } else if (decoded.role === "partner") {
            req.foodPartner = await foodPartnerModel.findById(decoded.id);
        }
        next();
    } catch (err) {
        next();
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware,
    authAnyMiddleware
}