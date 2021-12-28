const DegisToken = artifacts.require("./lib/DegisToken");
const MockUSD = artifacts.require("./lib/MockUSD");
const DegisLottery = artifacts.require("DegisLottery");
const RandomNumberGenerator = artifacts.require("RandomNumberGenerator");
const LinkTokenInterface = artifacts.require("LinkTokenInterface");

// const degis_rinkeby = "0x0f799713D3C34f1Cbf8E1530c53e58a59D9F6872";
// const usd_rinkeby = "0xF886dDc935E8DA5Da26f58f5D266EFdfDA1AD260";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = async (callback) => {
  try {
    console.log("----------- Start draw -------------");
    // const degisToken = await DegisToken.at(degis_rinkeby);
    // const mockUSD = await MockUSD.at(usd_rinkeby);
    const degisToken = await DegisToken.deployed()
    const mockUSD = await MockUSD.deployed()
    const lottery = await DegisLottery.deployed();
    const rand = await RandomNumberGenerator.deployed();

    const address = await web3.eth.getAccounts();
    const user0 = address[0];
    const user1 = address[1];
    const user2 = address[2];

    const currentLotteryId = await lottery.viewCurrentLotteryId();

    // const tx = await rand.getRandomNumber({ from: user0 });
    const result = await rand.randomResult.call();
    console.log("result:", parseInt(result));

    const tx2 = await lottery.drawFinalNumberAndMakeLotteryClaimable(
      currentLotteryId,
      1,
      { from: user0 }
    );
    console.log(tx2.tx);

    // console.log("----------- sleep 10s -------------")
    // await sleep(10000)
    // console.log("----------- end sleep -------------")

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
      "CONTRACT CURRENT LOTTERY FINAL NUMBER",
      lotteryInfo.finalNumber
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
    console.log(
      "[INFO]:",
      "CONTRACT PENDING AWARDS",
      currentLotteryId.toString(),
      web3.utils.fromWei(lotteryInfo.pendingAwards.toString())
    );
    const pendingInjectionNextLottery =
      await lottery.pendingInjectionNextLottery.call();
    console.log(
      "[INFO]:",
      "CONTRACT NEXT ROUND OF MONEY",
      web3.utils.fromWei(pendingInjectionNextLottery.toString())
    );
    // const user1Awadrs = await lottery.viewClaimAllTickets(currentLotteryId, {
    //   from: user1,
    // });
    // const user2Awadrs = await lottery.viewClaimAllTickets(currentLotteryId, {
    //   from: user2,
    // });

    // console.log("[INFO]:", "USER1 AWADRS", user1Awadrs);
    // console.log("[INFO]:", "USER2 AWADRS", user2Awadrs);

    // for (var i=0;i<40;i++)
    // {
    //   u = await lottery.viewRewardsForTicketId(currentLotteryId, i)
    //   console.log('[INFO]:', i,web3.utils.fromWei(u.toString()));
    // }

    console.log("----------- End draw -------------");
    callback(true);
  } catch (err) {
    callback(err);
  }
};
