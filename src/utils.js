const delay = (ms, whatToReturn) => new Promise((res) => setTimeout(() => res(whatToReturn), ms));
module.exports = {
    delay,
};
