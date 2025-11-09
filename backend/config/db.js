import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected!`.cyan.underline);
    }
    catch (err){
        console.log(err);
    }
}

export default connectDB;