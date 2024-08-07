const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "You successfully landed on My App API" })
});


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully 🔥🔥🔥");
})

const feedbackRouter = require('./routes/feedback');
const authRouter = require('./routes/auth');

app.use('/api', feedbackRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port😊: ${port}`);
});
