// import mongoose, { Schema, Document, Model } from "mongoose";
// import bcrypt from "bcrypt";

// interface IUser {
//   username: string;
//   hashedPassword: string;
// }

// interface IUserDocument extends IUser, Document {
//   setPassword: (password: string) => Promise<void>;
//   checkPassword: (password: string) => Promise<boolean>;
// }

// interface IUserModel extends Model<IUserDocument> {
//   findByUsername: (username: string) => Promise<IUserDocument>;
// }

// const UserSchema: Schema<IUserDocument> = new Schema({
//   username: { type: String, required: true },
//   hashedPassword: { type: String, required: true },
// });

// UserSchema.methods.setPassword = async function (password: string) {
//   const hash = await bcrypt.hash(password, 10);
//   this.hashedPassword = hash;
// };

// UserSchema.methods.checkPassword = async function (password: string) {
//   const result = await bcrypt.compare(password, this.hashedPassword);
//   return result;
// };

// UserSchema.statics.findByUsername = function (username: string) {
//   return this.findOne({ username });
// };

// const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
// export default User;
