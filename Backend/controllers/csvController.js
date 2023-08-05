const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const powerlogss = require("../models/powerlogs");
const express = require("express");
const multer = require('multer');
const upload = multer();

var name = '' ;

var email='';
var date;

exports.rename=async(req,res)=>{

name=req.body.name;
email=req.body.email;
//res.json(name,email);
console.log(name,email);
},

exports.setdata= async (req,res)=>{


date=req.body.date;
console.log(date);

const response = await powerlogss.findOne({name:name,email:email,"files.date":date});
console.log(response);
if(response){
  res.json({message:"done for the date"});
}
},
exports.create = async (req, res) => {
  console.log(req.file);
 const totalRecords = [];
const filename=req.file.originalname;  
console.log(totalRecords);
 console.log(filename);
try{

 console.log(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
 fs.createReadStream(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
   .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => totalRecords.push(row))
    .on('end', async rowCount => {
      try{

    // const jsonData = JSON.parse(req.files.jsonData[0].buffer.toString());
    // res.json(jsonData);
    const slicedData = totalRecords.slice(0,totalRecords.length-19);
    //console.log(slicedData);
    const mappedData = slicedData.map((data) => ({
      SystemTime: data['System Time'],
      rdtsc: data['RDTSC'],
      elapsedTimeSec: data['Elapsed Time (sec)'],
  cpuUtilization: data[' CPU Utilization(%)'],
  cpuFrequencyMHz: data['CPU Frequency_0(MHz)'],
  processorPowerWatt: data['Processor Power_0(Watt)'],
  cumulativeProcessorEnergyJoules:data['Cumulative Processor Energy_0(Joules)'],
  cumulativeProcessorEnergymWh: data['Cumulative Processor Energy_0(mWh)'],
  iaPowerWatt:data['IA Power_0(Watt)'],
  cumulativeIAEnergyJoules:data['Cumulative IA Energy_0(Joules)'],
  cumulativeIAEnergymWh: data['Cumulative IA Energy_0(mWh)'],
  packageTemperatureC: data['Package Temperature_0(C)'],
  packageHot: data['Package Hot_0'],
  dramPowerWatt: data['DRAM Power_0(Watt)'],
  cumulativeDRAMEnergyJoules:data['Cumulative DRAM Energy_0(Joules)'],
  cumulativeDRAMEnergymWh:data['Cumulative DRAM Energy_0(mWh)'],
  gtPowerWatt: data['GT Power_0(Watt)'],
  cumulativeGTEnergyJoules: data['Cumulative GT Energy_0(Joules)'],
  cumulativeGTEnergymWh: data['Cumulative GT Energy_0(mWh)'],
  packagePL1Watt: data['Package PL1_0(Watt)'],
  packagePL2Watt: data['Package PL2_0(Watt)'],
  packagePL4Watt: data['Package PL4_0(Watt)'],
  platformPsysPL1Watt:data['Platform PsysPL1_0(Watt)'],
  platformPsysPL2Watt: data['Platform PsysPL2_0(Watt)'],
  gtFrequencyMHz:data['GT Frequency(MHz)'],
  gtUtilization:data['GT Utilization(%)'],
      
    }));
    
        
    
    

    const wer = await powerlogss.updateOne(
    { name: name,email:email}, 
    { $push: { files: [{ filename:filename,date: date, Array:mappedData}] } } 
    );
    wer.save();
    console.log(wer);
    //console.log(totalRecords.length);
    //console.log(mappedData);
    //console.log(req.json);
    //res.send("came here");
    
      }catch(err){
        res.status(400).json(err);
      }
    });

  }catch(error){
    res.status(400).json(error)
  }
};

