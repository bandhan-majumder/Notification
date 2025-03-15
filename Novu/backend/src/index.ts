import express from 'express';
import { Novu } from '@novu/api';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const novu = new Novu({
    secretKey: process.env.NOVU_SECRET_KEY
});

export async function triggerEventWorkflow({ email, phone }: { email: string, phone: string }) {
    const response = await novu.trigger({
        workflowId: 'events-message',
        to: {
            subscriberId: `${email} + ${phone}`, // '67d53472dee541bb8e07c301'.. it creates a new unique id everytime a new email and phone is passed. This combination must be unique.
            email,
            phone
        },
        payload: {
            organizationName: 'Example Foundation'
        }
    });
    return response;
}


app.post('/trigger-event', async (req, res) => {
    const { email, phone } = req.body;
    console.log("email and phone: ", email, phone);
    try {
        const response = await triggerEventWorkflow({ email, phone });

        res.json({ success: true, response });
    } catch (error) {
        console.error('Failed to trigger Novu workflow:', error);
        res.status(500).json({ success: false, error: error });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
