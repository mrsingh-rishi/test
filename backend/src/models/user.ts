import { Schema, model } from "mongoose"

interface UserType extends Document {
    name: string,
    email:string,
    password:string,
}

const UserSchema = new Schema<UserType>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

const User = model<UserType>("User", UserSchema);

export default User;