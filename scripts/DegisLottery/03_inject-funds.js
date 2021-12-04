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
    console.log("----------- Start inject funds -------------");
    const degisToken = await DegisToken.at(degis_rinkeby);
    const mockUSD = await MockUSD.at(usd_rinkeby);
    const user0 = (await web3.eth.getAccounts())[0];
    const lottery = await DegisLottery.deployed();

    const amount = web3.utils.toWei("100", "ether");
    const currentLotteryId = await lottery.viewCurrentLotteryId();
    await mockUSD.approve(lottery.address, amount, { from: user0 });
    await lottery.injectFunds(currentLotteryId, amount);

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

    console.log("----------- End inject funds -------------");
    callback(true);
  } catch (err) {
    callback(err);
  }
};
