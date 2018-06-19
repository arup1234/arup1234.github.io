"use strict";

var RegisterAccount = function(signUpFields) {
	if (signUpFields) {
		var obj = JSON.parse(signUpFields);
        this.fullName = obj.name;
		this.userName = obj.userName;
		this.email = obj.email;
        this.password = obj.password;
        this.blockchainAddress = obj.blockchainAddress;
        this.date = obj.date;
        this.blogCollection = obj.blogCollection;
	} else {
        this.fullName = "";
	    this.userName = "";
        this.email = "";
        this.password = "";
        this.blockchainAddress = "";
        this.date = "";
        this.blogCollection = "";
	}
};

RegisterAccount.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var BlockchainDiary = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (signUpFields) {
            return new RegisterAccount(signUpFields);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

BlockchainDiary.prototype = {
    init: function () {
        // todo
    },

    signUp: function(name, userName, email, password){
        name = name.trim();
        userName = userName.trim();
        email = email.trim();
        password = password.trim();
        var existingUserAccount = this.repo.get(userName);
        if(existingUserAccount!=null){
            throw new Error("Sorry, this username already exists. Please change it and try again.");
        }
        else{
        var registerAccount = new RegisterAccount();
        registerAccount.fullName = name;
        registerAccount.userName = userName;
        registerAccount.email = email;
        registerAccount.password = password;
        registerAccount.blockchainAddress = Blockchain.transaction.from;
        registerAccount.date = new Date();
        registerAccount.blogCollection = [];
        this.repo.put(userName, registerAccount);
    }
    },

    authenticateSignUp: function(name, userName, email, password){
        if(this.repo.get(userName)!=null){
            throw new Error("Sorry, this username already exists. Please change it and try again.");
        }else{
            var abc=[];
            var registerAccount = new RegisterAccount();
            registerAccount.fullName = name;
            registerAccount.userName = userName;
            registerAccount.email = email;
            registerAccount.password = password;
            return registerAccount;
        }
    },

    logIn: function(userName, password){
        userName = userName.trim();
        password = password.trim();
        var userAccount = this.repo.get(userName);
        if(userAccount!=null && userAccount!=''){
            if(userAccount.password!=password){
                throw new Error("You have entered an incorrect password.");
            }
            else{
                return userAccount;
            }
        }
        else{
            throw new Error("You don't have an account with us.");
        }
    }
};
module.exports = BlockchainDiary;