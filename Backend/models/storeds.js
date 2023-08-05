const mongoose = require("mongoose");

const StorageSchema = new mongoose.Schema(
  {
   name:String,
   email:String,
   files:[
    { name:String,
      date:Date,
      Backgroundprocess:{
        cpuUtilization: Number,
        cpuFrequencyMHz: Number,
        processorPowerWatt: Number,
        cumulativeProcessorEnergyJoules: Number,
        cumulativeProcessorEnergymWh: Number,
        iaPowerWatt: Number,
        cumulativeIAEnergyJoules:Number,
        cumulativeIAEnergymWh: Number,
        packageTemperatureC: Number,
        packageHot: Number,
        dramPowerWatt: Number,
        cumulativeDRAMEnergyJoules: Number,
        cumulativeDRAMEnergymWh: Number,
        gtPowerWatt: Number,
        cumulativeGTEnergyJoules: Number,
        cumulativeGTEnergymWh: Number,
        packagePL1Watt: Number,
        packagePL2Watt: Number,
        packagePL4Watt: Number,
        platformPsysPL1Watt: Number,
        platformPsysPL2Watt: Number,
        gtFrequencyMHz: Number,
        gtUtilization: Number,
      },
      
      software:[
        {
        name:String,
        cpuUtilization: Number,
        cpuFrequencyMHz: Number,
        processorPowerWatt: Number,
        cumulativeProcessorEnergyJoules: Number,
        cumulativeProcessorEnergymWh: Number,
        iaPowerWatt: Number,
        cumulativeIAEnergyJoules:Number,
        cumulativeIAEnergymWh: Number,
        packageTemperatureC: Number,
        packageHot: Number,
        dramPowerWatt: Number,
        cumulativeDRAMEnergyJoules: Number,
        cumulativeDRAMEnergymWh: Number,
        gtPowerWatt: Number,
        cumulativeGTEnergyJoules: Number,
        cumulativeGTEnergymWh: Number,
        packagePL1Watt: Number,
        packagePL2Watt: Number,
        packagePL4Watt: Number,
        platformPsysPL1Watt: Number,
        platformPsysPL2Watt: Number,
        gtFrequencyMHz: Number,
        gtUtilization: Number,

        }
      ]

    }

  ]
   
   

  });

  module.exports = storeds = mongoose.model("stored", StorageSchema);