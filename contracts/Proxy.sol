pragma solidity ^0.5.0;

import "./ProxyStorage.sol";

contract Proxy is ProxyStorage {

    address public implementation;
    function setImplementation(address _address) public {
        implementation = _address;
    }

    function () payable external {
        address _impl = implementation;
        require(_impl != address(0));

        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize)

            let result := delegatecall(gas, _impl, ptr, calldatasize, 0, 0)
            let size := returndatasize
            returndatacopy(ptr, 0, size)

            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }
}
