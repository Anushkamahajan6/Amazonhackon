const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("../config/db");
const Item = require("../models/Item");

dotenv.config();

connectDB();

const items = [
{
name:"iPhone 13",
category:"Electronics",
originalPrice:60000,
description:"128GB Blue Variant"
},

{
name:"Samsung Galaxy S23",
category:"Electronics",
originalPrice:55000,
description:"256GB Black"
},

{
name:"Sony Headphones",
category:"Electronics",
originalPrice:12000,
description:"Noise Cancelling"
},

{
name:"HP Laptop",
category:"Electronics",
originalPrice:70000,
description:"16GB RAM"
},

{
name:"Dell Laptop",
category:"Electronics",
originalPrice:65000,
description:"512GB SSD"
},

{
name:"Nike Shoes",
category:"Fashion",
originalPrice:5000,
description:"Running Shoes"
},

{
name:"Adidas Sneakers",
category:"Fashion",
originalPrice:4500,
description:"White Sneakers"
},

{
name:"Levi's Jeans",
category:"Fashion",
originalPrice:3000,
description:"Slim Fit"
},

{
name:"Puma T-Shirt",
category:"Fashion",
originalPrice:1200,
description:"Cotton"
},

{
name:"Boat Smartwatch",
category:"Electronics",
originalPrice:3000,
description:"AMOLED Display"
},

{
name:"Apple Watch",
category:"Electronics",
originalPrice:35000,
description:"Series 9"
},

{
name:"Canon Camera",
category:"Electronics",
originalPrice:50000,
description:"DSLR Camera"
},

{
name:"LG Monitor",
category:"Electronics",
originalPrice:15000,
description:"27 inch"
},

{
name:"Wooden Study Table",
category:"Furniture",
originalPrice:10000,
description:"Brown Finish"
},

{
name:"Office Chair",
category:"Furniture",
originalPrice:7000,
description:"Ergonomic Chair"
}
];
const importData = async () => {
try{

await Item.deleteMany();

await Item.insertMany(items);

console.log("Seed Data Inserted");

process.exit();

}
catch(error){

console.log(error);

process.exit(1);

}
};

importData();