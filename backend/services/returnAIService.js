const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const analyzeReturn = async (
  reason,
  imageUrl
) => {

  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    let imagePart = null;

    if (imageUrl) {

      const response = await axios.get(
        imageUrl,
        {
          responseType: "arraybuffer"
        }
      );

      imagePart = {
        inlineData: {
          data: Buffer.from(
            response.data
          ).toString("base64"),

          mimeType: "image/jpeg"
        }
      };

    }

    const prompt = `
Return reason:
${reason}

Analyze the uploaded product image.

Detect:

- scratches
- broken screen
- dents
- missing accessories
- wear and tear

Assign:

A = Perfect
B = Minor wear
C = Damaged
D = Severe damage

Disposition:

A -> Resell
B -> Refurbish
C -> Donate
D -> Recycle

Return ONLY JSON:

{
  "conditionGrade":"",
  "conditionScore":0,
  "damageFindings":[],
  "disposition":"",
  "reasoning":"",
  "suggestedResalePrice":0,
  "estimatedRefurbCost":0,
  "co2Saved":0
}
`;

    const result = imagePart
      ? await model.generateContent([
          imagePart,
          prompt
        ])
      : await model.generateContent(
          prompt
        );

    const text =
      result.response.text();

    return JSON.parse(
      text.replace(/```json|```/g, "")
    );

  }

  catch (error) {

    console.log(error);

    return {

      conditionGrade: "B",
      conditionScore: 75,
      damageFindings: [
        "Minor wear"
      ],
      disposition: "Refurbish",
      reasoning:
        "Fallback response",
      suggestedResalePrice: 700,
      estimatedRefurbCost: 150,
      co2Saved: 3

    };

  }

};

module.exports = {
  analyzeReturn
};

