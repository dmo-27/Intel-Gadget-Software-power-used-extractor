const express = require("express");
const powerlogs = require("../models/powerlogs");
const storeds = require("../models/storeds");



exports.bgexist=async(req,res)=>{
  const{name,email,date}=req.body;

const dateFromRequest = new Date(date);
const existing = await powerlogs.find({name:name,email:email,"files.date":date});

if(existing.length){
  console.log(existing);
  const e = await storeds.find({name:name,email:email,"files.date":date});
  if(e.length){
  
  res.json({message: "You can enter the data" });
  

  }
  else {
    res.json({message: "You didn't enter when the software usage started" });
  }
  
}else{
  console.log("hii");
  res.json({message:"The data for this date is not uploaded"});
}

}







exports.bgcal=async(req,res)=>{
const { name, email, softstart, date } = req.body;

const existing = await storeds.find({name:name,email:email,"files.date":date});
if(existing.length){
  console.log(existing);
  res.json({message:"The data is already set"});
}else{
  
  
  console.log(date);
try {
    // Await the result of the findOne query
    const result = await powerlogs.findOne({ name: name, email: email, "files.date": date });
    
    //console.log(result);
    if (result && result.files && result.files.length > 0) {
      // Access the matched array from the result
      const dateFromRequest = new Date(date);
      //console.log(dateFromRequest);
      const matchedArray = result.files.find((file) => file.date.getTime()===dateFromRequest.getTime());

      
      console.log(matchedArray);
      if (matchedArray) {
        //console.log("Matched Array:", matchedArray);
        //
       
        var stsf=0;
        for(var i = 0 ; i < matchedArray.Array.length ; i++){
          if(softstart==matchedArray.Array[i].SystemTime){
                stsf=i;
                break;
            } 
          
          
        }
        //initial
        var cpuu1=0;
        var cpuf1=0;
        var propw1=0;
        var cpej1=0;
        var cpewh1=0;
        var ipw1=0;
        var ciaej1=0;
        var ciawh1=0;
        var ptc1=0;
        var ph1=0;
        var dpt1=0;
        var cdej1=0;
        var cdwh1=0;
        var gtpw1=0;
        var cghej1=0;
        var cghwh1=0;
        var pp1w1=0;
        var pp2w1=0;
        var pp4w1=0;
        var ppp1w1=0;
        var ppp2w1=0;
        var gtfhz1=0;
        var gtu1=0;

        var dino1=stsf+1;

        for(var i = 0;i<=stsf;i++){
       
        cpuu1+=parseFloat(matchedArray.Array[i].cpuUtilization);
        cpuf1+=parseFloat(matchedArray.Array[i].cpuFrequencyMHz);
        propw1+=parseFloat(matchedArray.Array[i].processorPowerWatt);
        cpej1+=parseFloat(matchedArray.Array[i].cumulativeProcessorEnergyJoules);
        cpewh1+=parseFloat(matchedArray.Array[i].cumulativeProcessorEnergymWh);
        ipw1+=parseFloat(matchedArray.Array[i].iaPowerWatt);
        ciaej1+=parseFloat(matchedArray.Array[i].cumulativeIAEnergyJoules);
         ciawh1+=parseFloat(matchedArray.Array[i].cumulativeIAEnergymWh);
         ptc1+=parseFloat(matchedArray.Array[i].packageTemperatureC);
         ph1+=parseFloat(matchedArray.Array[i].packageHot);
         dpt1+=parseFloat(matchedArray.Array[i].dramPowerWatt);
         cdej1+=parseFloat(matchedArray.Array[i].cumulativeDRAMEnergyJoules);
         cdwh1+=parseFloat(matchedArray.Array[i].cumulativeDRAMEnergymWh);
         gtpw1+=parseFloat(matchedArray.Array[i].gtPowerWatt);
         cghej1+=parseFloat(matchedArray.Array[i].cumulativeGTEnergyJoules);
         cghwh1+=parseFloat(matchedArray.Array[i].cumulativeGTEnergymWh);
         pp1w1+=parseFloat(matchedArray.Array[i].packagePL1Watt);
         pp2w1+=parseFloat(matchedArray.Array[i].packagePL2Watt);
         pp4w1+=parseFloat(matchedArray.Array[i].packagePL4Watt);
         ppp1w1+=parseFloat(matchedArray.Array[i].platformPsysPL1Watt);
         ppp2w1+=parseFloat(matchedArray.Array[i].platformPsysPL2Watt);
         gtfhz1+=parseFloat(matchedArray.Array[i].gtFrequencyMHz);
         gtu1+=parseFloat(matchedArray.Array[i].gtUtilization);

        }

        cpuu1/=dino1;
        cpuf1/=dino1;
        propw1/=dino1;
        cpej1/=dino1;
        cpewh1/=dino1;
        ipw1/=dino1;
        ciaej1/=dino1;
        ciawh1/=dino1;
        ptc1/=dino1;
        ph1/=dino1;
        dpt1/=dino1;
        cdej1/=dino1;
         cdwh1/=dino1;
         gtpw1/=dino1;
         cghej1/=dino1;
         cghwh1/=dino1;
         pp1w1/=dino1;
         pp2w1/=dino1;
         pp4w1/=dino1;
         ppp1w1/=dino1;
         ppp2w1/=dino1;
         gtfhz1/=dino1;
         gtu1/=dino1;

         const Array = {
        cpuUtilization: cpuu1,
        cpuFrequencyMHz: cpuf1,
        processorPowerWatt: propw1,
        cumulativeProcessorEnergyJoules:  cpej1,
        cumulativeProcessorEnergymWh:cpewh1,
        iaPowerWatt:ipw1,
        cumulativeIAEnergyJoules:ciaej1,
        cumulativeIAEnergymWh:ciawh1,
        packageTemperatureC:ptc1,
        packageHot:ph1,
        dramPowerWatt:dpt1,
        cumulativeDRAMEnergyJoules:cdej1,
        cumulativeDRAMEnergymWh:cdwh1,
        gtPowerWatt: gtpw1,
        cumulativeGTEnergyJoules:cghej1,
        cumulativeGTEnergymWh:cghwh1,
        packagePL1Watt:pp1w1,
        packagePL2Watt: pp2w1,
        packagePL4Watt: pp4w1,
        platformPsysPL1Watt: ppp1w1,
        platformPsysPL2Watt:  ppp2w1,
        gtFrequencyMHz: gtfhz1,
        gtUtilization: gtu1
        }

       // console.log(Array);

        const store = await storeds.updateOne(
        { name: name,email:email}, 
        { $push: { files: [{date:date,Backgroundprocess:Array }] } }
        );


       
     res.json({message:"Congrats we have put the background process data"})
      


      } else {
        console.log("No matching filename found.");
        res.json({message: "File not added." });
      }
    } else {
      console.log("No matching document found.");
      res.status(404).json({ message: "No matching document found." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({message: "An internal server error occurred." });
  }

}




}


exports.cal = async(req,res)=>{
   const name=req.body.name;
   //const filename = req.body.filename;
   const email = req.body.email;
   const date = req.body.date;
   const starttime = req.body.st;
   const endtime=req.body.ed;
   const softname = req.body.softname;

   console.log(name,email,starttime,endtime);

  try {
    
    const result = await powerlogs.findOne({ name: name , "files.date":date});
    //console.log(result);
    if (result && result.files && result.files.length > 0) {
      const dateFromRequest= new Date(date);
      console.log(dateFromRequest);
      const matchedArray = result.files.find((file) => file.date.getTime()===dateFromRequest.getTime());
      console.log(matchedArray);
      if (matchedArray) {
        //console.log("Matched Array:", matchedArray);
        //res.json(matchedArray);
        var st = 0;
        var ed = 0;
        var stsf=0;
        for(var i = 0 ; i < matchedArray.Array.length ; i++){
           
          
          if(starttime==matchedArray.Array[i].SystemTime){
                st=i;
            }
           
            if(endtime==matchedArray.Array[i].SystemTime){
                ed=i;
            }
        }
        //initial
       


        //final 
        var cpuu=0;
        var cpuf=0;
        var propw=0;
        var cpej=0;
        var cpewh=0;
        var ipw=0;
        var ciaej=0;
        var ciawh=0;
        var ptc=0;
        var ph=0;
        var dpt=0;
        var cdej=0;
        var cdwh=0;
        var gtpw=0;
        var cghej=0;
        var cghwh=0;
        var pp1w=0;
        var pp2w=0;
        var pp4w=0;
        var ppp1w=0;
        var ppp2w=0;
        var gtfhz=0;
        var gtu=0;
        
        var dino = ed-st+1;
        for(var i = st;i<=ed;i++){
       
          cpuu+=parseFloat(matchedArray.Array[i].cpuUtilization);
        cpuf+=parseFloat(matchedArray.Array[i].cpuFrequencyMHz);
        propw+=parseFloat(matchedArray.Array[i].processorPowerWatt);
        cpej+=parseFloat(matchedArray.Array[i].cumulativeProcessorEnergyJoules);
        cpewh+=parseFloat(matchedArray.Array[i].cumulativeProcessorEnergymWh);
        ipw+=parseFloat(matchedArray.Array[i].iaPowerWatt);
        ciaej+=parseFloat(matchedArray.Array[i].cumulativeIAEnergyJoules);
         ciawh+=parseFloat(matchedArray.Array[i].cumulativeIAEnergymWh);
         ptc+=parseFloat(matchedArray.Array[i].packageTemperatureC);
         ph+=parseFloat(matchedArray.Array[i].packageHot);
         dpt+=parseFloat(matchedArray.Array[i].dramPowerWatt);
         cdej+=parseFloat(matchedArray.Array[i].cumulativeDRAMEnergyJoules);
         cdwh+=parseFloat(matchedArray.Array[i].cumulativeDRAMEnergymWh);
         gtpw+=parseFloat(matchedArray.Array[i].gtPowerWatt);
         cghej+=parseFloat(matchedArray.Array[i].cumulativeGTEnergyJoules);
         cghwh+=parseFloat(matchedArray.Array[i].cumulativeGTEnergymWh);
         pp1w+=parseFloat(matchedArray.Array[i].packagePL1Watt);
         pp2w+=parseFloat(matchedArray.Array[i].packagePL2Watt);
         pp4w+=parseFloat(matchedArray.Array[i].packagePL4Watt);
         ppp1w+=parseFloat(matchedArray.Array[i].platformPsysPL1Watt);
         ppp2w+=parseFloat(matchedArray.Array[i].platformPsysPL2Watt);
         gtfhz+=parseFloat(matchedArray.Array[i].gtFrequencyMHz);
         gtu+=parseFloat(matchedArray.Array[i].gtUtilization);

        }

        cpuu/=dino;
        cpuf/=dino;
        propw/=dino;
        cpej/=dino;
        cpewh/=dino;
        ipw/=dino;
        ciaej/=dino;
         ciawh/=dino;
         ptc/=dino;
         ph/=dino;
         dpt/=dino;
         cdej/=dino;
         cdwh/=dino;
         gtpw/=dino;
         cghej/=dino;
         cghwh/=dino;
         pp1w/=dino;
         pp2w/=dino;
         pp4w/=dino;
         ppp1w/=dino;
         ppp2w/=dino;
         gtfhz/=dino;
         gtu/=dino;

        const existing = await storeds.find({name:name,email:email,"files.date":date});
        console.log(existing);
        const matched = existing[0].files.find((file) => file.date.getTime()===dateFromRequest.getTime());
        console.log(matched.Backgroundprocess);
        
        cpuu-=matched.Backgroundprocess.cpuUtilization;
        cpuf-=matched.Backgroundprocess.cpuFrequencyMHz;
        propw-=matched.Backgroundprocess.processorPowerWatt;
        cpej-=matched.Backgroundprocess.cumulativeProcessorEnergyJoules;
        cpewh-=matched.Backgroundprocess.cumulativeProcessorEnergymWh;
        ipw-=matched.Backgroundprocess.iaPowerWatt;
        ciaej-=matched.Backgroundprocess.cumulativeIAEnergyJoules;
         ciawh-=matched.Backgroundprocess.cumulativeIAEnergymWh;
         ptc-=matched.Backgroundprocess.packageTemperatureC;
         ph-=matched.Backgroundprocess.packageHot;
         dpt-=matched.Backgroundprocess.dramPowerWatt;
         cdej-=matched.Backgroundprocess.cumulativeDRAMEnergyJoules;
         cdwh-=matched.Backgroundprocess.cumulativeDRAMEnergymWh;
         gtpw-=matched.Backgroundprocess.gtPowerWatt;
         cghej-=matched.Backgroundprocess.cumulativeGTEnergyJoules;
         cghwh-=matched.Backgroundprocess.cumulativeGTEnergymWh;
         pp1w-=matched.Backgroundprocess.packagePL1Watt;
         pp2w-=matched.Backgroundprocess.packagePL2Watt;
         pp4w-=matched.Backgroundprocess.packagePL4Watt;
         ppp1w-=matched.Backgroundprocess.platformPsysPL1Watt;
         ppp2w-=matched.Backgroundprocess.platformPsysPL2Watt;
         gtfhz-=matched.Backgroundprocess.gtFrequencyMHz;
         gtu-=matched.Backgroundprocess.gtUtilization;

         const Array = {
        name:softname,
        cpuUtilization: cpuu,
        cpuFrequencyMHz: cpuf,
        processorPowerWatt: propw,
        cumulativeProcessorEnergyJoules:  cpej,
        cumulativeProcessorEnergymWh:cpewh,
        iaPowerWatt:ipw,
        cumulativeIAEnergyJoules:ciaej,
        cumulativeIAEnergymWh:ciawh,
        packageTemperatureC:ptc,
        packageHot:ph,
        dramPowerWatt:dpt,
        cumulativeDRAMEnergyJoules:cdej,
        cumulativeDRAMEnergymWh:cdwh,
        gtPowerWatt: gtpw,
        cumulativeGTEnergyJoules:cghej,
        cumulativeGTEnergymWh:cghwh,
        packagePL1Watt:pp1w,
        packagePL2Watt: pp2w,
        packagePL4Watt: pp4w,
        platformPsysPL1Watt: ppp1w,
        platformPsysPL2Watt:  ppp2w,
        gtFrequencyMHz: gtfhz,
        gtUtilization: gtu
        }
        
        //console.log(total);
  
        const storeddd = await storeds.updateOne(
      {
        name: name,
        email: email,
        "files.date": date,
      },
      {
        $push: {
          "files.$.software": Array,
        },
      }
    );

    
    console.log(storeddd);
      
    

      } else {
        console.log("No matching filename found.");
        res.status(404).json({ error: "No matching filename found." });
      }
    } else {
      console.log("No matching document found.");
      res.status(404).json({ error: "No matching document found." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
   
}