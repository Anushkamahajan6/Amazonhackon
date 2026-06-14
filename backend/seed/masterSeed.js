/**
 * Master Seed — populates ALL collections in dependency order:
 *   Users → Items → Returns → MarketplaceListings
 *
 * Run with:  node seed/masterSeed.js
 */

const mongoose = require("mongoose");
const dotenv   = require("dotenv");

const connectDB            = require("../config/db");
const User                 = require("../models/User");
const Item                 = require("../models/Item");
const Return               = require("../models/Return");
const MarketplaceListing   = require("../models/MarketplaceListing");

dotenv.config();

// ── 1. USERS ────────────────────────────────────────────────────────────────
const USERS = [
  { name: "Kinjal Gupta",   email: "kinjal@gmail.com",  greenCredits: 240 },
  { name: "Anushka Mahajan",email: "anushka@gmail.com", greenCredits: 185 },
  { name: "Rahul Sharma",   email: "rahul@gmail.com",   greenCredits: 130 },
  { name: "Priya Patel",    email: "priya@gmail.com",   greenCredits:  90 },
  { name: "Amit Verma",     email: "amit@gmail.com",    greenCredits:  55 },
];

// ── 2. ITEMS ─────────────────────────────────────────────────────────────────
const ITEMS = [
  { name: "iPhone 13",          category: "Electronics", originalPrice: 60000, description: "128GB Blue Variant" },
  { name: "Samsung Galaxy S23", category: "Electronics", originalPrice: 55000, description: "256GB Black" },
  { name: "Sony Headphones",    category: "Electronics", originalPrice: 12000, description: "Noise Cancelling" },
  { name: "HP Laptop",          category: "Electronics", originalPrice: 70000, description: "16GB RAM" },
  { name: "Dell Laptop",        category: "Electronics", originalPrice: 65000, description: "512GB SSD" },
  { name: "Nike Shoes",         category: "Fashion",     originalPrice:  5000, description: "Running Shoes" },
  { name: "Adidas Sneakers",    category: "Fashion",     originalPrice:  4500, description: "White Sneakers" },
  { name: "Levi's Jeans",       category: "Fashion",     originalPrice:  3000, description: "Slim Fit" },
  { name: "Puma T-Shirt",       category: "Fashion",     originalPrice:  1200, description: "Cotton" },
  { name: "Boat Smartwatch",    category: "Electronics", originalPrice:  3000, description: "AMOLED Display" },
  { name: "Apple Watch",        category: "Electronics", originalPrice: 35000, description: "Series 9" },
  { name: "Canon Camera",       category: "Electronics", originalPrice: 50000, description: "DSLR Camera" },
  { name: "LG Monitor",         category: "Electronics", originalPrice: 15000, description: "27 inch" },
  { name: "Wooden Study Table", category: "Furniture",   originalPrice: 10000, description: "Brown Finish" },
  { name: "Office Chair",       category: "Furniture",   originalPrice:  7000, description: "Ergonomic Chair" },
];

// ── helpers for credit calculation (mirrors returnController logic) ───────────
const calcCredits = (grade, disposition, itemPrice) => {
  const gradeScore  = grade === "A" ? 50 : grade === "B" ? 30 : 10;
  const dispBonus   = disposition === "Resell" ? 40 : disposition === "Refurbish" ? 25 : 10;
  const valueBonus  = itemPrice > 50000 ? 30 : itemPrice >= 10000 ? 20 : 10;
  return gradeScore + dispBonus + valueBonus;
};

const co2ForDisposition = (disposition) => {
  if (disposition === "Resell")    return parseFloat((Math.random() * 5  + 5).toFixed(2));
  if (disposition === "Refurbish") return parseFloat((Math.random() * 3  + 3).toFixed(2));
  return                                  parseFloat((Math.random() * 2  + 1).toFixed(2));
};

