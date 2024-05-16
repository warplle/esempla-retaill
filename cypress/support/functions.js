
function generateRandomNumber(length) {
    const chars = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function generateRandomStringOnlyLowerCase(length) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function generateRandomStringOnlyUpperCase(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  

function generateRandomStringWithNumbers(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

function generateRandomStringRU(length) {
    const chars = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

function generateRandomEmail(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result + "@example.com";
}

function getAdminBaseUrl() {
    return "https://cabinet.retail.esempla.systems/login?prefix=iamadmin";
};

function getAdminUserName(){
    return "sa.admin";
};

function getAdminPassword(){
    return "123qweASD";
};

function getInvestorBaseUrl(){
  return "https://retail.esempla.systems/";
};

function getInvestorIDNP(){
  return "2004028049502";
};

function getInvestorPassword(){
  return "2004028049502";
};





export {
     getAdminBaseUrl,
     getAdminUserName, 
     getAdminPassword,
     generateRandomNumber,
     generateRandomString,
     generateRandomStringOnlyUpperCase,
     generateRandomStringOnlyLowerCase,
     generateRandomStringWithNumbers,
     generateRandomStringRU,
     generateRandomEmail,
     getInvestorBaseUrl,
     getInvestorIDNP,
     getInvestorPassword
};