export declare const connectProducer: () => Promise<void>;
export declare const disconnectProducer: () => Promise<void>;
export declare const sendMessage: (topic: any, message: any) => Promise<boolean>;
