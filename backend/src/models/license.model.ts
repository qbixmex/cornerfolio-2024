import mongoose, { Model, Schema, Types } from "mongoose";

export type LicenseType = {
  id: Types.ObjectId;
  type: "free" | "premium";
  startDate: Date | null;
  endDate: Date | null;
};

type timestamps = {
  createdAt: string;
  updatedAt: string;
};

export type LicenseModel = Model<LicenseType & timestamps>;

const LicenseSchema = new Schema<LicenseType, LicenseModel>(
  {
    type: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

//* This line is for removing underscore from _id.
//? It's not necessary to remove _id from the response,
//? but it's good to know how to do it.
LicenseSchema.set("toJSON", {
  virtuals: true, //? convert _id to id
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

const License = mongoose.model<LicenseType, LicenseModel>(
  "License",
  LicenseSchema
);

export default License;
