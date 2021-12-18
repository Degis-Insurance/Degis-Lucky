const FUJI_LINK_ADDRESS = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846";
const FUJI_JOBID = "1755320a535b4fcd9aa873ca616204d6";
const FUJI_CHAINLINK_ORACLE = "0x7D9398979267a6E050FbFDFff953Fc612A5aD4C9";
const URL = "http://47.98.184.198:6689/RandomNumber";
const PATH = "RandomNumber";

const DegisLottery = artifacts.require("DegisLottery");

const usd_rinkeby = "0xF886dDc935E8DA5Da26f58f5D266EFdfDA1AD260";
const degis_rinkeby = "0x0f799713D3C34f1Cbf8E1530c53e58a59D9F6872";

const fs = require("fs");

module.exports = async function (deployer, network) {
  const addressList = JSON.parse(fs.readFileSync("address.json"));

  const RandomNumberGenerator_add = addressList.RandomNumberGenerator;

  await deployer.deploy(
    DegisLottery,
    degis_rinkeby,
    usd_rinkeby,
    RandomNumberGenerator_add
  );

  addressList.DegisLottery = DegisLottery.address;

  fs.writeFileSync("address.json", JSON.stringify(addressList, null, "\t"));
};
