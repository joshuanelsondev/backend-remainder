const normalizeChallenge = (input) => {
  return input.replace(/-/g, "+").replace(/_/g, "/").replace(/=*$/, "");
};

const decodeChallenge = (input) => {
  const normalized = normalizeChallenge(input);
  const buffer = Buffer.from(normalized, "base64");
  return buffer.toString();
};

module.exports = { normalizeChallenge, decodeChallenge };
