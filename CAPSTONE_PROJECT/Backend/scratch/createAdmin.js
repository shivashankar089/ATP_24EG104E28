import { connect, disconnect } from "mongoose";
import { hash } from "bcryptjs";
import { config } from "dotenv";
import { UserModel } from "../models/UserModel.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "../.env") });

async function createAdmin() {
  try {
    await connect(process.env.DB_URL);
    console.log("Connected to DB");

    const adminEmail = "admin@mail.com";
    const existingAdmin = await UserModel.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin user already exists");
    } else {
      const hashedPassword = await hash("admin123", 12);
      const newAdmin = new UserModel({
        firstName: "System",
        lastName: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        isUserActive: true,
      });

      await newAdmin.save();
      console.log("Admin user created successfully!");
      console.log("Email: admin@mail.com");
      console.log("Password: admin123");
    }
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    await disconnect();
  }
}

createAdmin();
