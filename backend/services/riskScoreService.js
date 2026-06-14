const getRiskScore = (reason) => {

  switch (reason) {

    case "Damaged Product":
      return 80;

    case "Product Not Working":
      return 70;

    case "Wrong Item Received":
      return 40;

    case "No Longer Needed":
      return 20;

    default:
      return 50;

  }

};

module.exports = {
  getRiskScore
};