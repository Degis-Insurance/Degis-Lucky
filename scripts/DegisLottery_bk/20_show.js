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
      console.log(new Date().getTime())
      const degisToken = await DegisToken.deployed()
      const mockUSD = await MockUSD.deployed()
      const lottery = await DegisLottery.deployed()
      const rand = await RandomNumberGenerator.deployed()
      const address = await web3.eth.getAccounts()
      console.log("degis:",degisToken.address)
      console.log("mockUSD",mockUSD.address)
      console.log("lottery",lottery.address)
      const user0 = address[0]
      const user1 = address[1]
      const user2 = address[2]  
			console.log(user0)
			console.log(user1)
			console.log(user2)
		}
    catch (err) {
      callback(err)
    }

}
