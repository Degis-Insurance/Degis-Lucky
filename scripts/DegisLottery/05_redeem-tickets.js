const DegisToken = artifacts.require("./lib/DegisToken");
const MockUSD = artifacts.require('./lib/MockUSD');
const DegisLottery = artifacts.require('DegisLottery')
const RandomNumberGenerator = artifacts.require('RandomNumberGenerator')
const LinkTokenInterface = artifacts.require('LinkTokenInterface')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showticket(ticketsResponse) {
    const [ticketIds, ticketNumbers, ticketStatuses] = ticketsResponse
    if (ticketIds.length > 0) {
        return {
       
            id: ticketId.toString(),
            number: ticketNumbers[index].toString(),
            status: ticketStatuses[index],
        
        }
    }
    
}

module.exports = async callback => {
  	try {
		console.log("----------- Start redeem -------------") 
    	const degisToken = await DegisToken.deployed()
  		const lottery = await DegisLottery.deployed()
  		const rand = await RandomNumberGenerator.deployed()
		const address = await web3.eth.getAccounts()
        const user0 = address[0]
		const user1 = address[1]
		const user2 = address[2]

        const ticketNumbers = [0000, 1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999, 1999]

        
		const tx1 = await lottery.redeemTickets(ticketNumbers, { from: user1 });
		console.log(tx1.tx)

        // var x=1111
        // var pos = 2
        // const user1TicketsResponse = await lottery.viewUserTicketsInfo(user1,x,x+3, pos,{from: user1})
        // const user2TicketsResponse = await lottery.viewUserTicketsInfo(user2,x,x+3, pos,{from: user2})
        // const poolTicketsResponse = await lottery.viewPoolInfo(x,x+3,pos)
        // console.log("[INFO]","USER1 Tickets:")
        // console.log(user1TicketsResponse[0].toString())
        // console.log(user1TicketsResponse[1].toString())
        // console.log(user1TicketsResponse[2].toString())

        // console.log("[INFO]","USER2 Tickets:")
        // console.log(user2TicketsResponse[0].toString())
        // console.log(user2TicketsResponse[1].toString())
        // console.log(user1TicketsResponse[2].toString())


        // console.log("[INFO]","POOL Tickets:")
        // console.log(poolTicketsResponse[0].toString())
        // console.log(poolTicketsResponse[1].toString())
        // console.log(poolTicketsResponse[2].toString())

        // contractDegisBalance = await degisToken.balanceOf(lottery.address)
        // user1DegisTokenBalance = await degisToken.balanceOf(user1)
        // user2DegisTokenBalance = await degisToken.balanceOf(user2)
        // console.log('[INFO]:', 'CONTRACT DEGIS BALANCE', web3.utils.fromWei(contractDegisBalance.toString()))
        // console.log('[INFO]:', 'USER1 DEGIS BALANCE', web3.utils.fromWei(user1DegisTokenBalance.toString()))
        // console.log('[INFO]:', 'USER2 DEGIS BALANCE', web3.utils.fromWei(user2DegisTokenBalance.toString()))
        console.log("----------- End redeem -------------") 
		callback(true)
  	}
  	catch (err) {
    	callback(err)
  	}
}