import mongoose from "mongoose";

export function dbConnection() {
  mongoose
    .connect(`mongodb+srv://ecommerce:ecommerce123@cluster0.b649qmo.mongodb.net/Ecommerce-App`)
    .then(() => {
      console.log("DB Connected Succesfully");
    })
    .catch((error) => {
      console.log("DB Failed to connect", error);
    });
}
