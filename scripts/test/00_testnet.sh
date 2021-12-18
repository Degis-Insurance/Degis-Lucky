env=rinkeby
sleep_time1=2
sleep_time2=2
sleep_time3=20

#echo truffle migrate --network $env  --reset
sleep $sleep_time3; truffle exec scripts/test/01_startLottery.js --network $env


