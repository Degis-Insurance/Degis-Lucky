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

      const currentLotteryId = await lottery.viewCurrentLotteryId()
      const lotteryInfo = await lottery.lotteries(currentLotteryId);
      const weight = await lottery.getCurrentWeight();
      



      for(var i=1;i<=2;i++)
      {
        //余额
        console.log()
        console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
        console.log('[INFO]:','USER',i, address[i])

        console.log("BALANCE INFO")
        DegisTokenBalance = await degisToken.balanceOf(address[i])
        mockUSDBalance = await mockUSD.balanceOf(address[i])
        console.log('[INFO]:', 'USER DEGIS BALANCE', web3.utils.fromWei(DegisTokenBalance.toString()))
        console.log('[INFO]:', 'USER USD BALANCE', web3.utils.fromWei(mockUSDBalance.toString()))
      
        //票
        
        console.log("TICKETS INFO:")
        const ticketsResponse = await lottery.viewUserAllTicketsInfo(address[i],100)
        
        x=[[],[],[]];
        for(let k=0;k<3;k++)
        {
          for(let j=0;j<ticketsResponse[3];j++)
          {
            if(k==2)
              x[k].push((ticketsResponse[k][j] /weight).toFixed(2).toString())
            else
              x[k].push(ticketsResponse[k][j].toString())
          }
        }
        for(let k=0;k<3;k++)
          console.log(x[k].toString())
          
        // tickets = [0000, 1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999, 1999]
        // x=[[],[],[]]
        // for(let j=0;j<tickets.length;j++){
        //   const ticketsResponse = await lottery.viewUserTicketsInfo(address[i],tickets[j],tickets[j], 3,{from: address[i]})
        //   for(let k=0;k<3;k++)
        //   {
        //     if(k==2)
        //     {
        //       x[k].push((ticketsResponse[k]/weight).toFixed(2).toString())
        //     }
        //     else
        //     {
        //       x[k].push(ticketsResponse[k].toString())
        //     }
        //   }
        // // }
        // for(let k=0;k<3;k++)
        //   console.log(x[k].toString())

        //获奖情况
        console.log("REWARD INFO")
        x=[[],[],[]]
        // console.log(lotteryInfo.status.toString(),lotteryInfo.status.toString() != '3')
        if(lotteryInfo.status.toString() != '3')
        {
          if(currentLotteryId-1 < 1){
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')  
            continue
          }
          var userRewards = await lottery.viewUserRewardsInfo(address[i], 1, currentLotteryId-1)
        }
        else{
          if(currentLotteryId < 1){
            console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^') 
            continue
          }
          var userRewards = await lottery.viewUserRewardsInfo(address[i], 1, currentLotteryId)
        }
        for(j = 0 ; j < userRewards[0].length; j++)
        {
          for(k = 0; k < 3; k++)
          {
            if(k==1){
              x[k].push(web3.utils.fromWei(userRewards[k][j]).toString())
            }
            else
            {
              x[k].push(userRewards[k][j].toString())
            }
          }
        }
        for(let k=0;k<3;k++)
          console.log(x[k].toString())  
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')      
      }


      console.log()
      console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
      console.log('[INFO]:','POOL', lottery.address)
      console.log("BALANCE INFO")
      DegisTokenBalance = await degisToken.balanceOf(lottery.address)
      mockUSDBalance = await mockUSD.balanceOf(lottery.address)
      console.log('[INFO]:', 'POOL DEGIS BALANCE', web3.utils.fromWei(DegisTokenBalance.toString()))
      console.log('[INFO]:', 'POOL USD BALANCE', web3.utils.fromWei(mockUSDBalance.toString()))

      console.log("TICKETS INFO:")
      tickets = [0000, 1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999, 1999]
      x=[[],[],[]]
      for(let j=0;j<tickets.length;j++){
        const ticketsResponse = await lottery.viewPoolTicketsInfo(tickets[j],tickets[j], 3,{from: address[0]})
        for(let k=0;k<3;k++)
        {
          if(k==2)
          {
            x[k].push((ticketsResponse[k]/weight).toFixed(2).toString())
          }
          else
          {
            x[k].push(ticketsResponse[k].toString())
          }
        }
      }
      for(let k=0;k<3;k++)
        console.log(x[k].toString())
      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^') 



      console.log()
      console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
      for(var i=1;i<=currentLotteryId;i++)
      {
        var info = await lottery.viewLottery(i);
        let injectedAwards = web3.utils.fromWei(info['injectedAwards'])
        let pendingAwards = web3.utils.fromWei(info['pendingAwards'])
        console.log(i)
        console.log("status",info.status)
        console.log("finalNumber",info.finalNumber)
        console.log("injectedAwards",injectedAwards)
        console.log("pendingAwards",pendingAwards)
        x=[]
        for(k=0;k<4;k++)
          x.push(web3.utils.fromWei(info['stageReward'][k]))
        console.log("stageReward",x)
        x=[]
        for(k=0;k<4;k++)
          x.push(info['stageAmount'][k])
        console.log("stageAmount",x)
        x=[]
        for(k=0;k<4;k++)
          x.push(info['stageWeight'][k])
        console.log("stageWeight",x)
        // console.log(info)
      }
      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
      //

      // var w =  ((1+24)/(1+12) * 20 + (2+24)/(2+12) * 20) / ((2+24)/(2+12))
      // console.log(w)
      // const poolTicketsResponse = await lottery.viewPoolInfo(x,x+3,pos)
		}
    catch (err) {
      callback(err)
    }

}
