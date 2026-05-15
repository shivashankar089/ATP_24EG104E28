import { Schema, model } from 'mongoose'
const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'First name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exits']
    },
    mobile: {
      type: Number,
      required: [true, 'Number required']
    },
    designation: {
      type: String,
      required: [true, 'Designation is required']
    },
    companyName: {
      type: String
    },
    isUserActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    strict: 'throw'
  }
)

//Create Model
export const employeeModel = model('employee', employeeSchema)
