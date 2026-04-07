const mongoose = require("mongoose");
const Student = require("../models/Student");
require("dotenv").config({ path: "../.env" });

const students = [
  { firstName: "Aarav", lastName: "Shah", email: "aarav.shah@uni.edu", course: "Computer Science", year: 2, gpa: 3.7, status: "active", phone: "9841000001", address: "Kathmandu, Nepal", enrollmentDate: new Date("2023-09-01") },
  { firstName: "Priya", lastName: "Thapa", email: "priya.thapa@uni.edu", course: "Information Technology", year: 3, gpa: 3.5, status: "active", phone: "9841000002", address: "Pokhara, Nepal", enrollmentDate: new Date("2022-09-01") },
  { firstName: "Rohan", lastName: "Karki", email: "rohan.karki@uni.edu", course: "Software Engineering", year: 1, gpa: 3.9, status: "active", phone: "9841000003", address: "Lalitpur, Nepal", enrollmentDate: new Date("2024-09-01") },
  { firstName: "Sita", lastName: "Rai", email: "sita.rai@uni.edu", course: "Computer Science", year: 4, gpa: 3.2, status: "active", phone: "9841000004", address: "Biratnagar, Nepal", enrollmentDate: new Date("2021-09-01") },
  { firstName: "Bikash", lastName: "Gurung", email: "bikash.gurung@uni.edu", course: "Cybersecurity", year: 2, gpa: 3.6, status: "active", phone: "9841000005", address: "Bhaktapur, Nepal", enrollmentDate: new Date("2023-09-01") },
  { firstName: "Anisha", lastName: "Poudel", email: "anisha.poudel@uni.edu", course: "Data Science", year: 3, gpa: 3.8, status: "active", phone: "9841000006", address: "Chitwan, Nepal", enrollmentDate: new Date("2022-09-01") },
  { firstName: "Dipesh", lastName: "Magar", email: "dipesh.magar@uni.edu", course: "Information Technology", year: 1, gpa: 2.9, status: "active", phone: "9841000007", address: "Butwal, Nepal", enrollmentDate: new Date("2024-09-01") },
  { firstName: "Kabita", lastName: "Shrestha", email: "kabita.shrestha@uni.edu", course: "Software Engineering", year: 4, gpa: 3.4, status: "graduated", phone: "9841000008", address: "Dharan, Nepal", enrollmentDate: new Date("2021-09-01") },
  { firstName: "Nabin", lastName: "Adhikari", email: "nabin.adhikari@uni.edu", course: "Computer Science", year: 3, gpa: 3.1, status: "active", phone: "9841000009", address: "Hetauda, Nepal", enrollmentDate: new Date("2022-09-01") },
  { firstName: "Sunita", lastName: "Tamang", email: "sunita.tamang@uni.edu", course: "Cybersecurity", year: 2, gpa: 3.7, status: "active", phone: "9841000010", address: "Janakpur, Nepal", enrollmentDate: new Date("2023-09-01") },
  { firstName: "Arun", lastName: "Basnet", email: "arun.basnet@uni.edu", course: "Data Science", year: 1, gpa: 3.3, status: "active", phone: "9841000011", address: "Nepalgunj, Nepal", enrollmentDate: new Date("2024-09-01") },
  { firstName: "Mina", lastName: "Limbu", email: "mina.limbu@uni.edu", course: "Computer Science", year: 2, gpa: 2.8, status: "inactive", phone: "9841000012", address: "Dhankuta, Nepal", enrollmentDate: new Date("2023-09-01") },
  { firstName: "Suresh", lastName: "Bhandari", email: "suresh.bhandari@uni.edu", course: "Software Engineering", year: 3, gpa: 3.6, status: "active", phone: "9841000013", address: "Ilam, Nepal", enrollmentDate: new Date("2022-09-01") },
  { firstName: "Ritu", lastName: "Khadka", email: "ritu.khadka@uni.edu", course: "Information Technology", year: 4, gpa: 3.9, status: "graduated", phone: "9841000014", address: "Birgunj, Nepal", enrollmentDate: new Date("2021-09-01") },
  { firstName: "Prakash", lastName: "Oli", email: "prakash.oli@uni.edu", course: "Cybersecurity", year: 1, gpa: 3.0, status: "active", phone: "9841000015", address: "Tulsipur, Nepal", enrollmentDate: new Date("2024-09-01") },
  { firstName: "Sabina", lastName: "Dhakal", email: "sabina.dhakal@uni.edu", course: "Data Science", year: 2, gpa: 3.5, status: "active", phone: "9841000016", address: "Damak, Nepal", enrollmentDate: new Date("2023-09-01") },
  { firstName: "Manish", lastName: "Chaudhary", email: "manish.chaudhary@uni.edu", course: "Computer Science", year: 3, gpa: 3.2, status: "active", phone: "9841000017", address: "Ghorahi, Nepal", enrollmentDate: new Date("2022-09-01") },
  { firstName: "Puja", lastName: "Maharjan", email: "puja.maharjan@uni.edu", course: "Software Engineering", year: 2, gpa: 3.8, status: "active", phone: "9841000018", address: "Kirtipur, Nepal", enrollmentDate: new Date("2023-09-01") },
  { firstName: "Santosh", lastName: "Ghimire", email: "santosh.ghimire@uni.edu", course: "Information Technology", year: 1, gpa: 3.4, status: "active", phone: "9841000019", address: "Banepa, Nepal", enrollmentDate: new Date("2024-09-01") },
  { firstName: "Kamala", lastName: "Yadav", email: "kamala.yadav@uni.edu", course: "Cybersecurity", year: 4, gpa: 3.7, status: "graduated", phone: "9841000020", address: "Lahan, Nepal", enrollmentDate: new Date("2021-09-01") },
  { firstName: "Nirajan", lastName: "Pandey", email: "nirajan.pandey@uni.edu", course: "Data Science", year: 3, gpa: 2.7, status: "inactive", phone: "9841000021", address: "Itahari, Nepal", enrollmentDate: new Date("2022-09-01") },
  { firstName: "Alisha", lastName: "Joshi", email: "alisha.joshi@uni.edu", course: "Computer Science", year: 2, gpa: 4.0, status: "active", phone: "9841000022", address: "Bhimdatta, Nepal", enrollmentDate: new Date("2023-09-01") },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studentdb");
    console.log("✅ Connected to MongoDB");

    await Student.deleteMany({});
    console.log("🗑️  Cleared existing students");

    await Student.insertMany(students);
    console.log(`🌱 Seeded ${students.length} students successfully`);

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();