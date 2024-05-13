import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IStudent extends Document {
  username: string;
  password: string;
  email: string;
  img_id: string;
  isPasswordCorrect(password: string): Promise<boolean>;
}

const studentSchema: Schema<IStudent> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  img_id: {
    type: String,
    default: "",
  },
});

studentSchema.pre<IStudent>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

studentSchema.methods.isPasswordCorrect = async function (
  this: IStudent,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const StudentModel = mongoose.model<IStudent>("Student", studentSchema);

export default StudentModel;
