import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const url = await mongoose.connect("mongodb://127.0.0.1.27017/water-logistics")
        console.log(`mongoDb ulandi `);
    }catch (error) {
        console.log(error);
    }
}


export default connectDb