const DegisToken = artifacts.require("./lib/DegisToken");
const MockUSD = artifacts.require("./lib/MockUSD");
const DegisLottery = artifacts.require("DegisLottery");
const RandomNumberGenerator = artifacts.require("RandomNumberGenerator");
const LinkTokenInterface = artifacts.require("LinkTokenInterface");

const degis_rinkeby = "0x6d3036117de5855e1ecd338838FF9e275009eAc2";
const usd_rinkeby = "0xAc141573202C0c07DFE432EAa1be24a9cC97d358";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = async (callback) => {
  try {
    console.log("----------- Start close lottery -------------");
    const degisToken = await DegisToken.at(degis_rinkeby);
    const mockUSD = await MockUSD.at(usd_rinkeby);
    const lottery = await DegisLottery.deployed();
    console.log(lottery.address);

    const rand = await RandomNumberGenerator.deployed();
    // await rand.setLotteryAddress(lottery.address);
    let address = (await web3.eth.getAccounts())[0];
    const currentLotteryId = await lottery.viewCurrentLotteryId();
    const tx1 = await lottery.closeLottery(currentLotteryId, { from: address });
    console.log(tx1.tx);

    const lotteryInfo = await lottery.viewLottery(currentLotteryId);
    const contractMockUSDBalance = await mockUSD.balanceOf(lottery.address);
    const contractDegisBalance = await degisToken.balanceOf(lottery.address);
    console.log(
      "[INFO]:",
      "CONTRACT CURRENT LOTTERY ID",
      currentLotteryId.toString()
    );
    console.log(
      "[INFO]:",
      "CONTRACT CURRENT LOTTERY STATUS",
      lotteryInfo.status
    );
    console.log(
      "[INFO]:",
      "CONTRACT DEGIS BALANCE",
      web3.utils.fromWei(contractDegisBalance.toString())
    );
    console.log(
      "[INFO]:",
      "CONTRACT USD BALANCE",
      web3.utils.fromWei(contractMockUSDBalance.toString())
    );

    console.log("----------- End close lottery -------------");

    callback(true);
  } catch (err) {
    callback(err);
  }
};
