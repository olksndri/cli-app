module.exports = () => {
  const symbols =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
  let randomId = "";

  for (let i = 1; i <= 21; i++) {
    const cryptoKey = Math.ceil(Math.random() * symbols.length);
    randomId += symbols[cryptoKey];
  }

  return randomId;
};
