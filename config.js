import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const uri = process.env.dbURI

export const connectDB = async () => {
     try{ 
          await mongoose.connect(uri)
          console.log('Connected to database')
     } catch(err) {
          console.log(err)
     }
}