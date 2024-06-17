const { default: mongoose } = require("mongoose");
const { Account } = require("../models/Accounts");

const getBalance = async (req,res) =>{
    req.userId
    const account = await Account.findOne({userId:req.userId});
    return res.status(200).json({
        balance : account.balance
    })
}

const tranferMoney = async (req,res) =>{
    const to = req.body.to;
    const amount = req.body.amount;

    const selfAccount = Account.findOne({userId:req.userId});
    if ( !selfAccount ||selfAccount.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    const toAccount = await Account.findOne({userId: to});
    //if to account does not exist
    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });


    return res.status(200).json({
        message: "Transfer successful"
    })
}

module.exports = {
    getBalance,
    tranferMoney
}