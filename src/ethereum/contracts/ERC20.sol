//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./IERC20.sol";
import "./IERC20Metadata.sol";

contract ERC20 is IERC20, IERC20Metadata{

    mapping(address => uint256) private _balance;
    mapping(address => mapping(address => uint256)) private _allowance;

    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    constructor(string memory name, string memory symbol) {
        _name = name;
        _symbol = symbol;
    }

    function name() public view override returns(string memory) {
        return _name;
    }

    function symbol() public view override returns(string memory) {
        return _symbol;
    }

    function decimals() public view override returns(uint8) {
        return 18;
    }

    function totalSupply() public view override returns(uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns(uint256) {
        return _balance[account];
    }

    function transfer(address to, uint256 amount) public override returns(bool) {
        address owner = msg.sender;
        _tranfer(owner, to, amount);
        return true;
    }

    function allowance(address owner, address spender) public view override returns(uint256) {
        return _allowance[owner][spender];
    }

    function approve(address spender, uint256 amount) external override returns(bool) {
        address owner = msg.sender;
        _approve(owner, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external override returns(bool) {
        address spender = msg.sender;
        _spendAllowance(from, spender, amount);
        _trasnfer(from, to, amount);
        return true;
    }

}