const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://rajat20205119:aW@j4t9yavWZEPr@cluster0.blymev8.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);