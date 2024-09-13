import mongoose from "mongoose";

const vehiclesSchema = new mongoose.Schema({
    vehicleName:{
         type:String,
         required:true
     },
    vehicleModel:{
        type:String,
        required:true
    },
    vehicleNumber:{
        type:String,
        required:true
    },
    imgURL:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    fule:{
        type:String,
        required:true
    },
    engine:{
        type:String,
        required:true
    },
    condition:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }

});
export default mongoose.model("vehicles",vehiclesSchema);

 