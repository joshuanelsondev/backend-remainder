const normalizeChallenge = (input) => {
  return input.replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_");
};

module.exports = normalizeChallenge;
