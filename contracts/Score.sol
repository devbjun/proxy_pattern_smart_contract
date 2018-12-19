pragma solidity ^0.5.0;

import "./ScoreStorage.sol";

contract ScoreV1 is ScoreStorage {
    function setScore(uint256 _score) public {
        score = _score;
    }
}

contract ScoreV2 is ScoreStorage {
    function setScore(uint256 _score) public {
        score += _score + 1;
    }
}
