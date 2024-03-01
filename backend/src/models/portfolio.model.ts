import mongoose, { Model, Schema, Types } from "mongoose";

export type PortfolioType = {
    id: Types.ObjectId;
    header: {
        title: string[];
        subHeading: string;
    };
    status: string;
    footer: {
        links: string[];
        text: string;
    };
    template: Types.ObjectId;
    sections: Types.ObjectId[];
};

type timestamps = {
    createdAt: string;
    updatedAt: string;
};

export type PortfolioModel = Model<PortfolioType & timestamps>;

const PortfolioSchema = new Schema<PortfolioType, PortfolioModel>(
    {
        header: {
            title: {
                type: String,
                default: "Hi, I'm John Doe, software engineer",
            },
            subHeading: {
                type: String,
                default: "Currently at Cornerstone, based in Vancouver",
            },
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },
        footer: {
            links: {
                type: [String],
            },
            text: {
                type: String,
                default: "© 2024 John Doe. All rights reserved.",
            },
        },
        template: {
            type: Schema.Types.ObjectId,
            ref: "Template",
            required: [true, "Portfolio is required"],
        },
        sections: [
            {
                type: Schema.Types.ObjectId,
                ref: "Section",
            },
        ],
    },
    { timestamps: true }
);

PortfolioSchema.set("toJSON", {
    virtuals: true, //? convert _id to id
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});

const Portfolio = mongoose.model<PortfolioType, PortfolioModel>(
    "Portfolio",
    PortfolioSchema
);

export default Portfolio;
