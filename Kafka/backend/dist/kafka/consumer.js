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
exports.startConsumer = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const kafkajs_1 = require("kafkajs");
const twilio_1 = __importDefault(require("twilio"));
// Initialize Twilio client
const twilioClient = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const kafka = new kafkajs_1.Kafka({
    clientId: 'todo-app-consumer',
    brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'todo-notifications' });
const startConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield consumer.connect();
        yield consumer.subscribe({ topic: 'todo-notifications', fromBeginning: true });
        yield consumer.run({
            eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message }) {
                //@ts-ignore
                const data = JSON.parse(message.value.toString());
                console.log(`Processing message: ${message.value}`);
                // Send email notification using Twilio SendGrid or SMS
                yield sendNotification(data);
            }),
        });
        console.log('Consumer started successfully');
    }
    catch (error) {
        console.error('Error starting consumer:', error);
    }
});
exports.startConsumer = startConsumer;
//@ts-ignore
function sendNotification(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // You can use Twilio's SMS service
            yield twilioClient.messages.create({
                body: `New Todo Added: ${data.title}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                //@ts-ignore
                to: process.env.USER_PHONE_NUMBER // You might want to store this in your user model
            });
            console.log('Notification sent successfully');
        }
        catch (error) {
            console.error('Error sending notification:', error);
        }
    });
}
