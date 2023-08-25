import mongoose from 'mongoose';
const connecting = () => {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/project1")
        console.log("Connected to Mongoose server successfully");
    } catch (error) {
        console.log("Error connecting: ", error);
    }
}

export default connecting