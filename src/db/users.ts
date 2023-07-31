import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model('User', UsersSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserSessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken });

export const getUserById = (id: string) => UserModel.findById({ id });
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: String) =>
  UserModel.findByIdAndDelete({ _id: id });
export const updateUserByIf = (id: String, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate({ id, values });
