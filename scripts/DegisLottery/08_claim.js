const DegisToken = artifacts.require("./lib/DegisToken");
const MockUSD = artifacts.require('./lib/MockUSD');
const DegisLottery = artifacts.require('DegisLottery')
const RandomNumberGenerator = artifacts.require('RandomNumberGenerator')
const LinkTokenInterface = artifacts.require('LinkTokenInterface')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
module.exports = async callback => {
    try {
      console.log("----------- Start claim -------------") 
      const degisToken = await DegisToken.deployed()
      const mockUSD = await MockUSD.deployed()
      const lottery = await DegisLottery.deployed()
      const rand = await RandomNumberGenerator.deployed()

      const address = await web3.eth.getAccounts()
      const user0 = address[0]
      const user1 = address[1]
      const user2 = address[2]

      const currentLotteryId = await lottery.viewCurrentLotteryId()
      // await lottery.receiveAward(currentLotteryId, {from:user1});

      const user1Awadrs = await lottery.receiveAward(currentLotteryId, user1,{from:user1})
      const user2Awadrs = await lottery.receiveAward(currentLotteryId, user2,{from:user2})

      console.log('[INFO]:', 'USER1 AWADRS', web3.utils.fromWei(user1Awadrs.toString()))
      console.log('[INFO]:', 'USER2 AWADRS', web3.utils.fromWei(user2Awadrs.toString()))

      user1USDTokenBalance = await mockUSD.balanceOf(user1)
      user2USDTokenBalance = await mockUSD.balanceOf(user2)
      console.log('[INFO]:', 'USER1 USD BALANCE', web3.utils.fromWei(user1USDTokenBalance.toString()))
      console.log('[INFO]:', 'USER2 USD BALANCE', web3.utils.fromWei(user2USDTokenBalance.toString()))

      console.log("----------- End claim -------------") 
      callback(true)
    }
    catch (err) {
      callback(err)
    }
  }