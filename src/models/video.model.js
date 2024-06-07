import mongoose from "mongoose";
import { User } from "./user.model";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String,
      rerquired: true,
    },
    thunbnail: {
      type: String,
      rerquired: true,
    },
    title: {
      type: String,
      rerquired: true,
    },
    description: {
      type: String,
      rerquired: true,
    },
    duration: {
      type: Number,
      rerquired: true,
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
      type: Schema.types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate)
// since it is newly added we enable it this way
// now you can perform industry graded complex queries

export const Video = mongoose.model("Video", videoSchema);
