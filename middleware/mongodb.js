import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
  try {
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }
        // Use new db connection
    await mongoose.connect(process.env.mongodburl, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    return handler(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 'error', error: 'Internal' });
    return
  }

};

export default connectDB;