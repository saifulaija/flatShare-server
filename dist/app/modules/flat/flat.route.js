"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const flat_controller_1 = require("./flat.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/flats', (0, auth_1.default)(client_1.UserRole.USER), flat_controller_1.flatControllers.createFlat);
router.get('/flats', flat_controller_1.flatControllers.getAllFlats);
router.put('/flats/:flatId', (0, auth_1.default)(client_1.UserRole.USER), flat_controller_1.flatControllers.updateFlatData);
exports.flatRoutes = router;
