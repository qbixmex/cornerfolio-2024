import mongoose, { Schema, Model } from 'mongoose';

export type UserType = {
  name: string;
  email: string;
  password: string;
  imageURL?: string;
  type?: 'student' | 'client' | 'admin';
  jobTitle: string;
  startDate?: Date;
  endDate?: Date;
  active?: boolean;
  course: string;
  schedule: 'morning' | 'afternoon' | 'evening';
  portfolios?: Schema.Types.ObjectId[];
  // TODO: License
};

type timestamps = {
  createdAt: string;
  updatedAt: string;
};

export type UserModel = Model<UserType & timestamps>;

const UserSchema = new Schema<UserType, UserModel>({
  name: {
    type: String,
    required: [ true, 'Name is required' ],
  },
  email: {
    type: String,
    required: [ true, 'Email is required' ],
    unique: true,
  },
  password: {
    type: String,
    required: [ true, 'Password is required' ],
  },
  imageURL: String,
  type: {
    type: String,
    enum: [ 'student', 'client', 'admin' ],
    default: 'student'
  },
  jobTitle: {
    type: String,
    default: 'example: Full Stack Developer',
  },
  startDate: Date,
  endDate: Date,
  active: {
    type: Boolean,
    default: false,
  },
  course: {
    type: String,
    default: 'example: Web development',
  },
  schedule: {
    type: String,
    enum: [ 'morning', 'afternoon', 'evening' ],
    required: [ true, 'Schedule Hour is required' ]
  },
  // TODO: Portfolio
  // portfolios: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Portfolio',
  //   required: [ true, 'Portfolio is required' ],
  // }],
}, {
  timestamps: true,
});

UserSchema.set('toJSON', {
  virtuals: true, //? convert _id to id
  versionKey: false,
  transform: function(doc, ret, options) {
    delete ret._id;
    delete ret.password;
  },
});

const User = mongoose.model<UserType, UserModel>("User", UserSchema);

export default User;
