import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [4, "Too Short"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    Image: {
      type: String,
    },
  },
  { timestamps: true }
);
categorySchema.post('init',function(doc){
  doc.Image = `${process.env.BASE_URL}category/${doc.Image}`
  console.log(doc);

})
export const categoryModel = model("category", categorySchema);
