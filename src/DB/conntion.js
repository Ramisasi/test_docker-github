import mongoose from "mongoose";

const ConntionDB = async () => {
  return await mongoose
    .connect(process.env.DBConntion)
    .then((res) =>
      console.log(`Connect To DB ............... ${process.env.DBConntion}`)
    )
    .catch((error) => {
      console.log(`Catch Errer ............ ${error}}`);
      console.log(`DBConntion ............ ${process.env.DBConntion}`);
      console.log(error);
    });
};

export default ConntionDB;
