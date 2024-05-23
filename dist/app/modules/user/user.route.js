"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/register", (req, res, next) => {
    try {
        user_validation_1.userValidations.createUser.parse(req.body);
        return user_controller_1.userControllers.createUser(req, res, next);
    }
    catch (error) {
        if (error instanceof Error && "issues" in error) {
            const zodError = error;
            const errorDetails = {
                issues: zodError.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            };
            const errorMessage = zodError.issues
                .map((issue) => issue.message)
                .join(". ");
            return res.status(400).json({
                success: false,
                message: errorMessage,
                errorDetails: errorDetails,
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                error: error.message || "Unknown error occurred",
            });
        }
    }
});
router.get("/profile", (0, auth_1.default)(client_1.UserRole.USER), user_controller_1.userControllers.getUserWithProfile);
router.put("/profile", (0, auth_1.default)(client_1.UserRole.USER), user_controller_1.userControllers.updateUserWithProfile);
exports.userRoutes = router;
