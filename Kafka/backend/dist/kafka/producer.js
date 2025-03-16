"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.disconnectProducer = exports.connectProducer = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'todo-app',
    brokers: ['localhost:9092']
});
const producer = kafka.producer();
const connectProducer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield producer.connect();
        console.log('Producer connected successfully');
    }
    catch (error) {
        console.error('Error connecting producer:', error);
    }
});
exports.connectProducer = connectProducer;
const disconnectProducer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield producer.disconnect();
});
exports.disconnectProducer = disconnectProducer;
//@ts-ignore
const sendMessage = (topic, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield producer.send({
            topic,
            messages: [
                { value: JSON.stringify(message) }
            ],
        });
        console.log(`Message sent to topic: ${topic}`);
        return true;
    }
    catch (error) {
        console.error('Error sending message:', error);
        return false;
    }
});
exports.sendMessage = sendMessage;
