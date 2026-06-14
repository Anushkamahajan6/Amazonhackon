const getRecommendation = (disposition) => {

  switch (disposition) {

    case "Resell":
      return "List on marketplace";

    case "Refurbish":
      return "Send to certified refurbisher";

    case "Donate":
      return "Donate through NGO channel";

    case "Recycle":
      return "Send to e-waste recycler";

    default:
      return "Manual review required";

  }

};

module.exports = {
  getRecommendation
};