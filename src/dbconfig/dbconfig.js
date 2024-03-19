import mongoose from "mongoose";

export default async function dbConnect() {
    mongoose
        .connect(process.env.NEXT_PUBLIC_MONGO_URI)
        .then((db) => {
            // console.log('Connected to the database');
        })
        .catch((error) => {
            console.error('Error connecting to the database:', error.message);
        });
}