const normalizeChallenge = (input) => {
  return input.replace(/-/g, "+").replace(/_/g, "/").replace(/=*$/, "");
};

module.exports = normalizeChallenge;
