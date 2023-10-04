import mongoose from 'mongoose';
require("dotenv").config();
const  { NEXT_PUBLIC_MONGO_URI } = process.env;

// console.log(NEXT_PUBLIC_MONGO_URI);

export async function connect() {
    try {
        await mongoose.connect(NEXT_PUBLIC_MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit(1); // Exit the process with an error code
        });
    } catch (error) {
        console.log('Something went wrong!');
        console.error(error);
    }
}
