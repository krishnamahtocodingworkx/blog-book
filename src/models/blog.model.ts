// models/Blog.ts
import { Document, model, Model, models, Schema } from "mongoose";
import slugify from "slugify";

export interface Section {
  heading: string;
  content: string;
  imageUrl: string;
}
export interface IBlog extends Document {
  title: string;
  coverImageUrl: string;
  description: string;
  authorName: string;
  slug: string;
  tags: string[];
  data: Array<Section>;
  conclusion: string;
}

const blogSchema = new Schema<IBlog>(
  {
    // title: {
    //   type: String,
    //   required: [true, "Blog title is required"],
    //   unique: true,
    //   trim: true,
    //   maxlength: [120, "Title cannot exceed 120 characters"],
    // },
    // content: {
    //   type: String,
    //   required: [true, "Blog content cannot be empty"],
    //   minlength: [200, "Content should be at least 200 characters"],
    // },
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
    // categories: {
    //   type: [String],
    //   enum: ["Technology", "Programming", "Design", "DevOps", "Career"],
    //   default: ["Programming"],
    // },
    // status: {
    //   type: String,
    //   enum: ["draft", "published"],
    //   default: "draft",
    // },
    // featuredImage: {
    //   type: String,
    //   match: [/^https?:\/\/.+/, "Invalid image URL format"],
    // },
    // slug: {
    //   type: String,
    //   unique: true,
    //   index: true,
    // },
    // comments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Comment",
    //   },
    // ],
    // tags: [
    //   {
    //     type: String,
    //     maxlength: [20, "Tags cannot exceed 20 characters"],
    //   },
    // ],
    // meta: {
    //   votes: {
    //     type: Number,
    //     default: 0,
    //     min: [0, "Votes cannot be negative"],
    //   },
    //   shares: {
    //     type: Number,
    //     default: 0,
    //   },
    // },

    title: {
      type: String,
      required: [true, "Blog title is required"],
      unique: true,
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    coverImageUrl: { type: String, required: true },
    description: {
      type: String,
      required: [true, "Blog description cannot be empty"],
      minlength: [200, "description should be at least 200 characters"],
    },
    authorName: String,
    data: [{ heading: String, content: String, imageUrl: String }],
    conclusion: { type: String },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

blogSchema.pre<IBlog>("save", function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
  next();
});

const Blog: Model<IBlog> = models.Blog || model<IBlog>("Blog", blogSchema);
export default Blog;
