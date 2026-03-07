import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

// Force use of Google DNS
dns.setServers(['8.8.8.8']);

const testSrv = () => {
    return new Promise((resolve) => {
        console.log('Testing SRV resolution with 8.8.8.8 (_mongodb._tcp.bathnbody.yvhan.mongodb.net)...');
        dns.resolveSrv('_mongodb._tcp.bathnbody.yvhan.mongodb.net', (err, addresses) => {
            if (err) {
                console.error('SRV Resolution Failed:', err);
            } else {
                console.log('SRV Resolution Success:', addresses);
            }
            resolve();
        });
    });
};

const testConnection = async () => {
    await testSrv();

    console.log('Testing MONGO_URI:', process.env.MONGO_URI.replace(/:([^@]+)@/, ':****@'));
    try {
        console.log('Attempting connection...');
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log('SUCCESS: Connected to MongoDB!');
        await mongoose.disconnect();
    } catch (err) {
        console.error('FAILURE: Could not connect to MongoDB.');
        console.error(err);
    }
    process.exit();
};

testConnection();
