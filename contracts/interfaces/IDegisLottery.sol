// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

interface IDegisLottery {
    /**
     * @notice Buy tickets for the current lottery round
     * @dev Can not be called by a smart contract
     * @param _ticketNumbers array of ticket numbers between 0 and 9999
     * @param _ticketAmounts array of ticket amount
     */
    function buyTickets(
        uint256[] calldata _ticketNumbers,
        uint256[] calldata _ticketAmounts
    ) external;

    /**
     * @notice Redeem tickets for all lottery
     * @param _ticketNumbers Array of ticket numbers
     * @dev Callable by users
     */
    function redeemTickets(uint256[] calldata _ticketNumbers) external;

    /**
     * @notice Receive all awards from lottery before lottery id
     * @param _lotteryId lottery id
     * @dev Callable by users only, not contract!
     */
    function receiveAwards(uint256 _lotteryId) external;

    /**
     * @notice Close a lottery
     * @dev Callable only by the operator
     */
    function closeLottery() external;

    /**
     * @notice Draw the final number, calculate reward in DEG for each group, 
               and make this lottery claimable (need to wait for the random generator)
     * @dev Callable only by the operator
     */
    function drawLottery() external;

    /**
     * @notice Inject funds
     * @param _amount amount to inject 
     * @dev Callable by owner(incentive) or injector address(insurancePool income)
            First transfer USD and then call this function to record
     */
    function injectFunds(uint256 _amount) external;

    /**
     * @notice Start the lottery
     * @dev Callable only by operator
     * @param _endTime endTime of the lottery (timestamp in s)
     * @param _stageProportion breakdown of rewards per bracket (must sum to 10,000)(100 <=> 1)
     */
    function startLottery(
        uint256 _endTime,
        uint256[4] calldata _stageProportion
    ) external;

    /**
     * @notice View current lottery id
     */
    function viewCurrentLotteryId() external view returns (uint256);
}
