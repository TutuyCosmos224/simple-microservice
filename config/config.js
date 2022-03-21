import dotenv from 'dotenv';

dotenv.config();

const {MONGODB_URL, PORT} = process.env;

const config = {
    app: {
        port : PORT || 8000,
    },
    db: {
        url : MONGODB_URL,
    },
};

export default config;