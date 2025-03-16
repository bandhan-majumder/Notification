"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.js
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const db_1 = require("./helper/db");
const cors_1 = __importDefault(require("cors"));
const producer_1 = require("./kafka/producer");
const consumer_1 = require("./kafka/consumer");
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 3000;
// Connect to Kafka producer when the app starts
(0, producer_1.connectProducer)().catch(console.error);
// Start the Kafka consumer in a separate process for production
// For simplicity, we're starting it here
try {
    (0, consumer_1.startConsumer)();
}
catch (e) {
    console.log("Error is: ", e);
}
app.get('/health', (req, res) => {
    res.send('OK');
});
app.get('/get-todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, db_1.getTodos)();
    res.send({
        todos: resp
    });
}));
app.post('/add-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todo } = req.body;
    console.log(todo);
    // Add database operation
    const resp = yield (0, db_1.addTodo)({ title: todo });
    console.log(resp);
    // Send message to Kafka
    yield (0, producer_1.sendMessage)('todo-notifications', {
        id: resp.id,
        title: todo,
        createdAt: new Date()
    });
    res.send('Todo added and notification sent');
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Handle application shutdown
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Shutting down...');
    process.exit(0);
}));
