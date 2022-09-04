// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// In order to call a function using only the data field of call, we need to encode:
// The function name
// The parameters needed
// Down to the Binary

// The function selector is the first 4 bytes of the function signature
// The function signature is the string that defines the function name and parameters

// Example
// Function Signature: "transfer(address, uint256)"  => Function Selector: 0xa9059cbb

contract CallAnything {
    address public s_someAddress;
    uint256 public s_amount;

    function transfer(address someAddress, uint256 amount) public {
        s_someAddress = someAddress;
        amount = s_amount;
    }

    function getSelectorOne() public pure returns (bytes4 selector) {
        selector = bytes4(keccak256(bytes("transfer(address,uint256)")));
    }

    function getDataToCallTransfer(address someAddress, uint256 amount)
        public
        pure
        returns (bytes memory)
    {
        return abi.encodeWithSelector(getSelectorOne(), someAddress, amount);
    }

    function callTransferFunctionDirectly(address someAddress, uint256 amount)
        public
        returns (bytes4, bool)
    {
        (bool success, bytes memory returnData) = address(this).call(
            /* getDataToCallTransfer(someAddress, amount) */
            abi.encodeWithSelector(getSelectorOne(), someAddress, amount)
        );
        return (bytes4(returnData), success);
    }

    function callTransferFunctionDirectlySig(address someAddress, uint256 amount)
        public
        returns (bytes4, bool)
    {
        (bool success, bytes memory returnData) = address(this).call(
            /* getDataToCallTransfer(someAddress, amount) */
            abi.encodeWithSignature("transfer(address,uint256)", someAddress, amount)
        );
        return (bytes4(returnData), success);
    }
}
