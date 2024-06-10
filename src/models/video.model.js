import mongoose from "mongoose";
import { User } from "./user.model";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    thunbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);
// since it is newly added we enable it this way
// now you can perform industry graded complex queries

export const Video = mongoose.model("Video", videoSchema);
