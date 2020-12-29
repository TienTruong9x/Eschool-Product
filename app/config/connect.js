const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb+srv://eschool:Truong9x@cluster0.pep5g.mongodb.net/<dbname>?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connect oke na");
  } catch (error) {
    console.log("Connect fails : " + error);
  }
}

module.exports = { connect };
