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
    console.log("----------- Start new lottery -------------");
    const degisToken = await DegisToken.at(degis_rinkeby);
    const mockUSD = await MockUSD.at(usd_rinkeby);
    const lottery = await DegisLottery.deployed();
    const rand = await RandomNumberGenerator.deployed();

    let address = (await web3.eth.getAccounts())[0];
    const pre_tx = await lottery.setOperatorAndTreasuryAndInjectorAddresses(
      address,
      address,
      address,
      { from: address }
    );
    // console.log(pre_tx.tx)

    // start lottery
    let timestamp = new Date().getTime();
    timestamp = parseInt(timestamp / 1000 + 3600); // 1h
    // console.log("end time stamp:", timestamp)

    const tx1 = await lottery.startLottery(
      timestamp,
      web3.utils.toBN(10e18),
      [2000, 2000, 2000, 2000],
      0,
      { from: address }
    );

    const currentLotteryId = await lottery.viewCurrentLotteryId();

    const lotteryInfo = await lottery.viewLottery(currentLotteryId);
    const contractMockUSDBalance = await mockUSD.balanceOf(lottery.address);
    const contractDegisBalance = await degisToken.balanceOf(lottery.address);
    console.log(
      "[INFO]:",
      "CONTRACT CUCCENT LOTTERY ID",
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

    callback(true);
  } catch (err) {
    callback(err);
  }
};
