import     mongoose  from 'mongoose'


const  connectDB =async()=>{

    try {
        const  connectionInstance= await mongoose.connect(process.env.MONGO_URI)
        if(connectionInstance){
            console.log(`connection  is  estabilshed at and  host is ${connectionInstance.connection.host}`)
        }
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }

}



export default connectDB;