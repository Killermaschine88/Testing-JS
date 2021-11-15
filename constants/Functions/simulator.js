function getAuctionID() {
  const first = Date.now().toString(36).slice(-3);
  const second = Math.random().toString(36).slice(-3);

  return first + second
}

module.exports = { getAuctionID };