// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./lib/SafeMath.sol";
import "./lib/Types.sol";
import "./lib/LibOwnable.sol";

contract DegisStorage is LibOwnable, Types {
    using SafeMath for uint256;

    uint256 public constant DIVISOR = 1000;

    uint256 public epochId = 0;

    /// @dev max count of user code in one address.
    uint256 public maxCount = 50;

    uint256 public minAmount = 10 ether;

    uint256 public minGasLeft = 100000;

    /// @dev POS delegate require at least 100 WAN for first delegateIn.
    uint256 public firstDelegateMinValue = 100 ether;

    /// @dev map: userAddress => UserInfo struct
    mapping(address => UserInfo) public userInfoMap;

    /// @dev map: userCode => CodeInfo struct (code is user's jackpot number)
    mapping(uint256 => CodeInfo) public indexCodeMap;

    //------Data for pending stake out-----------------------
    uint256 public pendingRedeemStartIndex;
    uint256 public pendingRedeemCount;

    /// @dev map: index => PendingRedeem struct (index start from 0)
    mapping(uint256 => PendingRedeem) public pendingRedeemMap;

    /// @dev map: userAddress => redeemCode => 0:user not redeem, 1:user is Redeeming
    mapping(address => mapping(uint256 => uint256))
        public pendingRedeemSearchMap;

    //------Data for pending prize out-----------------------
    uint256 public pendingPrizeWithdrawStartIndex;
    uint256 public pendingPrizeWithdrawCount;

    /// @dev map: index => address (index start from pendingPrizeWithdrawStartIndex)
    mapping(uint256 => address) public pendingPrizeWithdrawMap;

    //------Data for validator info-----------------------
    ValidatorsInfo public validatorsInfo;

    /// @dev map: index => validatorAddress (index start from 0)
    mapping(uint256 => address) public validatorsMap;

    /// @dev map: validatorAddress => index
    mapping(address => uint256) public validatorIndexMap;

    /// @dev map: validatorAddress => delegateAmount
    mapping(address => uint256) public validatorsAmountMap;

    /// @dev The amount of waiting delegate out amount
    uint256 public delegateOutAmount;

    SubsidyInfo public subsidyInfo;

    /// @dev map: subsidyAddress => subsidyAmount
    mapping(address => uint256) public subsidyAmountMap;

    address public operator;

    bool public closed = false;

    uint256 public maxDigital = 10000;

    uint256 public currentRandom;

    /// @dev address for POS delegateIn delegateOut
    address public posPrecompileAddress = address(0xda);

    /// @dev address for random number get
    address public randomPrecompileAddress = address(0x262);

    mapping(uint256 => EpochInfo) public epochInfo;
}
