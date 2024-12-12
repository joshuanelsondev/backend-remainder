const sanitizeData = (data) => {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  );
};

module.exports = sanitizeData;
