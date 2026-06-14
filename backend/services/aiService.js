const { spawn } = require("child_process");
const path = require("path");

const getAIRecommendations = (userText, products) => {

  return new Promise((resolve, reject) => {

    const input = JSON.stringify({
      user: userText,
      products
    });

    const python = spawn(
      "python",
      [
        path.join(__dirname, "embeddingService.py"),
        input
      ]
    );

    let result = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {

      result += data.toString();

    });

    python.stderr.on("data", (data) => {

      errorOutput += data.toString();

    });

    python.on("close", (code) => {

      if (code !== 0) {

        return reject(errorOutput);

      }

      try {

        resolve(JSON.parse(result));

      }
      catch (err) {

        reject(err);

      }

    });

  });

};


// Return AI Service
const analyzeReturn = async (
  reason,
  imageUrl
) => {

  switch (reason) {

    case "Damaged Product":
      return {
        conditionGrade: "B",
        conditionScore: 82,
        damageFindings: ["Minor scratch"],
        disposition: "Refurbish",
        reasoning: "Cosmetic damage only",
        suggestedResalePrice: 850,
        estimatedRefurbCost: 100,
        co2Saved: 3
      };

    case "Product Not Working":
      return {
        conditionGrade: "C",
        conditionScore: 55,
        damageFindings: ["Functional issue"],
        disposition: "Recycle",
        reasoning: "Device not functioning properly",
        suggestedResalePrice: 300,
        estimatedRefurbCost: 500,
        co2Saved: 2
      };

    case "Wrong Item Received":
      return {
        conditionGrade: "A",
        conditionScore: 95,
        damageFindings: [],
        disposition: "Resell",
        reasoning: "Returned in good condition",
        suggestedResalePrice: 1200,
        estimatedRefurbCost: 0,
        co2Saved: 5
      };

    case "No Longer Needed":
      return {
        conditionGrade: "A",
        conditionScore: 98,
        damageFindings: [],
        disposition: "Resell",
        reasoning: "Unused item suitable for resale",
        suggestedResalePrice: 1300,
        estimatedRefurbCost: 0,
        co2Saved: 6
      };

    default:
      return {
        conditionGrade: "B",
        conditionScore: 75,
        damageFindings: [],
        disposition: "Refurbish",
        reasoning: "General wear and tear",
        suggestedResalePrice: 700,
        estimatedRefurbCost: 150,
        co2Saved: 3
      };

  }

};

module.exports = {
  getAIRecommendations,
  analyzeReturn
};