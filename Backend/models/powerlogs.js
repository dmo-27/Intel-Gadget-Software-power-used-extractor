const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
  
  name: String,
  password:String,
  email:String,
  
files:[{
  filename:String,
  date:Date,
  Array:[{
  SystemTime: String,
  rdtsc: String,
  elapsedTimeSec: String,
  cpuUtilization: String,
  cpuFrequencyMHz: String,
  processorPowerWatt: String,
  cumulativeProcessorEnergyJoules: String,
  cumulativeProcessorEnergymWh: String,
  iaPowerWatt: String,
  cumulativeIAEnergyJoules: String,
  cumulativeIAEnergymWh: String,
  packageTemperatureC: String,
  packageHot: String,
  dramPowerWatt: String,
  cumulativeDRAMEnergyJoules: String,
  cumulativeDRAMEnergymWh: String,
  gtPowerWatt: String,
  cumulativeGTEnergyJoules: String,
  cumulativeGTEnergymWh: String,
  packagePL1Watt: String,
  packagePL2Watt: String,
  packagePL4Watt: String,
  platformPsysPL1Watt: String,
  platformPsysPL2Watt: String,
  gtFrequencyMHz: String,
  gtUtilization: String,
}]
}]

  }
  
) 

module.exports = powerlogss = mongoose.model("powerlogs", LogSchema);