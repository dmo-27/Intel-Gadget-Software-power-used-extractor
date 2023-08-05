const powerlogs = require("../models/powerlogs");
const storeds = require("../models/storeds");

exports.dissoft = async (req, res) => {
  const { name, email, date, softwarename } = req.body;
  
  
  const dateFromRequest = new Date(date);

  // Query the storeds collection for matching documents
  const softwares = await storeds.find({ name: name, email: email, "files.date": dateFromRequest });

  // Check if there are any matching documents
  if (softwares.length === 0) {
    res.status(404).json({ message: "No matching data found." });
    return;
  }

  // Access the files array of the first matching document
  const filesArray = softwares[0].files;

  // Find the matched file object based on the provided date
  const matchedArray = filesArray.find((file) => file.date.getTime() === dateFromRequest.getTime());

  // Check if there's a match for the provided date
  if (!matchedArray) {
    res.status(404).json({ message: "No data found for the provided date." });
    return;
  }

  // Find the software data based on the provided softwarename
  const data = matchedArray.software.find((file) => file.name === softwarename);
  console.log(data);
  // Check if there's a match for the provided softwarename
  if (!data) {
    res.status(404).json({ message: "No data found for the provided softwarename." });
    return;
  }

  res.json({data:data});
};

exports.softname = async (req, res) => {
  const { name, email, date } = req.body;
  const dateFromRequest = new Date(date);
  const softwares = await storeds.find({ name: name, email: email, "files.date": dateFromRequest });

  if (softwares.length === 0) {
    res.status(404).json({ message: "No matching data found." });
    return;
  }

  const filesArray = softwares[0].files;
  const matchedArray = filesArray.find((file) => file.date.getTime() === dateFromRequest.getTime());
  console.log(matchedArray);
  if (!matchedArray) {
    res.status(404).json({ message: "No data found for the provided date." });
    return;
  }

   const softwareArray = matchedArray.software;
   console.log(softwareArray);
  const names = softwareArray.map((software) => software.name); // Use 'filename' property to get software names
  console.log(names);
  res.json({ name:names });
};



exports.softdate = async (req, res) => {
  const { name, email } = req.body;
  const softwares = await storeds.find({ name: name, email: email });
  console.log(softwares);
  if (softwares.length === 0) {
    res.status(404).json({ message: "No matching data found." });
    return;
  }

  const dates = softwares[0].files.map((file) => file.date);
  console.log(dates);
  res.json({ dates: dates }); // Return dates as an object with a key "dates"
};


exports.info = async(req,res)=>{
const { name, email, date } = req.body;
  
  const dateFromRequest = new Date(date);

  // Query the Log collection for matching documents
  const logs = await powerlogs.find({ name: name, email: email, "files.date": dateFromRequest });
  
  if (logs.length === 0) {
    res.status(404).json({ message: "No matching data found." });
    return;
  }

  // Access the files array of the first matching document
  const filesArray = logs[0].files;

  // Find the matched file object based on the provided date
  const matchedArray = filesArray.find((file) => file.date.getTime() === dateFromRequest.getTime());

  if (!matchedArray) {
    res.status(404).json({ message: "No matching data found for the provided date." });
    return;
  }

  // Get the array data from the matched file object
  const arrayData = matchedArray.Array;

  res.json(arrayData);
}

exports.infodates = async (req, res) => {
  const { name, email } = req.body;

  try {
    const dates = await powerlogs.distinct("files.date", { name: name, email: email });

    if (dates.length === 0) {
      res.status(404).json({ message: "No matching data found." });
      return;
    }

    res.json({dates:dates});
  } catch (error) {
    res.status(500).json({ message: "An error occurred while processing your request." });
  }
};


