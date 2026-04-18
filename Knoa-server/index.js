require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

const stripe = require("stripe")(process.env.STRIPE_SECRETE);
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("Learning is on!");
});

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-pr6dsoo-shard-00-00.iz3zu0d.mongodb.net:27017,ac-pr6dsoo-shard-00-01.iz3zu0d.mongodb.net:27017,ac-pr6dsoo-shard-00-02.iz3zu0d.mongodb.net:27017/?ssl=true&replicaSet=atlas-1026ed-shard-0&authSource=admin&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // create the colletion in DB
    const courseCollection = client.db("KnoaDB").collection("courses");
    const userCollection = client.db("KnoaDB").collection("users");
    const mentorCollection = client.db("KnoaDB").collection("mentors");
    const enrollmentCollection = client.db("KnoaDB").collection("enrollment");
    const FAvCourseCollection = client
      .db("KnoaDB")
      .collection("wishlistCourse");
    // const enrollmentCollection = client
    //   .db("KnoaDB")
    //   .collection("enrolledCourse");
    const subscriberCollection = client.db("KnoaDB").collection("subscribers");

    // API for user
    // get all the user data from database
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // get the user role from database
    app.get("/users/role/:email", async (req, res) => {
      const email = req.params.email;

      const user = await userCollection.findOne({ email });

      if (!user) {
        return res.send({ role: "student" }); // fallback
      }

      res.send({ role: user.role });
    });

    //  post the user info in the database
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };

      // Logic to check if user email is already present
      const isExist = await userCollection.findOne(query);

      if (isExist) {
        return res.send({ message: "user already exists", insertedId: null });
      }

      const newUser = {
        ...user,
        role: "student", //default user role
      };

      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    // update user role in db
    app.patch("/users/role/:id", async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;
      const filter = { _id: new ObjectId(id) };

      const updatedDoc = {
        $set: {
          role: role,
        },
      };

      const result = await userCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // delete user from db
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // mentors API

    // get the data from database
    app.get("/mentors", async (req, res) => {
      const result = await mentorCollection.find().toArray();
      res.send(result);
    });

    // insert mentor data if exist then update mentor data
    app.post("/mentors", async (req, res) => {
      mentorData = req.body;

      const query = { email: mentorData.email };

      const updatedDoc = {
        $set: {
          ...mentorData,
          updatedAt: new Date(),
        },
      };

      // If user exists, update them. If not, create them.
      const options = { upsert: true };

      const result = await mentorCollection.updateOne(
        query,
        updatedDoc,
        options,
      );
      res.send(result);
    });

    // course API

    // get the data from database
    app.get("/courses", async (req, res) => {
      const result = await courseCollection.find().toArray();
      res.send(result);
    });

    app.get("/course/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      // 1. Fetch the main course details
      const course = await courseCollection.findOne(query);

      if (!course) {
        return res.status(404).send({ message: "course not found !" });
      }

      // fetch same category course
      const relatedQuery = {
        category: course.category,
        _id: { $ne: new ObjectId(id) },
      };

      const relatedCourses = await courseCollection
        .find(relatedQuery)
        .limit(3)
        .toArray();

      res.send({ course, relatedCourses });
    });

    //  post the data in the database
    app.post("/courses", async (req, res) => {
      const courses = req.body;
      const result = await courseCollection.insertOne(courses);
      res.send(result);
    });

    // update course details
    app.patch("/course/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      // Create a copy of the body and remove _id if it exists
      const updatedCourse = { ...req.body };
      delete updatedCourse._id;

      const updateDoc = {
        $set: updatedCourse,
      };
      const result = await courseCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.delete("/course/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await courseCollection.deleteOne(query);
      res.send(result);
    });

    // wishlist API

    // Updated GET route with sorting (Newest first)
    app.get("/wishlist", async (req, res) => {
      const result = await FAvCourseCollection.find()
        .sort({ _id: -1 })
        .toArray();
      res.send(result);
    });

    // post wishlist courses to the database
    app.post("/wishlist", async (req, res) => {
      const wishCourse = req.body;
      const result = await FAvCourseCollection.insertOne(wishCourse);
      res.send(result);
    });

    // delete the course from the wishlist
    app.delete("/wishlist/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await FAvCourseCollection.deleteOne(query);
      res.send(result);
    });

    // get the user data according to email from database
    // app.get("/users/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const user = await userCollection.findOne({ email: email });
    //   res.send(user);
    // });

    // update user info
    app.patch("/users/:email", async (req, res) => {
      const email = req.params.email;
      const updatedInfo = req.body;
      // Remove sensitive fields if they exist in the body
      delete updatedInfo._id;
      delete updatedInfo.email;

      const filter = { email: email };
      const updateDoc = {
        $set: updatedInfo,
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // mentor API handle
    // Get a single mentor's details by their ID
    app.get("/users/mentor/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // Get ONLY users who are mentors (for your Mentors Page)
    app.get("/mentors", async (req, res) => {
      // const query = { role: "mentor" }; // Filter by role
      const result = await mentorCollection.find().toArray();
      res.send(result);
    });

    // related Mentor
    app.get("/related-mentors", async (req, res) => {
      const { expertise, currentId } = req.query;
      const query = {
        role: "mentor",
        expertise: { $regex: expertise, $options: "i" },
        _id: { $ne: new ObjectId(currentId) },
      };
      const related = await userCollection.find(query).limit(3).toArray();
      res.send(related);
    });

    // dashboard API
    // Add this route to your Express server
    app.get("/stats/overview", async (req, res) => {
      const totalCourses = await courseCollection.countDocuments();
      const totalMentors = await userCollection.countDocuments({
        role: "mentor",
      });

      // Filter mentors with rating >= 4.0 and limit to top 3
      const highRatedMentors = await userCollection
        .find({ role: "mentor", rating: { $gte: 4.0 } })
        .sort({ rating: -1 })
        .limit(3)
        .toArray();

      res.send({ totalCourses, totalMentors, highRatedMentors });
    });

    // enrollcourse API
    app.post("/enroll", async (req, res) => {
      const enrolledCourse = req.body;
      // 1. Double check for existing enrollment
      const alreadyEnrolled = await enrollmentCollection.findOne({
        studentEmail: enrolledCourse.studentEmail,
        courseId: enrolledCourse.courseId,
      });

      if (alreadyEnrolled) {
        return res
          .status(400)
          .send({ message: "You are already in this course!" });
      }
      const result = await enrollmentCollection.insertOne(enrolledCourse);
      res.send(result);
    });

    // for student profile
    app.get("/my-enrolled-courses", async (req, res) => {
      const email = req.query.email;

      if (!email) {
        return res.status(400).send({ message: "Email is required" });
      }

      // We search the enrollmentCollection for the student's email
      const query = { studentEmail: email };
      const result = await enrollmentCollection.find(query).toArray();
      res.send(result);
    });

    // for mentor profile
    app.get("/courses-by-mentor", async (req, res) => {
      const name = req.query.name;

      // We search the main courseCollection for courses this mentor created
      const query = { mentorName: name };
      const result = await courseCollection.find(query).toArray();
      res.send(result);
    });

    // API for newsletter subscribers
    // Inside your server connection block

    app.post("/subscribers", async (req, res) => {
      const subscriber = req.body;

      // 1. Check if the email is already in the database
      const query = { email: subscriber.email };
      const alreadySubscribed = await subscriberCollection.findOne(query);

      if (alreadySubscribed) {
        return res
          .status(400)
          .send({ message: "This email is already subscribed!" });
      }

      // 2. Insert the new dynamic subscriber data
      const result = await subscriberCollection.insertOne(subscriber);
      res.send(result);
    });

    // AI chat
    app.post("/chat", async (req, res) => {
      const { message } = req.body;

      try {
        // Choose the model (gemini-1.5-flash is fast and free)
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction:
            "You are a helpful assistant for an online learning platform. Keep responses concise.",
        });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        console.log("Gemini says:", text);
        res.send({ reply: text }); // This matches your frontend 'data.reply'
      } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).send({ error: "Gemini failed to respond" });
      }
    });

    // Payment related API

    app.post("/verify-payment", async (req, res) => {
      const sessionId = req.body.sessionId;
      if (!sessionId) return res.status(400).send({ message: "No session ID" });
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      console.log("session", session);
      if (session.payment_status === "paid") {
        const { courseId, courseName, instructorId, studentName } =
          session.metadata;

        // 1. Fetch Course Image from your courses collection
        const courseData = await courseCollection.findOne({
          _id: new ObjectId(courseId),
        });

        // 2. Fetch Mentor Name from your users/mentors collection using the UID
        const mentorData = await mentorCollection.findOne({
          uid: instructorId,
        });

        const enrollmentDoc = {
          courseId,
          courseName,
          courseImage: courseData?.thumbnail || "", // Get image from DB
          mentorName: mentorData?.name || "", // Get name from DB
          instructorId, // This is the 'uid' (e.g., "qQsvCTx...")
          studentName,
          studentEmail: session.customer_email,
          price: session.amount_total / 100,
          transactionId: session.payment_intent,
          status: "pending", // Student sees 'In Progress'
          enrollDate: new Date(),
        };

        // Check if this transaction was already saved to prevent duplicates
        const alreadySaved = await enrollmentCollection.findOne({
          transactionId: session.payment_intent,
        });
        if (alreadySaved) return res.send({ success: true });

        //  Save to your Enrollments collection
        const result = await enrollmentCollection.insertOne(enrollmentDoc);
        res.send({ success: true, result });
      }
    });

    app.post("/create-checkout-session", async (req, res) => {
      const enrollmentData = req.body;
      const amount = parseInt(enrollmentData.price) * 100;
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: amount,
              product_data: {
                name: `Please pay for : ${enrollmentData.courseName}`,
              },
            },
            quantity: 1,
          },
        ],
        customer_email: enrollmentData.studentEmail,
        mode: "payment",
        metadata: {
          courseId: enrollmentData.courseId,
          courseName: enrollmentData.courseName,
          instructorId: enrollmentData.instructorId,
          studentName: enrollmentData.studentName,
        },

        success_url: `${process.env.SITE_DOMAIN}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.SITE_DOMAIN}/dashboard/payment-cancel`,
      });

      res.send({ url: session.url });
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!",
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`You can learn in port ${port}`);
});