// ── seed function ─────────────────────────────────────────────────────────────
const seed = async () => {
  try {
    await connectDB();

    // Clear all collections
    await Promise.all([
      User.deleteMany(),
      Item.deleteMany(),
      Return.deleteMany(),
      MarketplaceListing.deleteMany(),
    ]);
    console.log("✓ Cleared existing data");

    // Insert users
    const users = await User.insertMany(USERS);
    console.log(`✓ Inserted ${users.length} users`);

    // Insert items
    const items = await Item.insertMany(ITEMS);
    console.log(`✓ Inserted ${items.length} items`);

    // ── 3. RETURNS ─────────────────────────────────────────────────────────
    // Create realistic returns — spread across users and items
    const returnData = [
      // Grade A returns → Resell
      { userIdx: 0, itemIdx: 0,  grade: "A", disposition: "Resell",    reason: "Changed mind" },
      { userIdx: 1, itemIdx: 1,  grade: "A", disposition: "Resell",    reason: "Upgraded device" },
      { userIdx: 2, itemIdx: 3,  grade: "A", disposition: "Resell",    reason: "Gift duplicate" },
      // Grade B returns → Refurbish
      { userIdx: 0, itemIdx: 2,  grade: "B", disposition: "Refurbish", reason: "Minor damage" },
      { userIdx: 1, itemIdx: 4,  grade: "B", disposition: "Refurbish", reason: "Battery issue" },
      { userIdx: 3, itemIdx: 10, grade: "B", disposition: "Refurbish", reason: "Screen scratch" },
      { userIdx: 2, itemIdx: 11, grade: "B", disposition: "Refurbish", reason: "Lens dust" },
      // Grade C returns → Recycle
      { userIdx: 4, itemIdx: 5,  grade: "C", disposition: "Recycle",   reason: "Defective" },
      { userIdx: 3, itemIdx: 8,  grade: "C", disposition: "Recycle",   reason: "Torn fabric" },
      { userIdx: 0, itemIdx: 9,  grade: "C", disposition: "Recycle",   reason: "Display cracked" },
    ];

    const returns = await Return.insertMany(
      returnData.map(({ userIdx, itemIdx, grade, disposition, reason }) => ({
        userId:        users[userIdx]._id,
        itemId:        items[itemIdx]._id,
        reason,
        conditionGrade: grade,
        disposition,
        co2Saved:      co2ForDisposition(disposition),
      }))
    );
    console.log(`✓ Inserted ${returns.length} returns`);

    // Update each user's greenCredits based on their returns
    for (const ret of returns) {
      const item   = items.find(i => i._id.equals(ret.itemId));
      const credits = calcCredits(ret.conditionGrade, ret.disposition, item?.originalPrice || 0);
      await User.findByIdAndUpdate(ret.userId, { $inc: { greenCredits: credits } });
    }
    console.log("✓ Updated user green credits from returns");

    // ── 4. MARKETPLACE LISTINGS ────────────────────────────────────────────
    // Only Grade A and B returns become listings (Grade C goes to recycling)
    const listingInputs = [
      // Grade A listings — premium eco badge
      { itemIdx: 0,  sellerIdx: 0, grade: "A", priceRatio: 0.80, ecoBadge: "Eco Premium" },
      { itemIdx: 1,  sellerIdx: 1, grade: "A", priceRatio: 0.78, ecoBadge: "Eco Premium" },
      { itemIdx: 3,  sellerIdx: 2, grade: "A", priceRatio: 0.82, ecoBadge: "Eco Premium" },
      // Grade B listings — eco choice badge
      { itemIdx: 2,  sellerIdx: 0, grade: "B", priceRatio: 0.60, ecoBadge: "Eco Choice" },
      { itemIdx: 4,  sellerIdx: 1, grade: "B", priceRatio: 0.62, ecoBadge: "Eco Choice" },
      { itemIdx: 10, sellerIdx: 3, grade: "B", priceRatio: 0.65, ecoBadge: "Eco Choice" },
      { itemIdx: 11, sellerIdx: 2, grade: "B", priceRatio: 0.58, ecoBadge: "Eco Choice" },
    ];

    const listings = await MarketplaceListing.insertMany(
      listingInputs.map(({ itemIdx, sellerIdx, grade, priceRatio, ecoBadge }) => ({
        itemId:       items[itemIdx]._id,
        sellerId:     users[sellerIdx]._id,
        grade,
        listingPrice: Math.round(items[itemIdx].originalPrice * priceRatio),
        ecoBadge,
        status:       "ACTIVE",
      }))
    );
    console.log(`✓ Inserted ${listings.length} marketplace listings`);

    console.log("\n✅ Master seed complete — all collections populated!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seed();
