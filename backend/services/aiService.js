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

module.exports = {
  getAIRecommendations
};