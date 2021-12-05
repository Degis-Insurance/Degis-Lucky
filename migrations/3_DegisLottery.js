const FUJI_LINK_ADDRESS = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846";
const FUJI_JOBID = "1755320a535b4fcd9aa873ca616204d6";
const FUJI_CHAINLINK_ORACLE = "0x7D9398979267a6E050FbFDFff953Fc612A5aD4C9";
const URL = "http://47.98.184.198:6689/RandomNumber";
const PATH = "RandomNumber";

const DegisToken = artifacts.require("lib/DegisToken");
const MockUSD = artifacts.require("lib/MockUSD");

const DegisLottery = artifacts.require("DegisLottery");

const usd_rinkeby = "0xAc141573202C0c07DFE432EAa1be24a9cC97d358";
const degis_rinkeby = "0x6d3036117de5855e1ecd338838FF9e275009eAc2";

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
