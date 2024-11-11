// Ingredient Levels Data
const ingredientLevels = {
    "Apple (peeled)": {
        "category": "fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Apple": {
        "category": "fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pear": {
        "category": "fruit",
        "salicylates": "medium",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pear (peeled)": {
        "category": "fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Banana": {
        "category": "fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Papaya": {
        "category": "fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Mango": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Watermelon": {
        "category": "fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pineapple": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Blueberries": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Strawberries": {
        "category": "fruit",
        "salicylates": "very high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Blackberries": {
        "category": "fruit",
        "salicylates": "very high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Raspberries": {
        "category": "fruit",
        "salicylates": "very high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Grapes": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Kiwi": {
        "category": "fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Avocado": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Oranges": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "high",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Lemon": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Lime": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Grapefruit": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cherries": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Peaches": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Nectarines": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Plums": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Apricots": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Figs": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dates": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "low",
        "nitrates": "none"
    },
    "Raisins": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Cranberries": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pomegranate": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Melon (Cantaloupe)": {
        "category": "fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Honeydew Melon": {
        "category": "fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dragon Fruit": {
        "category": "fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Lychee": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Guava": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Persimmon": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Mulberries": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Rambutan": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Starfruit": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Passion Fruit": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Apple (unpeeled)": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pear (unpeeled)": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Tangerine": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Coconut": {
        "category": "fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Fig (dried)": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Prunes": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Pineapple (canned)": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "high",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Banana (ripe)": {
        "category": "fruit",
        "salicylates": "low",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Jackfruit": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "high",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Custard Apple": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Olive": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "low",
        "nitrates": "none"
    },
    "Gooseberry": {
        "category": "fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Elderberry": {
        "category": "fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Carrot": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Zucchini": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Celery": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "high"
    },
    "Iceberg Lettuce": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Romaine Lettuce": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Cabbage (Green)": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Cabbage (Red)": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Potato (White)": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Sweet Potato": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Pumpkin": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Bean Sprouts": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Asparagus": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Broccoli": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Cauliflower": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Spinach": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "very high"
    },
    "Kale": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "very high"
    },
    "Bell Pepper (Green)": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Bell Pepper (Red)": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Bell Pepper (Yellow)": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Beetroot": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "low",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "high"
    },
    "Eggplant": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Tomato": {
        "category": "vegetable",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Onion": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Garlic": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Radish": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Turnip": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Mushroom (Button)": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Mushroom (Shiitake)": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cucumber": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Corn (Fresh)": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "low",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Corn (Canned)": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "low"
    },
    "Green Beans": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Peas (Green)": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Peas (Snap)": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Okra": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Squash (Yellow)": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Squash (Butternut)": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Brussels Sprouts": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "low",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Artichoke": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Arugula": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Collard Greens": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "high"
    },
    "Leeks": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Parsnip": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "high"
    },
    "Bok Choy": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Swiss Chard": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "high"
    },
    "Fennel": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Watercress": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Rhubarb": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Mustard Greens": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Endive": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Kohlrabi": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Beet Greens": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "high"
    },
    "Horseradish": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Ginger": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "high",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Sweet Corn": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "low",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Baby Spinach": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "high"
    },
    "Dandelion Greens": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "high"
    },
    "Radicchio": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Scallions": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Alfalfa Sprouts": {
        "category": "vegetable",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Seaweed (Nori)": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "high"
    },
    "Seaweed (Wakame)": {
        "category": "vegetable",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "high"
    },
    "Pumpkin Leaves": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Cassava": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Yam": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Sweet Bell Pepper": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Celery Root": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Chicory": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Jerusalem Artichoke": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "moderate"
    },
    "Lotus Root": {
        "category": "vegetable",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Snap Peas": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Olive Oil (Extra Virgin)": {
        "category": "cooking oil",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Olive Oil (Refined)": {
        "category": "cooking oil",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Coconut Oil": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sunflower Oil": {
        "category": "cooking oil",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Safflower Oil": {
        "category": "cooking oil",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Rice Bran Oil": {
        "category": "cooking oil",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Canola Oil": {
        "category": "cooking oil",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Grapeseed Oil": {
        "category": "cooking oil",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Avocado Oil": {
        "category": "cooking oil",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Soybean Oil": {
        "category": "cooking oil",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Peanut Oil": {
        "category": "cooking oil",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sesame Oil": {
        "category": "nut",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Flaxseed Oil": {
        "category": "cooking oil",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Walnut Oil": {
        "category": "nut",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Corn Oil": {
        "category": "cooking oil",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Palm Oil": {
        "category": "cooking oil",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cottonseed Oil": {
        "category": "cooking oil",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Almond Oil": {
        "category": "nut",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Macadamia Nut Oil": {
        "category": "cooking oil",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Mustard Seed Oil": {
        "category": "cooking oil",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Apricots": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Apples": {
        "category": "dried fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Figs": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Dates": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "low",
        "nitrates": "none"
    },
    "Dried Cherries": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Cranberries": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Blueberries": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Strawberries": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Blackberries": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Goji Berries": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "high",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Mango": {
        "category": "dried fruit",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Pineapple": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Papaya": {
        "category": "dried fruit",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Kiwi": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Mulberries": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Coconut": {
        "category": "dried fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Banana Chips": {
        "category": "dried fruit",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Pears": {
        "category": "dried fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Peaches": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Nectarines": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Plums": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Tomatoes": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Carrots": {
        "category": "dried fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Beetroot": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Persimmons": {
        "category": "dried fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Lychee": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Rambutan": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Pomegranate Seeds": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Orange Slices": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "low",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Lemon Slices": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "low",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Lime Slices": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "low",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Grapes (Currants)": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Sultanas": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Apples (Peeled)": {
        "category": "dried fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "low",
        "nitrates": "none"
    },
    "Dried Pears (Peeled)": {
        "category": "dried fruit",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "low",
        "nitrates": "none"
    },
    "Dried Cranberries (No Sugar)": {
        "category": "dried fruit",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "low",
        "nitrates": "none"
    },
    "Dried Papaya Spears": {
        "category": "dried fruit",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "moderate",
        "nitrates": "none"
    },
    "Dried Mango Spears": {
        "category": "dried fruit",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "moderate",
        "nitrates": "none"
    },
    "Dried Ginger": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Fennel Seeds": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Basil Leaves": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Oregano": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Rosemary": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Thyme": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Dill": {
        "category": "dried fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Spinach": {
        "category": "dried fruit",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Kale Chips": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dried Seaweed": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "high"
    },
    "Dried Nori": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "high"
    },
    "Sun-Dried Tomatoes": {
        "category": "dried fruit",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Dried Figs (No Sulphites)": {
        "category": "dried fruit",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "low",
        "nitrates": "none"
    },
    "Chickpeas": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Black Beans": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Kidney Beans": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Pinto Beans": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Navy Beans": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "White Beans": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Cannellini Beans": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Adzuki Beans": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Mung Beans": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Lentils (Brown)": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Lentils (Green)": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Lentils (Red)": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Split Peas": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Yellow Peas": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Green Peas": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Black-eyed Peas": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Soybeans": {
        "category": "legume",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Edamame": {
        "category": "legume",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Fava Beans": {
        "category": "legume",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Lima Beans": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Broad Beans": {
        "category": "legume",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Pigeon Peas": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Snow Peas": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Hyacinth Beans": {
        "category": "legume",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Scarlet Runner Beans": {
        "category": "legume",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "French Beans": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Winged Beans": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Chickpea Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Green Gram (Moong Dal)": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Urad Dal (Black Gram)": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Masoor Dal (Red Lentils)": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Toor Dal (Split Pigeon Peas)": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Bengal Gram (Chana Dal)": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Horse Gram": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Black Lentils": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Soy Flour": {
        "category": "grain",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Soy Milk": {
        "category": "legume",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Tofu": {
        "category": "legume",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Tempeh": {
        "category": "legume",
        "salicylates": "moderate",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Hummus (prepared)": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Lupini Beans": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "low"
    },
    "Field Peas": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Navy Bean Flour": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Black Bean Flour": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Miso": {
        "category": "legume",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Natto": {
        "category": "legume",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Green Gram Flour": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Lentil Flour": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Fenugreek Seeds": {
        "category": "legume",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Carob (if using as a legume)": {
        "category": "legume",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Almonds": {
        "category": "nut",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Almond Butter": {
        "category": "nut",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cashews": {
        "category": "nut",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cashew Butter": {
        "category": "nut",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pistachios": {
        "category": "nut",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Walnuts": {
        "category": "nut",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Black Walnuts": {
        "category": "nut",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pecans": {
        "category": "nut",
        "salicylates": "high",
        "amines": "low",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Macadamia Nuts": {
        "category": "nut",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Hazelnuts": {
        "category": "nut",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Hazelnut Butter": {
        "category": "nut",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Brazil Nuts": {
        "category": "nut",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pine Nuts": {
        "category": "nut",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Chestnuts": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Coconut Meat": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Coconut Milk": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Coconut Cream": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Desiccated Coconut": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Coconut Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sunflower Seeds": {
        "category": "nut",
        "salicylates": "low",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sunflower Seed Butter": {
        "category": "nut",
        "salicylates": "low",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pumpkin Seeds": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pumpkin Seed Butter": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Flaxseeds": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Chia Seeds": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Hemp Seeds": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sesame Seeds": {
        "category": "nut",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Tahini (Sesame Butter)": {
        "category": "nut",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Peanuts": {
        "category": "nut",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Peanut Butter": {
        "category": "nut",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Poppy Seeds": {
        "category": "nut",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Tiger Nuts": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Watermelon Seeds": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Lotus Seeds": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pili Nuts": {
        "category": "nut",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cacao Nibs": {
        "category": "nut",
        "salicylates": "high",
        "amines": "high",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Carob Pods": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Acorns": {
        "category": "nut",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Ginkgo Nuts": {
        "category": "nut",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Hickory Nuts": {
        "category": "nut",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Beechnuts": {
        "category": "nut",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Breadnut Seeds": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Almond Flour": {
        "category": "grain",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cashew Flour": {
        "category": "nut",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Hazelnut Flour": {
        "category": "nut",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Peanut Flour": {
        "category": "nut",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pumpkin Seed Oil": {
        "category": "nut",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Rice": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "White Rice": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Brown Rice": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Basmati Rice": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Jasmine Rice": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Wild Rice": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Quinoa": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Millet": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sorghum": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Amaranth": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Teff": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Oats": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Rolled Oats": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Steel-cut Oats": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Barley": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pearl Barley": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Rye": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Bulgur": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Spelt": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Kamut": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Farro": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Buckwheat": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Buckwheat Groats": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Freekeh": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cornmeal": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Corn Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Polenta": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Wheat Flour": {
        "category": "grain",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Whole Wheat Flour": {
        "category": "grain",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Semolina": {
        "category": "grain",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Couscous": {
        "category": "grain",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Spelt Flour": {
        "category": "grain",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Rice Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Quinoa Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Tapioca Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Potato Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Arrowroot Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Corn Starch": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sorghum Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Millet Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Buckwheat Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Triticale": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Einkorn": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Emmer Wheat": {
        "category": "grain",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Green Pea Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Lupin Flour": {
        "category": "grain",
        "salicylates": "low",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Salt": {
        "category": "seasoning",
        "salicylates": "none",
        "amines": "none",
        "msg": "none",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Black Pepper": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "White Pepper": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Garlic Powder": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Onion Powder": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Basil (Dried)": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Bay Leaf": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Oregano (Dried)": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Thyme (Dried)": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Rosemary (Dried)": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Parsley (Dried)": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dill (Dried)": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sage (Dried)": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "high",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cilantro (Dried)": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Chives (Dried)": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Fennel Seed": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Coriander Seed": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Caraway Seed": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cumin": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cardamom": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cloves": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cinnamon": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Nutmeg": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Ginger (Dried)": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Turmeric": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Paprika": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cayenne Pepper": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Mustard Powder": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Fenugreek": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Tarragon": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Marjoram": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Savory": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Anise Seed": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Mace": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Allspice": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Saffron": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sumac": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Celery Seed": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Lemon Peel (Dried)": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Lime Peel (Dried)": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Tamarind": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Asafoetida": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Wasabi Powder": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Curry Powder": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Garam Masala": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Chinese Five-Spice": {
        "category": "seasoning",
        "salicylates": "very high",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "MSG (Monosodium Glutamate)": {
        "category": "seasoning",
        "salicylates": "none",
        "amines": "high",
        "msg": "very high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Fish Sauce": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Soy Sauce": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Tamari": {
        "category": "seasoning",
        "salicylates": "high",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Vinegar": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "high",
        "msg": "moderate",
        "sulphites": "low",
        "nitrates": "none"
    },
    "Apple Cider Vinegar": {
        "category": "seasoning",
        "salicylates": "moderate",
        "amines": "high",
        "msg": "moderate",
        "sulphites": "low",
        "nitrates": "none"
    },
    "Chicken Breast (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Chicken Thigh (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Turkey Breast (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Turkey Thigh (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Duck (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Goose (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Quail (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pheasant (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Beef (Lean Cuts, Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Beef (Fatty Cuts, Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Lamb (Lean Cuts, Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Lamb (Fatty Cuts, Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Goat (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Veal (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pork (Lean Cuts, Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pork (Fatty Cuts, Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Rabbit (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Venison (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Bison (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Elk (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Ostrich (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Kangaroo (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Emu (Fresh)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Tuna (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Salmon (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cod (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Haddock (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Halibut (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Tilapia (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Shrimp (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Crab (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Lobster (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Mussels (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Clams (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Oysters (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Scallops (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Beef Jerky": {
        "category": "meat",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "high"
    },
    "Bacon": {
        "category": "meat",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "high"
    },
    "Ham (Processed)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "high"
    },
    "Hot Dogs": {
        "category": "meat",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "high"
    },
    "Sausages (Pork)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "high"
    },
    "Pepperoni": {
        "category": "meat",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "high"
    },
    "Salami": {
        "category": "meat",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "high"
    },
    "Prosciutto": {
        "category": "meat",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "high"
    },
    "Corned Beef": {
        "category": "meat",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "high"
    },
    "Smoked Salmon": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Canned Tuna": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Canned Chicken": {
        "category": "meat",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Canned Beef": {
        "category": "meat",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Meat Broth (Canned)": {
        "category": "meat",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    },
    "Trout (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Mackerel (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sardines (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Snapper (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Catfish (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sea Bass (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sole (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Flounder (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Pollock (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Swordfish (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Perch (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Grouper (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Monkfish (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Octopus (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Squid (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Anchovies (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Herring (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Prawns (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Eel (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Kingfish (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Yellowtail (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Bluefish (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sablefish (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Rockfish (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Dogfish (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Barramundi (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Amberjack (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Bonito (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Cuttlefish (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Skate (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "moderate",
        "msg": "moderate",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Abalone (Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Roe (Fish Eggs, Fresh)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Sea Urchin": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Tilapia (Farmed)": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "low",
        "msg": "low",
        "sulphites": "none",
        "nitrates": "none"
    },
    "King Mackerel": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "none",
        "nitrates": "none"
    },
    "Canned Salmon": {
        "category": "seafood",
        "salicylates": "none",
        "amines": "high",
        "msg": "high",
        "sulphites": "high",
        "nitrates": "none"
    }
};

// Recipes Data
const recipes = [{
    "name": "Pear and Banana Smoothie",
    "ingredients": ["Pear", "banana", "rice milk"],
    "category": "drink",
    "instructions": "Blend 1 pear, 1 banana, and 1 cup rice milk until smooth."
}, {
    "name": "Coconut Watermelon Cooler",
    "ingredients": ["Watermelon", "coconut water"],
    "category": "drink",
    "instructions": "Blend 1 cup watermelon and 1 cup coconut water. Serve chilled."
}, {
    "name": "Cucumber Mint Cooler",
    "ingredients": ["Cucumber", "fresh mint", "water"],
    "category": "drink",
    "instructions": "Blend 1 cucumber, a few mint leaves, and 1 cup water. Serve over ice."
}, {
    "name": "Aloe Vera Lemonade",
    "ingredients": ["Aloe vera gel", "lemon juice", "water", "honey"],
    "category": "drink",
    "instructions": "Mix 2 tbsp aloe vera gel, juice of 1 lemon, 1 cup water, and honey to taste."
}, {
    "name": "Apple Pear Smoothie",
    "ingredients": ["Apple", "pear", "water"],
    "category": "drink",
    "instructions": "Blend 1 apple, 1 pear, and 1/2 cup water. Serve over ice."
}, {
    "name": "Banana Oat Smoothie",
    "ingredients": ["Banana", "oats", "rice milk"],
    "category": "drink",
    "instructions": "Blend 1 banana, 2 tbsp oats, and 1 cup rice milk until smooth."
}, {
    "name": "Cucumber Pear Smoothie",
    "ingredients": ["Cucumber", "pear", "coconut water"],
    "category": "drink",
    "instructions": "Blend 1 cucumber, 1 pear, and 1 cup coconut water."
}, {
    "name": "Spinach Cucumber Cooler",
    "ingredients": ["Spinach", "cucumber", "water"],
    "category": "drink",
    "instructions": "Blend a handful of spinach, 1 cucumber, and 1 cup water."
}, {
    "name": "Melon Mint Juice",
    "ingredients": ["Honeydew melon", "mint", "water"],
    "category": "drink",
    "instructions": "Blend 1 cup melon, a few mint leaves, and 1/2 cup water."
}, {
    "name": "Apple Celery Juice",
    "ingredients": ["Apple", "celery", "water"],
    "category": "drink",
    "instructions": "Blend 1 apple, 1 celery stalk, and 1/2 cup water."
}, {
    "name": "Banana Rice Milkshake",
    "ingredients": ["Banana", "rice milk", "vanilla extract"],
    "category": "drink",
    "instructions": "Blend 1 banana, 1 cup rice milk, and a dash of vanilla extract."
}, {
    "name": "Mango Coconut Smoothie",
    "ingredients": ["Mango", "coconut milk"],
    "category": "drink",
    "instructions": "Blend 1/2 mango and 1 cup coconut milk until smooth."
}, {
    "name": "Berry-Free Green Smoothie",
    "ingredients": ["Spinach", "cucumber", "pear", "water"],
    "category": "drink",
    "instructions": "Blend 1/2 cup spinach, 1/2 cucumber, 1 pear, and 1/2 cup water."
}, {
    "name": "Pear Celery Juice",
    "ingredients": ["Pear", "celery", "water"],
    "category": "drink",
    "instructions": "Blend 1 pear, 1 celery stalk, and 1/2 cup water."
}, {
    "name": "Apple Oat Smoothie",
    "ingredients": ["Apple", "oats", "rice milk"],
    "category": "drink",
    "instructions": "Blend 1 apple, 2 tbsp oats, and 1 cup rice milk until smooth."
}, {
    "name": "Honeydew Cucumber Juice",
    "ingredients": ["Honeydew melon", "cucumber", "water"],
    "category": "drink",
    "instructions": "Blend 1 cup honeydew, 1 cucumber, and 1/2 cup water."
}, {
    "name": "Banana Spinach Smoothie",
    "ingredients": ["Banana", "spinach", "rice milk"],
    "category": "drink",
    "instructions": "Blend 1 banana, 1/2 cup spinach, and 1 cup rice milk."
}, {
    "name": "Mango Pear Smoothie",
    "ingredients": ["Mango", "pear", "coconut milk"],
    "category": "drink",
    "instructions": "Blend 1/2 mango, 1 pear, and 1 cup coconut milk."
}, {
    "name": "Carrot Apple Juice",
    "ingredients": ["Carrot", "apple", "water"],
    "category": "drink",
    "instructions": "Blend 1 carrot, 1 apple, and 1/2 cup water."
}, {
    "name": "Aloe Cucumber Lemon Juice",
    "ingredients": ["Aloe vera gel", "cucumber", "lemon juice", "water"],
    "category": "drink",
    "instructions": "Blend 2 tbsp aloe gel, 1 cucumber, juice of 1 lemon, and 1 cup water."
}, {
    "name": "Watermelon Mint Smoothie",
    "ingredients": ["Watermelon", "mint", "coconut water"],
    "category": "drink",
    "instructions": "Blend 1 cup watermelon, a few mint leaves, and 1 cup coconut water."
}, {
    "name": "Papaya Coconut Smoothie",
    "ingredients": ["Papaya", "coconut milk"],
    "category": "drink",
    "instructions": "Blend 1/2 cup papaya and 1 cup coconut milk until smooth."
}, {
    "name": "Spinach Pear Juice",
    "ingredients": ["Spinach", "pear", "water"],
    "category": "drink",
    "instructions": "Blend a handful of spinach, 1 pear, and 1/2 cup water."
}, {
    "name": "Melon Cucumber Smoothie",
    "ingredients": ["Honeydew melon", "cucumber", "coconut water"],
    "category": "drink",
    "instructions": "Blend 1 cup honeydew, 1/2 cucumber, and 1 cup coconut water."
}, {
    "name": "Banana Honeydew Smoothie",
    "ingredients": ["Banana", "honeydew melon", "coconut water"],
    "category": "drink",
    "instructions": "Blend 1 banana, 1/2 cup honeydew, and 1 cup coconut water."
}, {
    "name": "Pineapple Aloe Smoothie",
    "ingredients": ["Pineapple", "aloe vera gel", "water"],
    "category": "drink",
    "instructions": "Blend 1/2 cup pineapple, 2 tbsp aloe gel, and 1/2 cup water."
}, {
    "name": "Banana Avocado Smoothie",
    "ingredients": ["Banana", "avocado", "coconut water"],
    "category": "drink",
    "instructions": "Blend 1 banana, 1/4 avocado, and 1 cup coconut water."
}, {
    "name": "Oatmeal Pear Smoothie",
    "ingredients": ["Oats", "pear", "rice milk"],
    "category": "drink",
    "instructions": "Blend 2 tbsp oats, 1 pear, and 1 cup rice milk."
}, {
    "name": "Carrot Cucumber Juice",
    "ingredients": ["Carrot", "cucumber", "water"],
    "category": "drink",
    "instructions": "Blend 1 carrot, 1 cucumber, and 1/2 cup water."
}, {
    "name": "Cucumber Lime Mint Water",
    "ingredients": ["Cucumber", "lime juice", "mint", "water"],
    "category": "drink",
    "instructions": "Mix slices of cucumber, juice of 1 lime, and a few mint leaves in water."
}, {
    "name": "Mango Mint Smoothie",
    "ingredients": ["Mango", "mint", "coconut water"],
    "category": "drink",
    "instructions": "Blend 1/2 mango, a few mint leaves, and 1 cup coconut water."
}, {
    "name": "Pear Ginger Smoothie",
    "ingredients": ["Pear", "fresh ginger", "coconut water"],
    "category": "drink",
    "instructions": "Blend 1 pear, a small piece of ginger, and 1 cup coconut water."
}, {
    "name": "Watermelon Coconut Juice",
    "ingredients": ["Watermelon", "coconut milk"],
    "category": "drink",
    "instructions": "Blend 1 cup watermelon and 1/2 cup coconut milk."
}, {
    "name": "Banana Chia Smoothie",
    "ingredients": ["Banana", "chia seeds", "rice milk"],
    "category": "drink",
    "instructions": "Blend 1 banana, 1 tbsp chia seeds, and 1 cup rice milk."
}, {
    "name": "Apple Mint Juice",
    "ingredients": ["Apple", "mint", "water"],
    "category": "drink",
    "instructions": "Blend 1 apple, a few mint leaves, and 1/2 cup water."
}, {
    "name": "Pineapple Mint Smoothie",
    "ingredients": ["Pineapple", "mint", "coconut water"],
    "category": "drink",
    "instructions": "Blend 1/2 cup pineapple, a few mint leaves, and 1 cup coconut water."
}, {
    "name": "Coconut Lime Smoothie",
    "ingredients": ["Coconut milk", "lime juice", "honey"],
    "category": "drink",
    "instructions": "Blend 1 cup coconut milk, juice of 1 lime, and honey to taste."
}, {
    "name": "Spinach Honeydew Smoothie",
    "ingredients": ["Spinach", "honeydew melon", "coconut water"],
    "category": "drink",
    "instructions": "Blend a handful of spinach, 1/2 cup honeydew, and 1 cup coconut water."
}, {
    "name": "Avocado Cucumber Smoothie",
    "ingredients": ["Avocado", "cucumber", "coconut water"],
    "category": "drink",
    "instructions": "Blend 1/4 avocado, 1/2 cucumber, and 1 cup coconut water."
}, {
    "name": "Mango Oat Smoothie",
    "ingredients": ["Mango", "oats", "rice milk"],
    "category": "drink",
    "instructions": "Blend 1/2 mango, 2 tbsp oats, and 1 cup rice milk."
}, {
    "name": "Aloe Pineapple Juice",
    "ingredients": ["Aloe vera gel", "pineapple", "water"],
    "category": "drink",
    "instructions": "Blend 2 tbsp aloe gel, 1/2 cup pineapple, and 1/2 cup water."
}, {
    "name": "Pear Mint Juice",
    "ingredients": ["Pear", "mint", "water"],
    "category": "drink",
    "instructions": "Blend 1 pear, a few mint leaves, and 1/2 cup water."
}, {
    "name": "Banana Honey Smoothie",
    "ingredients": ["Banana", "honey", "rice milk"],
    "category": "drink",
    "instructions": "Blend 1 banana, 1 tsp honey, and 1 cup rice milk."
}, {
    "name": "Cucumber Lemon Water",
    "ingredients": ["Cucumber", "lemon juice", "water"],
    "category": "drink",
    "instructions": "Mix slices of cucumber, juice of 1 lemon, and 1 cup water."
}, {
    "name": "Mango Carrot Juice",
    "ingredients": ["Mango", "carrot", "water"],
    "category": "drink",
    "instructions": "Blend 1/2 mango, 1 carrot, and 1/2 cup water."
}, {
    "name": "Coconut Pear Smoothie",
    "ingredients": ["Coconut milk", "pear", "honey"],
    "category": "drink",
    "instructions": "Blend 1 cup coconut milk, 1 pear, and honey to taste."
}, {
    "name": "Watermelon Spinach Smoothie",
    "ingredients": ["Watermelon", "spinach", "coconut water"],
    "category": "drink",
    "instructions": "Blend 1 cup watermelon, a handful of spinach, and 1 cup coconut water."
}, {
    "name": "Pineapple Cucumber Cooler",
    "ingredients": ["Pineapple", "cucumber", "water"],
    "category": "drink",
    "instructions": "Blend 1/2 cup pineapple, 1/2 cucumber, and 1/2 cup water."
}, {
    "name": "Melon Spinach Juice",
    "ingredients": ["Honeydew melon", "spinach", "water"],
    "category": "drink",
    "instructions": "Blend 1 cup honeydew, a handful of spinach, and 1/2 cup water."
}, {
    "name": "Creamy Avocado Dip",
    "ingredients": ["Avocado", "rice milk", "garlic powder", "salt"],
    "category": "dips",
    "instructions": "Blend 1 avocado, 1/4 cup rice milk, a pinch of garlic powder, and salt to taste until smooth."
}, {
    "name": "Coconut Yogurt Dressing",
    "ingredients": ["Coconut yogurt", "lemon juice", "water", "salt"],
    "category": "dips",
    "instructions": "Mix 1/2 cup coconut yogurt, juice of 1/2 lemon, 1 tbsp water, and salt to taste."
}, {
    "name": "Cucumber Mint Dip",
    "ingredients": ["Cucumber", "fresh mint", "coconut yogurt", "salt"],
    "category": "dips",
    "instructions": "Blend 1/2 cucumber, a few mint leaves, 1/4 cup coconut yogurt, and salt to taste."
}, {
    "name": "Basil Lime Dressing",
    "ingredients": ["Fresh basil", "lime juice", "rice milk", "salt"],
    "category": "dips",
    "instructions": "Blend 1/4 cup fresh basil, juice of 1 lime, 1/4 cup rice milk, and salt to taste."
}, {
    "name": "Carrot Ginger Dip",
    "ingredients": ["Carrot", "fresh ginger", "rice milk", "salt"],
    "category": "dips",
    "instructions": "Steam 1 carrot, blend with a small piece of ginger, 1/4 cup rice milk, and salt to taste."
}, {
    "name": "Mango Coconut Dressing",
    "ingredients": ["Mango", "coconut milk", "lime juice"],
    "category": "dips",
    "instructions": "Blend 1/2 mango, 1/4 cup coconut milk, and juice of 1/2 lime."
}, {
    "name": "Spinach Avocado Dip",
    "ingredients": ["Spinach", "avocado", "coconut yogurt", "salt"],
    "category": "dips",
    "instructions": "Blend a handful of spinach, 1 avocado, 1/4 cup coconut yogurt, and salt to taste."
}, {
    "name": "Pear Ginger Dressing",
    "ingredients": ["Pear", "fresh ginger", "coconut yogurt"],
    "category": "dips",
    "instructions": "Blend 1 pear, a small piece of ginger, and 1/4 cup coconut yogurt until smooth."
}, {
    "name": "Apple Coconut Dip",
    "ingredients": ["Apple", "coconut yogurt", "cinnamon"],
    "category": "dips",
    "instructions": "Blend 1 apple, 1/4 cup coconut yogurt, and a pinch of cinnamon."
}, {
    "name": "Honeydew Mint Dressing",
    "ingredients": ["Honeydew melon", "fresh mint", "coconut water"],
    "category": "dips",
    "instructions": "Blend 1/2 cup honeydew, a few mint leaves, and 1/4 cup coconut water."
}, {
    "name": "Cucumber Dill Dressing",
    "ingredients": ["Cucumber", "dill", "coconut yogurt", "salt"],
    "category": "dips",
    "instructions": "Blend 1/2 cucumber, 1 tbsp fresh dill, 1/4 cup coconut yogurt, and salt to taste."
}, {
    "name": "Zucchini Basil Dip",
    "ingredients": ["Zucchini", "basil", "coconut yogurt", "salt"],
    "category": "dips",
    "instructions": "Steam 1/2 zucchini, blend with a few basil leaves, 1/4 cup coconut yogurt, and salt to taste."
}, {
    "name": "Lemon Herb Dressing",
    "ingredients": ["Lemon juice", "fresh basil", "fresh parsley", "water"],
    "category": "dips",
    "instructions": "Blend juice of 1 lemon, 1/4 cup basil, 1/4 cup parsley, and 2 tbsp water."
}, {
    "name": "Avocado Cilantro Dip",
    "ingredients": ["Avocado", "cilantro", "rice milk", "salt"],
    "category": "dips",
    "instructions": "Blend 1 avocado, 1/4 cup fresh cilantro, 1/4 cup rice milk, and salt to taste."
}, {
    "name": "Pear Mint Dressing",
    "ingredients": ["Pear", "fresh mint", "coconut yogurt"],
    "category": "dips",
    "instructions": "Blend 1 pear, a few mint leaves, and 1/4 cup coconut yogurt."
}, {
    "name": "Cucumber Coconut Dip",
    "ingredients": ["Cucumber", "coconut yogurt", "salt"],
    "category": "dips",
    "instructions": "Blend 1/2 cucumber and 1/4 cup coconut yogurt with salt to taste."
}, {
    "name": "Spinach Lime Dressing",
    "ingredients": ["Spinach", "lime juice", "coconut water"],
    "category": "dips",
    "instructions": "Blend a handful of spinach, juice of 1 lime, and 1/4 cup coconut water."
}, {
    "name": "Coconut Garlic Dressing",
    "ingredients": ["Coconut yogurt", "garlic powder", "lemon juice", "salt"],
    "category": "dips",
    "instructions": "Mix 1/2 cup coconut yogurt, 1/4 tsp garlic powder, juice of 1/2 lemon, and salt."
}, {
    "name": "Mango Ginger Dip",
    "ingredients": ["Mango", "fresh ginger", "coconut milk"],
    "category": "dips",
    "instructions": "Blend 1/2 mango, a small piece of ginger, and 1/4 cup coconut milk."
}, {
    "name": "Banana Cinnamon Dip",
    "ingredients": ["Banana", "coconut yogurt", "cinnamon"],
    "category": "dips",
    "instructions": "Blend 1 banana, 1/4 cup coconut yogurt, and a pinch of cinnamon."
}, {
    "name": "Coconut Herb Dressing",
    "ingredients": ["Coconut milk", "basil", "parsley", "salt"],
    "category": "dips",
    "instructions": "Blend 1/4 cup coconut milk, 1/4 cup basil, 1/4 cup parsley, and salt to taste."
}, {
    "name": "Honey Pear Dip",
    "ingredients": ["Pear", "coconut yogurt", "honey"],
    "category": "dips",
    "instructions": "Blend 1 pear, 1/4 cup coconut yogurt, and a drizzle of honey."
}, {
    "name": "Pineapple Basil Dressing",
    "ingredients": ["Pineapple", "fresh basil", "coconut water"],
    "category": "dips",
    "instructions": "Blend 1/2 cup pineapple, a few basil leaves, and 1/4 cup coconut water."
}, {
    "name": "Carrot Parsley Dip",
    "ingredients": ["Carrot", "parsley", "coconut yogurt", "salt"],
    "category": "dips",
    "instructions": "Steam 1 carrot, blend with 1/4 cup parsley, 1/4 cup coconut yogurt, and salt to taste."
}, {
    "name": "Beet Coconut Dip",
    "ingredients": ["Beetroot", "coconut yogurt", "salt"],
    "category": "dips",
    "instructions": "Steam 1 beet, blend with 1/4 cup coconut yogurt, and salt to taste."
}, {
    "name": "Cucumber Lime Dressing",
    "ingredients": ["Cucumber", "lime juice", "water", "salt"],
    "category": "dips",
    "instructions": "Blend 1/2 cucumber, juice of 1 lime, and 1/4 cup water."
}, {
    "name": "Zucchini Mint Dip",
    "ingredients": ["Zucchini", "mint", "coconut yogurt", "salt"],
    "category": "dips",
    "instructions": "Steam 1/2 zucchini, blend with a few mint leaves, 1/4 cup coconut yogurt, and salt to taste."
}, {
    "name": "Pear Basil Dressing",
    "ingredients": ["Pear", "fresh basil", "coconut yogurt"],
    "category": "dips",
    "instructions": "Blend 1 pear, 1/4 cup basil, and 1/4 cup coconut yogurt."
}, {
    "name": "Carrot Ginger Dressing",
    "ingredients": ["Carrot", "ginger", "coconut water"],
    "category": "dips",
    "instructions": "Blend 1 steamed carrot, a small piece of ginger, and 1/4 cup coconut water."
}, {
    "name": "Melon Mint Dip",
    "ingredients": ["Honeydew melon", "fresh mint", "coconut yogurt"],
    "category": "dips",
    "instructions": "Blend 1/2 cup honeydew, a few mint leaves, and 1/4 cup coconut yogurt."
}, {
    "name": "Cucumber Avocado Dip",
    "ingredients": ["Cucumber", "avocado", "coconut water"],
    "category": "dips",
    "instructions": "Blend 1/2 cucumber, 1/2 avocado, and 1/4 cup coconut water."
}, {
    "name": "Pineapple Coconut Dip",
    "ingredients": ["Pineapple", "coconut yogurt", "lime juice"],
    "category": "dips",
    "instructions": "Blend 1/2 cup pineapple, 1/4 cup coconut yogurt, and juice of 1/2 lime."
}, {
    "name": "Banana Lime Dip",
    "ingredients": ["Banana", "coconut yogurt", "lime juice"],
    "category": "dips",
    "instructions": "Blend 1 banana, 1/4 cup coconut yogurt, and juice of 1/2 lime."
}, {
    "name": "Spinach Basil Dressing",
    "ingredients": ["Spinach", "basil", "coconut yogurt"],
    "category": "dips",
    "instructions": "Blend a handful of spinach, 1/4 cup basil, and 1/4 cup coconut yogurt."
}, {
    "name": "Coconut Lime Dip",
    "ingredients": ["Coconut yogurt", "lime juice", "honey"],
    "category": "dips",
    "instructions": "Mix 1/2 cup coconut yogurt, juice of 1 lime, and a drizzle of honey."
}, {
    "name": "Mango Cucumber Dressing",
    "ingredients": ["Mango", "cucumber", "coconut water"],
    "category": "dips",
    "instructions": "Blend 1/2 mango, 1/2 cucumber, and 1/4 cup coconut water."
}, {
    "name": "Pear Ginger Dressing",
    "ingredients": ["Pear", "fresh ginger", "coconut water"],
    "category": "dips",
    "instructions": "Blend 1 pear, a small piece of ginger, and 1/4 cup coconut water."
}, {
    "name": "Carrot Coconut Dip",
    "ingredients": ["Carrot", "coconut yogurt", "cinnamon"],
    "category": "dips",
    "instructions": "Steam 1 carrot, blend with 1/4 cup coconut yogurt and a pinch of cinnamon."
}, {
    "name": "Beet Mint Dip",
    "ingredients": ["Beetroot", "mint", "coconut yogurt"],
    "category": "dips",
    "instructions": "Steam 1 beet, blend with a few mint leaves, 1/4 cup coconut yogurt."
}, {
    "name": "Spinach Apple Dressing",
    "ingredients": ["Spinach", "apple", "coconut yogurt"],
    "category": "dips",
    "instructions": "Blend a handful of spinach, 1/2 apple, and 1/4 cup coconut yogurt."
}, {
    "name": "Pineapple Mint Dip",
    "ingredients": ["Pineapple", "fresh mint", "coconut yogurt"],
    "category": "dips",
    "instructions": "Blend 1/2 cup pineapple, a few mint leaves, and 1/4 cup coconut yogurt."
}, {
    "name": "Zucchini Basil Dressing",
    "ingredients": ["Zucchini", "basil", "coconut yogurt"],
    "category": "dips",
    "instructions": "Steam 1/2 zucchini, blend with 1/4 cup basil and 1/4 cup coconut yogurt."
}, {
    "name": "Apple Cinnamon Dip",
    "ingredients": ["Apple", "coconut yogurt", "cinnamon"],
    "category": "dips",
    "instructions": "Blend 1 apple, 1/4 cup coconut yogurt, and a pinch of cinnamon."
}, {
    "name": "Mango Lime Dip",
    "ingredients": ["Mango", "lime juice", "coconut yogurt"],
    "category": "dips",
    "instructions": "Blend 1/2 mango, juice of 1 lime, and 1/4 cup coconut yogurt."
}, {
    "name": "Avocado Mint Dip",
    "ingredients": ["Avocado", "fresh mint", "coconut yogurt", "salt"],
    "category": "dips",
    "instructions": "Blend 1 avocado, a few mint leaves, 1/4 cup coconut yogurt, and salt to taste."
}, {
    "name": "Pear Ginger Mint Dressing",
    "ingredients": ["Pear", "ginger", "fresh mint", "coconut yogurt"],
    "category": "dips",
    "instructions": "Blend 1 pear, a small piece of ginger, a few mint leaves, and 1/4 cup coconut yogurt."
}, {
    "name": "Honey Lemon Dip",
    "ingredients": ["Honey", "lemon juice", "coconut yogurt"],
    "category": "dips",
    "instructions": "Mix 1 tbsp honey, juice of 1/2 lemon, and 1/4 cup coconut yogurt."
}, {
    "name": "Apple Carrot Dip",
    "ingredients": ["Apple", "carrot", "coconut yogurt"],
    "category": "dips",
    "instructions": "Steam 1 carrot, blend with 1 apple and 1/4 cup coconut yogurt."
}, {
    "name": "Rice Porridge with Pears",
    "ingredients": ["White rice", "pear", "rice milk", "cinnamon"],
    "category": "breakfast",
    "instructions": "Cook 1 cup white rice in 2 cups rice milk until soft. Top with 1 sliced pear and a pinch of cinnamon."
}, {
    "name": "Coconut Yogurt with Banana",
    "ingredients": ["Coconut yogurt", "banana", "chia seeds"],
    "category": "breakfast",
    "instructions": "Slice 1 banana and serve over 1 cup coconut yogurt with 1 tbsp chia seeds."
}, {
    "name": "Apple Cinnamon Oatmeal",
    "ingredients": ["Oats", "apple", "rice milk", "cinnamon"],
    "category": "breakfast",
    "instructions": "Cook 1 cup oats in 1.5 cups rice milk. Stir in 1 chopped apple and a pinch of cinnamon."
}, {
    "name": "Pear and Oat Smoothie",
    "ingredients": ["Pear", "oats", "rice milk"],
    "category": "breakfast",
    "instructions": "Blend 1 pear, 1/4 cup oats, and 1 cup rice milk until smooth."
}, {
    "name": "Banana Quinoa Porridge",
    "ingredients": ["Quinoa", "banana", "rice milk", "vanilla extract"],
    "category": "breakfast",
    "instructions": "Cook 1/2 cup quinoa in 1 cup rice milk. Top with sliced banana and a drop of vanilla extract."
}, {
    "name": "Honeydew and Coconut Bowl",
    "ingredients": ["Honeydew melon", "coconut yogurt"],
    "category": "breakfast",
    "instructions": "Dice 1 cup honeydew melon and serve over 1/2 cup coconut yogurt."
}, {
    "name": "Rice Pancakes with Pear Compote",
    "ingredients": ["Rice flour", "pear", "rice milk", "honey"],
    "category": "breakfast",
    "instructions": "Make pancakes with 1 cup rice flour, 1 cup rice milk, and a pinch of salt. Top with warm, sliced pears and drizzle with honey."
}, {
    "name": "Cucumber Avocado Toast",
    "ingredients": ["Rice bread", "cucumber", "avocado", "salt"],
    "category": "breakfast",
    "instructions": "Mash 1/2 avocado and spread on rice bread. Top with sliced cucumber and a sprinkle of salt."
}, {
    "name": "Coconut Banana Porridge",
    "ingredients": ["Coconut milk", "banana", "oats"],
    "category": "breakfast",
    "instructions": "Cook 1/2 cup oats in 1 cup coconut milk. Top with sliced banana."
}, {
    "name": "Mango and Coconut Yogurt Bowl",
    "ingredients": ["Mango", "coconut yogurt"],
    "category": "breakfast",
    "instructions": "Dice 1/2 mango and serve over 1/2 cup coconut yogurt."
}, {
    "name": "Apple Oat Pancakes",
    "ingredients": ["Oats", "apple", "rice milk"],
    "category": "breakfast",
    "instructions": "Blend 1/2 cup oats with 1 apple and 1/2 cup rice milk. Cook small pancakes in a non-stick pan."
}, {
    "name": "Pear Chia Pudding",
    "ingredients": ["Pear", "chia seeds", "rice milk"],
    "category": "breakfast",
    "instructions": "Mix 1/4 cup chia seeds with 1 cup rice milk and refrigerate overnight. Top with diced pear."
}, {
    "name": "Spinach and Rice Frittata",
    "ingredients": ["Spinach", "rice flour", "rice milk", "salt"],
    "category": "breakfast",
    "instructions": "Mix 1 cup spinach with 1/2 cup rice flour, 1/2 cup rice milk, and a pinch of salt. Bake in a non-stick pan at 350°F for 20 minutes."
}, {
    "name": "Coconut Rice Porridge",
    "ingredients": ["White rice", "coconut milk", "honey"],
    "category": "breakfast",
    "instructions": "Cook 1 cup white rice in 1 cup coconut milk. Sweeten with honey to taste."
}, {
    "name": "Avocado Pear Smoothie Bowl",
    "ingredients": ["Avocado", "pear", "coconut yogurt", "rice milk"],
    "category": "breakfast",
    "instructions": "Blend 1 avocado, 1 pear, and 1/2 cup coconut yogurt with a splash of rice milk. Top with fresh pear slices."
}, {
    "name": "Banana Oat Muffins",
    "ingredients": ["Oats", "banana", "rice milk", "vanilla extract"],
    "category": "breakfast",
    "instructions": "Blend 1 cup oats, 1 banana, 1/2 cup rice milk, and a drop of vanilla. Pour into muffin tin and bake at 350°F for 20 minutes."
}, {
    "name": "Rice Flour Waffles",
    "ingredients": ["Rice flour", "rice milk", "cinnamon"],
    "category": "breakfast",
    "instructions": "Mix 1 cup rice flour, 1 cup rice milk, and a pinch of cinnamon. Pour batter into a waffle maker and cook until golden."
}, {
    "name": "Pear and Coconut Yogurt Parfait",
    "ingredients": ["Pear", "coconut yogurt", "chia seeds"],
    "category": "breakfast",
    "instructions": "Layer 1/2 cup coconut yogurt with diced pear and 1 tbsp chia seeds."
}, {
    "name": "Mango Rice Porridge",
    "ingredients": ["White rice", "coconut milk", "mango"],
    "category": "breakfast",
    "instructions": "Cook 1 cup white rice in 1 cup coconut milk. Top with sliced mango."
}, {
    "name": "Spinach and Apple Smoothie",
    "ingredients": ["Spinach", "apple", "rice milk"],
    "category": "breakfast",
    "instructions": "Blend 1 cup spinach, 1 apple, and 1 cup rice milk until smooth."
}, {
    "name": "Oat and Coconut Breakfast Bars",
    "ingredients": ["Oats", "coconut flakes", "rice milk", "honey"],
    "category": "breakfast",
    "instructions": "Mix 2 cups oats, 1/2 cup coconut flakes, 1/2 cup rice milk, and 2 tbsp honey. Press into a pan and bake at 350°F for 20 minutes."
}, {
    "name": "Coconut Chia Porridge",
    "ingredients": ["Chia seeds", "coconut milk", "honey"],
    "category": "breakfast",
    "instructions": "Mix 1/4 cup chia seeds with 1 cup coconut milk. Refrigerate overnight and top with honey."
}, {
    "name": "Honeydew Cucumber Smoothie",
    "ingredients": ["Honeydew melon", "cucumber", "coconut water"],
    "category": "breakfast",
    "instructions": "Blend 1 cup honeydew and 1/2 cucumber with 1 cup coconut water."
}, {
    "name": "Rice Flour Pancakes",
    "ingredients": ["Rice flour", "rice milk", "vanilla extract"],
    "category": "breakfast",
    "instructions": "Make a batter with 1 cup rice flour, 1 cup rice milk, and a drop of vanilla. Cook in a non-stick pan until golden."
}, {
    "name": "Coconut and Spinach Omelette",
    "ingredients": ["Spinach", "rice flour", "coconut milk", "salt"],
    "category": "breakfast",
    "instructions": "Mix 1 cup spinach, 1/2 cup rice flour, and 1/2 cup coconut milk. Pour into a non-stick pan and cook until set."
}, {
    "name": "Pear and Ginger Smoothie Bowl",
    "ingredients": ["Pear", "fresh ginger", "coconut yogurt"],
    "category": "breakfast",
    "instructions": "Blend 1 pear, a small piece of ginger, and 1/2 cup coconut yogurt until smooth."
}, {
    "name": "Apple Cinnamon Chia Pudding",
    "ingredients": ["Chia seeds", "apple", "rice milk", "cinnamon"],
    "category": "breakfast",
    "instructions": "Mix 1/4 cup chia seeds with 1 cup rice milk and refrigerate overnight. Top with chopped apple and a pinch of cinnamon."
}, {
    "name": "Banana Coconut Crepes",
    "ingredients": ["Coconut flour", "banana", "rice milk"],
    "category": "breakfast",
    "instructions": "Blend 1 banana, 1/4 cup coconut flour, and 1 cup rice milk. Cook thin crepes in a non-stick pan."
}, {
    "name": "Honeydew Rice Porridge",
    "ingredients": ["White rice", "honeydew melon", "coconut milk"],
    "category": "breakfast",
    "instructions": "Cook 1 cup white rice in 1 cup coconut milk. Top with diced honeydew."
}, {
    "name": "Pear and Spinach Omelette",
    "ingredients": ["Pear", "spinach", "rice flour", "coconut milk", "salt"],
    "category": "breakfast",
    "instructions": "Mix 1/2 diced pear, 1 cup spinach, 1/4 cup rice flour, and 1/4 cup coconut milk. Pour into a non-stick pan and cook until set."
}, {
    "name": "Coconut Rice Pudding",
    "ingredients": ["White rice", "coconut milk", "honey", "vanilla extract"],
    "category": "breakfast",
    "instructions": "Cook 1 cup white rice in 1 cup coconut milk. Sweeten with honey and add a drop of vanilla."
}, {
    "name": "Cucumber Avocado Bowl",
    "ingredients": ["Cucumber", "avocado", "coconut yogurt", "salt"],
    "category": "breakfast",
    "instructions": "Dice 1 cucumber and 1 avocado. Mix with 1/4 cup coconut yogurt and salt to taste."
}, {
    "name": "Banana and Rice Muffins",
    "ingredients": ["Rice flour", "banana", "rice milk", "cinnamon"],
    "category": "breakfast",
    "instructions": "Blend 1 cup rice flour, 1 banana, 1/2 cup rice milk, and a pinch of cinnamon. Pour into muffin tin and bake at 350°F for 20 minutes."
}, {
    "name": "Spinach Pear Smoothie",
    "ingredients": ["Spinach", "pear", "rice milk"],
    "category": "breakfast",
    "instructions": "Blend 1 cup spinach, 1 pear, and 1 cup rice milk until smooth."
}, {
    "name": "Carrot Apple Muffins",
    "ingredients": ["Rice flour", "carrot", "apple", "rice milk"],
    "category": "breakfast",
    "instructions": "Grate 1 carrot and 1 apple. Mix with 1 cup rice flour and 1/2 cup rice milk. Pour into muffin tin and bake at 350°F for 20 minutes."
}, {
    "name": "Avocado Coconut Toast",
    "ingredients": ["Rice bread", "avocado", "coconut flakes", "salt"],
    "category": "breakfast",
    "instructions": "Mash 1/2 avocado and spread on toasted rice bread. Top with coconut flakes and salt."
}, {
    "name": "Honeydew and Spinach Smoothie",
    "ingredients": ["Honeydew melon", "spinach", "coconut water"],
    "category": "breakfast",
    "instructions": "Blend 1 cup honeydew, a handful of spinach, and 1 cup coconut water."
}, {
    "name": "Coconut Pear Pudding",
    "ingredients": ["Coconut yogurt", "pear", "chia seeds"],
    "category": "breakfast",
    "instructions": "Layer 1/2 cup coconut yogurt with diced pear and 1 tbsp chia seeds."
}, {
    "name": "Cucumber Rice Bowl",
    "ingredients": ["Cucumber", "rice", "coconut yogurt", "salt"],
    "category": "breakfast",
    "instructions": "Serve sliced cucumber over 1 cup cooked rice with a dollop of coconut yogurt and salt."
}, {
    "name": "Apple Oat Waffles",
    "ingredients": ["Oats", "apple", "rice milk"],
    "category": "breakfast",
    "instructions": "Blend 1 cup oats, 1 apple, and 1 cup rice milk. Pour batter into a waffle maker and cook until golden."
}, {
    "name": "Coconut Banana Smoothie",
    "ingredients": ["Coconut milk", "banana", "vanilla extract"],
    "category": "breakfast",
    "instructions": "Blend 1 cup coconut milk, 1 banana, and a drop of vanilla extract."
}, {
    "name": "Pear Rice Porridge",
    "ingredients": ["White rice", "pear", "rice milk", "cinnamon"],
    "category": "breakfast",
    "instructions": "Cook 1 cup white rice in 2 cups rice milk until soft. Top with sliced pear and a pinch of cinnamon."
}, {
    "name": "Mango Coconut Waffles",
    "ingredients": ["Rice flour", "mango", "coconut milk"],
    "category": "breakfast",
    "instructions": "Blend 1/2 mango, 1 cup rice flour, and 1 cup coconut milk. Pour batter into a waffle maker and cook until golden."
}, {
    "name": "Honeydew Coconut Parfait",
    "ingredients": ["Honeydew melon", "coconut yogurt", "chia seeds"],
    "category": "breakfast",
    "instructions": "Layer diced honeydew, 1/2 cup coconut yogurt, and 1 tbsp chia seeds in a bowl."
}, {
    "name": "Spinach and Avocado Wrap",
    "ingredients": ["Rice tortilla", "spinach", "avocado"],
    "category": "breakfast",
    "instructions": "Spread mashed avocado on a rice tortilla. Top with fresh spinach and roll up."
}, {
    "name": "Apple Rice Porridge",
    "ingredients": ["White rice", "apple", "rice milk", "cinnamon"],
    "category": "breakfast",
    "instructions": "Cook 1 cup white rice in 1.5 cups rice milk. Stir in chopped apple and a pinch of cinnamon."
}, {
    "name": "Banana Coconut Waffles",
    "ingredients": ["Rice flour", "banana", "coconut milk"],
    "category": "breakfast",
    "instructions": "Blend 1 banana, 1 cup rice flour, and 1 cup coconut milk. Pour batter into a waffle maker and cook until golden."
}, {
    "name": "Cucumber Melon Bowl",
    "ingredients": ["Cucumber", "honeydew melon", "coconut yogurt"],
    "category": "breakfast",
    "instructions": "Dice 1/2 cucumber and 1/2 cup honeydew melon. Serve over 1/4 cup coconut yogurt."
}, {
    "name": "Cucumber Avocado Salad",
    "ingredients": ["Cucumber", "avocado", "rice vinegar", "salt"],
    "category": "lunch",
    "instructions": "Dice cucumber and avocado, toss with a splash of rice vinegar and salt to taste."
}, {
    "name": "Coconut Rice with Veggies",
    "ingredients": ["White rice", "coconut milk", "zucchini", "spinach"],
    "category": "lunch",
    "instructions": "Cook 1 cup rice in 1 cup coconut milk, add sautéed zucchini and spinach on top."
}, {
    "name": "Pear and Spinach Salad",
    "ingredients": ["Spinach", "pear", "coconut yogurt"],
    "category": "lunch",
    "instructions": "Toss 1 cup spinach with 1 diced pear and 2 tbsp coconut yogurt."
}, {
    "name": "Zucchini Noodles with Avocado",
    "ingredients": ["Zucchini", "avocado", "lemon juice", "salt"],
    "category": "lunch",
    "instructions": "Spiralize 1 zucchini and toss with mashed avocado, lemon juice, and a pinch of salt."
}, {
    "name": "Rice and Chickpea Bowl",
    "ingredients": ["White rice", "chickpeas", "cucumber", "salt"],
    "category": "lunch",
    "instructions": "Combine 1 cup cooked rice with 1/2 cup chickpeas and diced cucumber, season with salt."
}, {
    "name": "Quinoa Spinach Salad",
    "ingredients": ["Quinoa", "spinach", "cucumber", "lemon juice"],
    "category": "lunch",
    "instructions": "Mix 1 cup cooked quinoa with 1 cup spinach, diced cucumber, and a squeeze of lemon juice."
}, {
    "name": "Coconut Chickpea Curry",
    "ingredients": ["Coconut milk", "chickpeas", "spinach", "rice"],
    "category": "lunch",
    "instructions": "Simmer 1/2 cup chickpeas in 1 cup coconut milk with spinach. Serve over rice."
}, {
    "name": "Avocado Cucumber Wrap",
    "ingredients": ["Rice tortilla", "avocado", "cucumber"],
    "category": "lunch",
    "instructions": "Spread mashed avocado on a rice tortilla, add cucumber slices, and roll up."
}, {
    "name": "Sweet Potato and Rice Bowl",
    "ingredients": ["Sweet potato", "rice", "spinach"],
    "category": "lunch",
    "instructions": "Roast sweet potato, add to 1 cup cooked rice with spinach leaves."
}, {
    "name": "Mango and Spinach Salad",
    "ingredients": ["Spinach", "mango", "cucumber", "rice vinegar"],
    "category": "lunch",
    "instructions": "Toss spinach with diced mango and cucumber, add a splash of rice vinegar."
}, {
    "name": "Lentil Spinach Soup",
    "ingredients": ["Lentils", "spinach", "carrots", "water"],
    "category": "lunch",
    "instructions": "Cook 1 cup lentils with water and diced carrots, add spinach before serving."
}, {
    "name": "Carrot and Rice Salad",
    "ingredients": ["Shredded carrot", "rice", "parsley", "rice vinegar"],
    "category": "lunch",
    "instructions": "Toss shredded carrot with 1 cup cooked rice, parsley, and a splash of rice vinegar."
}, {
    "name": "Chickpea Avocado Salad",
    "ingredients": ["Chickpeas", "avocado", "lemon juice"],
    "category": "lunch",
    "instructions": "Mash 1 avocado with 1/2 cup chickpeas and lemon juice."
}, {
    "name": "Coconut Quinoa with Pear",
    "ingredients": ["Quinoa", "coconut milk", "pear", "cinnamon"],
    "category": "lunch",
    "instructions": "Cook 1 cup quinoa in 1 cup coconut milk, top with sliced pear and a pinch of cinnamon."
}, {
    "name": "Spinach Rice Stir-Fry",
    "ingredients": ["Spinach", "rice", "coconut oil"],
    "category": "lunch",
    "instructions": "Sauté spinach in 1 tbsp coconut oil, stir in 1 cup cooked rice."
}, {
    "name": "Zucchini and Chickpea Salad",
    "ingredients": ["Zucchini", "chickpeas", "parsley", "lemon juice"],
    "category": "lunch",
    "instructions": "Toss diced zucchini with chickpeas, parsley, and lemon juice."
}, {
    "name": "Cucumber and Rice Bowl",
    "ingredients": ["Cucumber", "rice", "coconut yogurt"],
    "category": "lunch",
    "instructions": "Serve sliced cucumber over 1 cup cooked rice with a dollop of coconut yogurt."
}, {
    "name": "Sweet Potato Quinoa Bowl",
    "ingredients": ["Sweet potato", "quinoa", "spinach"],
    "category": "lunch",
    "instructions": "Roast sweet potato, add to 1 cup cooked quinoa with fresh spinach."
}, {
    "name": "Lentil and Rice Pilaf",
    "ingredients": ["Lentils", "rice", "parsley"],
    "category": "lunch",
    "instructions": "Cook 1 cup lentils with 1 cup rice, stir in chopped parsley."
}, {
    "name": "Coconut Chickpea Salad",
    "ingredients": ["Coconut yogurt", "chickpeas", "cucumber"],
    "category": "lunch",
    "instructions": "Mix 1/2 cup coconut yogurt with chickpeas and diced cucumber."
}, {
    "name": "Avocado Spinach Wrap",
    "ingredients": ["Rice tortilla", "avocado", "spinach"],
    "category": "lunch",
    "instructions": "Spread mashed avocado on a rice tortilla, add spinach, and roll up."
}, {
    "name": "Mango Rice Salad",
    "ingredients": ["Mango", "rice", "cucumber", "coconut yogurt"],
    "category": "lunch",
    "instructions": "Toss diced mango with 1 cup cooked rice, cucumber, and a spoonful of coconut yogurt."
}, {
    "name": "Zucchini Rice Stir-Fry",
    "ingredients": ["Zucchini", "rice", "coconut oil", "salt"],
    "category": "lunch",
    "instructions": "Sauté zucchini in 1 tbsp coconut oil, add 1 cup cooked rice, and season with salt."
}, {
    "name": "Chickpea and Rice Bowl",
    "ingredients": ["Chickpeas", "rice", "spinach", "lemon juice"],
    "category": "lunch",
    "instructions": "Combine chickpeas with 1 cup rice, spinach, and a squeeze of lemon juice."
}, {
    "name": "Pear Spinach Salad",
    "ingredients": ["Pear", "spinach", "rice vinegar", "coconut yogurt"],
    "category": "lunch",
    "instructions": "Toss diced pear with spinach, a splash of rice vinegar, and a dollop of coconut yogurt."
}, {
    "name": "Sweet Potato Quinoa Salad",
    "ingredients": ["Sweet potato", "quinoa", "cucumber", "parsley"],
    "category": "lunch",
    "instructions": "Mix roasted sweet potato with 1 cup quinoa, diced cucumber, and parsley."
}, {
    "name": "Carrot and Chickpea Salad",
    "ingredients": ["Shredded carrot", "chickpeas", "parsley", "lemon juice"],
    "category": "lunch",
    "instructions": "Toss shredded carrot with chickpeas, parsley, and lemon juice."
}, {
    "name": "Coconut Lentil Soup",
    "ingredients": ["Lentils", "coconut milk", "water", "spinach"],
    "category": "lunch",
    "instructions": "Simmer 1 cup lentils in coconut milk with water and add spinach before serving."
}, {
    "name": "Mango Spinach Salad",
    "ingredients": ["Mango", "spinach", "cucumber", "rice vinegar"],
    "category": "lunch",
    "instructions": "Toss diced mango with spinach, cucumber, and a splash of rice vinegar."
}, {
    "name": "Rice Noodles with Veggies",
    "ingredients": ["Rice noodles", "zucchini", "spinach", "coconut oil"],
    "category": "lunch",
    "instructions": "Sauté zucchini and spinach in coconut oil, toss with cooked rice noodles."
}, {
    "name": "Avocado Quinoa Bowl",
    "ingredients": ["Avocado", "quinoa", "spinach", "lemon juice"],
    "category": "lunch",
    "instructions": "Top 1 cup cooked quinoa with sliced avocado and spinach, drizzle with lemon juice."
}, {
    "name": "Coconut Rice Bowl",
    "ingredients": ["White rice", "coconut milk", "cucumber", "mint"],
    "category": "lunch",
    "instructions": "Cook 1 cup rice in 1 cup coconut milk, top with cucumber and fresh mint."
}, {
    "name": "Spinach Chickpea Wrap",
    "ingredients": ["Spinach", "chickpeas", "rice tortilla", "coconut yogurt"],
    "category": "lunch",
    "instructions": "Spread coconut yogurt on a rice tortilla, add spinach and chickpeas, and roll up."
}, {
    "name": "Zucchini Lentil Salad",
    "ingredients": ["Zucchini", "lentils", "parsley", "rice vinegar"],
    "category": "lunch",
    "instructions": "Toss cooked lentils with diced zucchini, parsley, and a splash of rice vinegar."
}, {
    "name": "Sweet Potato Rice Bowl",
    "ingredients": ["Sweet potato", "rice", "cucumber"],
    "category": "lunch",
    "instructions": "Serve roasted sweet potato over 1 cup cooked rice with sliced cucumber."
}, {
    "name": "Mango Chickpea Salad",
    "ingredients": ["Mango", "chickpeas", "spinach", "rice vinegar"],
    "category": "lunch",
    "instructions": "Toss diced mango with chickpeas, spinach, and a splash of rice vinegar."
}, {
    "name": "Coconut Quinoa with Spinach",
    "ingredients": ["Quinoa", "coconut milk", "spinach"],
    "category": "lunch",
    "instructions": "Cook 1 cup quinoa in 1 cup coconut milk, stir in fresh spinach."
}, {
    "name": "Rice and Avocado Salad",
    "ingredients": ["White rice", "avocado", "cucumber", "lemon juice"],
    "category": "lunch",
    "instructions": "Combine 1 cup rice with diced avocado and cucumber, drizzle with lemon juice."
}, {
    "name": "Zucchini and Rice Bowl",
    "ingredients": ["Zucchini", "rice", "coconut oil", "salt"],
    "category": "lunch",
    "instructions": "Sauté zucchini in coconut oil, serve over 1 cup cooked rice, and season with salt."
}, {
    "name": "Chickpea Quinoa Salad",
    "ingredients": ["Chickpeas", "quinoa", "spinach", "parsley"],
    "category": "lunch",
    "instructions": "Mix chickpeas with 1 cup quinoa, spinach, and parsley."
}, {
    "name": "Sweet Potato and Spinach Wrap",
    "ingredients": ["Sweet potato", "spinach", "rice tortilla"],
    "category": "lunch",
    "instructions": "Spread mashed sweet potato on a rice tortilla, add spinach, and roll up."
}, {
    "name": "Coconut Lentil Stew",
    "ingredients": ["Lentils", "coconut milk", "zucchini", "spinach"],
    "category": "lunch",
    "instructions": "Simmer lentils in coconut milk, add zucchini and spinach before serving."
}, {
    "name": "Avocado Mango Salad",
    "ingredients": ["Avocado", "mango", "spinach", "lemon juice"],
    "category": "lunch",
    "instructions": "Combine diced avocado and mango with spinach, drizzle with lemon juice."
}, {
    "name": "Rice Noodle Stir-Fry",
    "ingredients": ["Rice noodles", "spinach", "coconut oil", "salt"],
    "category": "lunch",
    "instructions": "Sauté spinach in coconut oil, toss with cooked rice noodles, and season with salt."
}, {
    "name": "Pear Quinoa Salad",
    "ingredients": ["Pear", "quinoa", "spinach", "coconut yogurt"],
    "category": "lunch",
    "instructions": "Toss diced pear with quinoa, spinach, and a spoonful of coconut yogurt."
}, {
    "name": "Zucchini Chickpea Wrap",
    "ingredients": ["Zucchini", "chickpeas", "rice tortilla", "parsley"],
    "category": "lunch",
    "instructions": "Spread mashed chickpeas on a rice tortilla, add zucchini and parsley, and roll up."
}, {
    "name": "Mango Rice Noodle Salad",
    "ingredients": ["Mango", "rice noodles", "spinach", "coconut yogurt"],
    "category": "lunch",
    "instructions": "Toss diced mango with cooked rice noodles, spinach, and a spoonful of coconut yogurt."
}, {
    "name": "Sweet Potato Chickpea Salad",
    "ingredients": ["Sweet potato", "chickpeas", "spinach", "parsley"],
    "category": "lunch",
    "instructions": "Combine roasted sweet potato with chickpeas, spinach, and parsley."
}, {
    "name": "Avocado Spinach Wrap",
    "ingredients": ["Avocado", "spinach", "rice tortilla", "lemon juice"],
    "category": "lunch",
    "instructions": "Spread mashed avocado on a rice tortilla, add spinach, and drizzle with lemon juice before rolling up."
}, {
    "name": "Coconut Lentil Salad",
    "ingredients": ["Lentils", "coconut milk", "cucumber", "mint"],
    "category": "lunch",
    "instructions": "Toss cooked lentils with a splash of coconut milk, diced cucumber, and fresh mint."
}, {
    "name": "Rice Quinoa Bowl",
    "ingredients": ["White rice", "quinoa", "spinach", "parsley"],
    "category": "lunch",
    "instructions": "Mix 1/2 cup rice and 1/2 cup quinoa, top with spinach and parsley."
}, {
    "name": "Mango Chickpea Wrap",
    "ingredients": ["Mango", "chickpeas", "rice tortilla", "spinach"],
    "category": "lunch",
    "instructions": "Spread mashed chickpeas on a rice tortilla, add diced mango and spinach, and roll up."
}, {
    "name": "Spinach and Rice Pilaf",
    "ingredients": ["Spinach", "rice", "coconut oil", "parsley"],
    "category": "lunch",
    "instructions": "Sauté spinach in coconut oil, stir in 1 cup cooked rice, and add parsley."
}, {
    "name": "Zucchini and Lentil Soup",
    "ingredients": ["Zucchini", "lentils", "coconut milk", "water"],
    "category": "lunch",
    "instructions": "Simmer lentils in coconut milk with water, add diced zucchini before serving."
}, {
    "name": "Avocado Quinoa Salad",
    "ingredients": ["Avocado", "quinoa", "spinach", "lemon juice"],
    "category": "lunch",
    "instructions": "Combine 1 cup quinoa with sliced avocado and spinach, drizzle with lemon juice."
}, {
    "name": "Sweet Potato Rice Wrap",
    "ingredients": ["Sweet potato", "rice", "rice tortilla", "coconut yogurt"],
    "category": "lunch",
    "instructions": "Spread mashed sweet potato on a rice tortilla, add 1/2 cup cooked rice and a spoonful of coconut yogurt before rolling up."
}, {
    "name": "Mango Lentil Salad",
    "ingredients": ["Mango", "lentils", "spinach", "parsley"],
    "category": "lunch",
    "instructions": "Toss diced mango with cooked lentils, spinach, and parsley."
}, {
    "name": "Pear Slices with Coconut Yogurt",
    "ingredients": ["Pear", "coconut yogurt"],
    "category": "snack",
    "instructions": "Slice 1 pear and serve with a side of coconut yogurt for dipping."
}, {
    "name": "Cucumber Avocado Bites",
    "ingredients": ["Cucumber", "avocado", "salt"],
    "category": "snack",
    "instructions": "Slice cucumber and top with mashed avocado and a sprinkle of salt."
}, {
    "name": "Coconut Banana Smoothie",
    "ingredients": ["Banana", "coconut milk", "ice cubes"],
    "category": "snack",
    "instructions": "Blend 1 banana with 1 cup coconut milk and a few ice cubes."
}, {
    "name": "Apple Coconut Yogurt Bowl",
    "ingredients": ["Apple", "coconut yogurt", "chia seeds"],
    "category": "snack",
    "instructions": "Dice 1 apple and mix with 1/2 cup coconut yogurt, sprinkle with chia seeds."
}, {
    "name": "Carrot Sticks with Hummus",
    "ingredients": ["Carrot", "chickpeas", "olive oil", "lemon juice"],
    "category": "snack",
    "instructions": "Blend 1 cup cooked chickpeas, 1 tbsp olive oil, and lemon juice to make hummus. Serve with carrot sticks."
}, {
    "name": "Rice Cakes with Avocado",
    "ingredients": ["Rice cakes", "avocado", "salt"],
    "category": "snack",
    "instructions": "Spread mashed avocado on rice cakes and sprinkle with a pinch of salt."
}, {
    "name": "Banana Oat Bites",
    "ingredients": ["Oats", "banana", "cinnamon"],
    "category": "snack",
    "instructions": "Mash 1 banana with 1/2 cup oats and a pinch of cinnamon, form into balls, and refrigerate."
}, {
    "name": "Pear and Spinach Smoothie",
    "ingredients": ["Pear", "spinach", "rice milk"],
    "category": "snack",
    "instructions": "Blend 1 pear with a handful of spinach and 1 cup rice milk."
}, {
    "name": "Coconut Chia Pudding",
    "ingredients": ["Chia seeds", "coconut milk", "honey"],
    "category": "snack",
    "instructions": "Mix 1/4 cup chia seeds with 1 cup coconut milk, sweeten with honey, and refrigerate overnight."
}, {
    "name": "Honeydew Melon Slices",
    "ingredients": ["Honeydew melon"],
    "category": "snack",
    "instructions": "Slice honeydew melon and serve chilled."
}, {
    "name": "Zucchini Chips",
    "ingredients": ["Zucchini", "olive oil", "salt"],
    "category": "snack",
    "instructions": "Slice zucchini thinly, brush with olive oil, sprinkle with salt, and bake at 250°F until crisp."
}, {
    "name": "Cucumber Mint Smoothie",
    "ingredients": ["Cucumber", "mint", "coconut water"],
    "category": "snack",
    "instructions": "Blend 1 cucumber with a few mint leaves and 1 cup coconut water."
}, {
    "name": "Coconut Rice Balls",
    "ingredients": ["Cooked white rice", "coconut flakes", "honey"],
    "category": "snack",
    "instructions": "Mix 1 cup cooked rice with 1/4 cup coconut flakes and a drizzle of honey. Form into balls and refrigerate."
}, {
    "name": "Banana Oat Muffins",
    "ingredients": ["Oats", "banana", "rice milk"],
    "category": "snack",
    "instructions": "Blend 1 cup oats, 1 banana, and 1/2 cup rice milk, pour into muffin tin, and bake at 350°F for 20 minutes."
}, {
    "name": "Pear and Coconut Yogurt Parfait",
    "ingredients": ["Pear", "coconut yogurt", "chia seeds"],
    "category": "snack",
    "instructions": "Layer 1/2 cup coconut yogurt with diced pear and a sprinkle of chia seeds."
}, {
    "name": "Carrot Apple Smoothie",
    "ingredients": ["Carrot", "apple", "rice milk"],
    "category": "snack",
    "instructions": "Blend 1 carrot, 1 apple, and 1 cup rice milk."
}, {
    "name": "Coconut Milk Popsicles",
    "ingredients": ["Coconut milk", "honey", "vanilla extract"],
    "category": "snack",
    "instructions": "Mix 1 cup coconut milk, a drizzle of honey, and a drop of vanilla, pour into molds, and freeze."
}, {
    "name": "Avocado Rice Crackers",
    "ingredients": ["Rice crackers", "avocado", "salt"],
    "category": "snack",
    "instructions": "Spread mashed avocado on rice crackers, sprinkle with salt."
}, {
    "name": "Banana Coconut Smoothie Bowl",
    "ingredients": ["Banana", "coconut yogurt", "chia seeds"],
    "category": "snack",
    "instructions": "Blend 1 banana with 1/2 cup coconut yogurt, top with chia seeds."
}, {
    "name": "Apple Cinnamon Oat Bites",
    "ingredients": ["Oats", "apple", "cinnamon"],
    "category": "snack",
    "instructions": "Mix 1/2 cup oats with 1/2 chopped apple and a pinch of cinnamon, form into balls, and refrigerate."
}, {
    "name": "Mango Coconut Smoothie",
    "ingredients": ["Mango", "coconut water", "ice cubes"],
    "category": "snack",
    "instructions": "Blend 1/2 mango with 1 cup coconut water and a few ice cubes."
}, {
    "name": "Spinach Pear Smoothie",
    "ingredients": ["Spinach", "pear", "coconut water"],
    "category": "snack",
    "instructions": "Blend 1 cup spinach, 1 pear, and 1 cup coconut water until smooth."
}, {
    "name": "Cucumber and Pear Salad",
    "ingredients": ["Cucumber", "pear", "coconut yogurt"],
    "category": "snack",
    "instructions": "Toss sliced cucumber and pear with a spoonful of coconut yogurt."
}, {
    "name": "Coconut Rice Pudding",
    "ingredients": ["White rice", "coconut milk", "honey"],
    "category": "snack",
    "instructions": "Cook 1 cup white rice in 1 cup coconut milk, sweeten with honey."
}, {
    "name": "Honeydew Cucumber Water",
    "ingredients": ["Honeydew melon", "cucumber", "water"],
    "category": "snack",
    "instructions": "Blend 1 cup honeydew with 1/2 cucumber and 1 cup water."
}, {
    "name": "Avocado Cucumber Slices",
    "ingredients": ["Avocado", "cucumber", "salt"],
    "category": "snack",
    "instructions": "Place avocado slices on cucumber rounds, sprinkle with salt."
}, {
    "name": "Carrot Zucchini Muffins",
    "ingredients": ["Carrot", "zucchini", "rice flour", "rice milk"],
    "category": "snack",
    "instructions": "Mix grated carrot and zucchini with 1 cup rice flour and 1/2 cup rice milk, pour into muffin tin, and bake at 350°F for 20 minutes."
}, {
    "name": "Banana Oat Bars",
    "ingredients": ["Oats", "banana", "coconut oil"],
    "category": "snack",
    "instructions": "Mix 1 cup oats, 1 mashed banana, and 1 tbsp coconut oil, press into a pan, and bake at 350°F for 15 minutes."
}, {
    "name": "Apple Spinach Smoothie",
    "ingredients": ["Apple", "spinach", "coconut water"],
    "category": "snack",
    "instructions": "Blend 1 apple with a handful of spinach and 1 cup coconut water."
}, {
    "name": "Rice Crackers with Coconut Yogurt",
    "ingredients": ["Rice crackers", "coconut yogurt"],
    "category": "snack",
    "instructions": "Serve rice crackers with coconut yogurt for dipping."
}, {
    "name": "Mango Spinach Smoothie",
    "ingredients": ["Mango", "spinach", "rice milk"],
    "category": "snack",
    "instructions": "Blend 1/2 mango, 1 cup spinach, and 1 cup rice milk until smooth."
}, {
    "name": "Zucchini Fritters",
    "ingredients": ["Zucchini", "rice flour", "coconut oil", "salt"],
    "category": "snack",
    "instructions": "Grate 1 zucchini, mix with 1/4 cup rice flour, form into patties, and fry in coconut oil."
}, {
    "name": "Coconut Pear Smoothie",
    "ingredients": ["Pear", "coconut milk", "ice cubes"],
    "category": "snack",
    "instructions": "Blend 1 pear with 1 cup coconut milk and a few ice cubes."
}, {
    "name": "Spinach Avocado Roll-ups",
    "ingredients": ["Spinach", "avocado", "rice tortilla"],
    "category": "snack",
    "instructions": "Spread mashed avocado on a rice tortilla, add spinach, and roll up."
}, {
    "name": "Honeydew Lime Popsicles",
    "ingredients": ["Honeydew melon", "lime juice", "coconut water"],
    "category": "snack",
    "instructions": "Blend 1 cup honeydew with lime juice and coconut water, pour into molds, and freeze."
}, {
    "name": "Carrot Apple Popsicles",
    "ingredients": ["Carrot", "apple", "coconut water"],
    "category": "snack",
    "instructions": "Blend 1 carrot with 1 apple and coconut water, pour into molds, and freeze."
}, {
    "name": "Avocado Rice Cakes",
    "ingredients": ["Rice cakes", "avocado", "salt"],
    "category": "snack",
    "instructions": "Spread mashed avocado on rice cakes and sprinkle with a pinch of salt."
}, {
    "name": "Coconut Mango Bites",
    "ingredients": ["Coconut flakes", "mango", "honey"],
    "category": "snack",
    "instructions": "Mix 1 cup coconut flakes with diced mango and a drizzle of honey, form into balls, and refrigerate."
}, {
    "name": "Pear Apple Smoothie",
    "ingredients": ["Pear", "apple", "rice milk"],
    "category": "snack",
    "instructions": "Blend 1 pear, 1 apple, and 1 cup rice milk until smooth."
}, {
    "name": "Banana Chia Pudding",
    "ingredients": ["Banana", "chia seeds", "coconut milk"],
    "category": "snack",
    "instructions": "Mash 1 banana with 1/4 cup chia seeds and 1 cup coconut milk, refrigerate overnight."
}, {
    "name": "Cucumber Mint Popsicles",
    "ingredients": ["Cucumber", "mint", "coconut water"],
    "category": "snack",
    "instructions": "Blend 1 cucumber with mint and coconut water, pour into molds, and freeze."
}, {
    "name": "Spinach and Pear Smoothie Bowl",
    "ingredients": ["Spinach", "pear", "coconut yogurt"],
    "category": "snack",
    "instructions": "Blend a handful of spinach with 1 pear and 1/2 cup coconut yogurt."
}, {
    "name": "Zucchini Avocado Slices",
    "ingredients": ["Zucchini", "avocado", "salt"],
    "category": "snack",
    "instructions": "Place avocado slices on thin zucchini rounds and sprinkle with a pinch of salt."
}, {
    "name": "Apple Pear Popsicles",
    "ingredients": ["Apple", "pear", "coconut water"],
    "category": "snack",
    "instructions": "Blend 1 apple and 1 pear with coconut water, pour into molds, and freeze."
}, {
    "name": "Cucumber Honeydew Salad",
    "ingredients": ["Cucumber", "honeydew melon", "mint"],
    "category": "snack",
    "instructions": "Toss sliced cucumber with honeydew melon and fresh mint."
}, {
    "name": "Carrot Rice Bites",
    "ingredients": ["Carrot", "rice", "coconut yogurt"],
    "category": "snack",
    "instructions": "Mix grated carrot with 1 cup cooked rice and a spoonful of coconut yogurt, form into balls, and refrigerate."
}, {
    "name": "Coconut Milk Yogurt with Pear",
    "ingredients": ["Coconut yogurt", "pear", "honey"],
    "category": "snack",
    "instructions": "Slice 1 pear and serve with coconut yogurt and a drizzle of honey."
}, {
    "name": "Zucchini Chips with Salt",
    "ingredients": ["Zucchini", "salt", "olive oil"],
    "category": "snack",
    "instructions": "Slice zucchini thinly, brush with olive oil, sprinkle with salt, and bake at 250°F until crispy."
}, {
    "name": "Mango Coconut Yogurt Bowl",
    "ingredients": ["Mango", "coconut yogurt"],
    "category": "snack",
    "instructions": "Dice 1/2 mango and mix with 1/2 cup coconut yogurt."
}, {
    "name": "Banana Apple Smoothie",
    "ingredients": ["Banana", "apple", "coconut water"],
    "category": "snack",
    "instructions": "Blend 1 banana, 1 apple, and 1 cup coconut water until smooth."
}, {
    "name": "Spinach Rice Cakes",
    "ingredients": ["Rice cakes", "spinach", "coconut yogurt"],
    "category": "snack",
    "instructions": "Top rice cakes with fresh spinach and a spoonful of coconut yogurt."
}, {
    "name": "Cucumber and Coconut Dip",
    "ingredients": ["Cucumber", "coconut yogurt", "dill"],
    "category": "snack",
    "instructions": "Blend 1 cucumber with 1/2 cup coconut yogurt and a pinch of dill."
}, {
    "name": "Carrot Coconut Popsicles",
    "ingredients": ["Carrot", "coconut milk", "honey"],
    "category": "snack",
    "instructions": "Blend 1 carrot with 1 cup coconut milk and a drizzle of honey, pour into molds, and freeze."
}, {
    "name": "Zucchini and Pear Salad",
    "ingredients": ["Zucchini", "pear", "rice vinegar"],
    "category": "snack",
    "instructions": "Toss sliced zucchini and pear with a splash of rice vinegar."
}, {
    "name": "Honeydew Cucumber Smoothie",
    "ingredients": ["Honeydew melon", "cucumber", "coconut water"],
    "category": "snack",
    "instructions": "Blend 1 cup honeydew, 1/2 cucumber, and 1 cup coconut water."
}
];


// Create a case-insensitive version of ingredientLevels
const ingredientLevelsLowerCase = {};
Object.keys(ingredientLevels).forEach(key => {
    ingredientLevelsLowerCase[key.toLowerCase()] = ingredientLevels[key];
});


// Generate ingredientCategories dynamically from ingredientLevels
const ingredientCategories = Object.keys(ingredientLevels).reduce((categories, ingredient) => {
    const { category } = ingredientLevels[ingredient];
    if (!categories[category]) {
        categories[category] = [];
    }
    categories[category].push(ingredient.toLowerCase()); // Ensure all ingredient names are lowercase
    return categories;
}, {});

// Display recipes
// Display recipes with clickable ingredients for details
function displayRecipes(recipesToDisplay = recipes) {
    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.innerHTML = ""; // Clear container

    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
        
        const title = document.createElement("h3");
        title.innerText = recipe.name;
        recipeCard.appendChild(title);

        // Display recipe category with color coding
        const category = document.createElement("p");
        category.className = `recipe-category ${recipe.category.toLowerCase()}`; // Add category as a class
        category.innerText = `Category: ${capitalizeFirstLetter(recipe.category)}`;
        recipeCard.appendChild(category);

        const ingredientsList = document.createElement("ul");
        recipe.ingredients.forEach(ingredientName => {
            //const levels = ingredientLevelsLowerCase[ingredientName.toLowerCase()] || {}; // Case-insensitive lookup
            const levels = getIngredientLevels(ingredientName); // Use the new function for lookup
            const item = document.createElement("li");
            item.className = `ingredient ${colorBasedOnLevels(levels)}`;
            item.innerText = ingredientName;
            item.onclick = () => openModal(ingredientName, levels); // Add click event to open modal
            ingredientsList.appendChild(item);
        });
        recipeCard.appendChild(ingredientsList);

        const instructions = document.createElement("p");
        instructions.innerText = recipe.instructions;
        recipeCard.appendChild(instructions);

        const favoriteButton = document.createElement("button");
        favoriteButton.className = "favorite-button";
        favoriteButton.innerText = "Add to Favorites";
        favoriteButton.onclick = () => addToFavorites(recipe);
        recipeCard.appendChild(favoriteButton);

        recipeContainer.appendChild(recipeCard);
    });
}

// Helper function to capitalize the first letter of the category
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



// Open Modal to display ingredient details
function openModal(ingredientName, levels) {
    document.getElementById("ingredientTitle").innerText = ingredientName;
    document.getElementById("salicylatesLevel").innerText = levels.salicylates || "Not available";
    document.getElementById("salicylatesLevel").className = "levelColor" + levels.salicylates;

    document.getElementById("aminesLevel").innerText = levels.amines || "Not available";
    document.getElementById("aminesLevel").className = "levelColor" + levels.amines;

    document.getElementById("msgLevel").innerText = levels.msg || "Not available";
    document.getElementById("msgLevel").className = "levelColor" + levels.msg;

    document.getElementById("sulphitesLevel").innerText = levels.sulphites || "Not available";
    document.getElementById("sulphitesLevel").className = "levelColor" + levels.sulphites;

    document.getElementById("nitratesLevel").innerText = levels.nitrates || "Not available";
    document.getElementById("nitratesLevel").className = "levelColor" + levels.nitrates;

    // Display the modal
    document.getElementById("ingredientModal").style.display = "block";
}

// Close Modal
function closeModal() {
    document.getElementById("ingredientModal").style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("ingredientModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}


// Coloring ingredients based on levels
function colorBasedOnLevels(levels) {
    const compounds = [levels.salicylates, levels.amines, levels.msg, levels.sulphites, levels.nitrates];
    if (compounds.includes("high")) return "red";
    if (compounds.includes("moderate")) return "yellow";
    if (compounds.includes("low")) return "green";
    return "grey";
}

// Function to search by ingredient name in recipes and ingredients
function searchByIngredient() {
    const searchQuery = document.getElementById("search").value.toLowerCase();

    // Check if the search query matches any ingredients in ingredientLevels
    const ingredientsToDisplay = Object.entries(ingredientLevels).filter(
        ([ingredientName]) => ingredientName.toLowerCase().includes(searchQuery)
    ).map(([ingredientName, details]) => ({ name: ingredientName, ...details }));

    if (ingredientsToDisplay.length > 0) {
        displayIngredientCards(ingredientsToDisplay);
        return;
    }

    // If no ingredients match, check for recipes containing the searched ingredient
    const matchingRecipes = recipes.filter(recipe =>
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery))
    );

    displayRecipes(matchingRecipes);
}


// Filter recipes based on compound levels, selected category (recipe or ingredient), search query, and include/exclude ingredients
function filterRecipes() {
    //const searchQuery = document.getElementById("search").value.toLowerCase();
    const lowSalicylates = document.getElementById("lowSalicylates").checked;
    const lowAmines = document.getElementById("lowAmines").checked;

    // Get selected category from radio buttons
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;


    //console.count("ingredientCategories = " + JSON.stringify(ingredientCategories));

    // Check if the selected category is an ingredient category or recipe category
    const isRecipeCategory = ["breakfast", "snack", "lunch", "drink"].includes(selectedCategory);
    const isIngredientCategory = Object.keys(ingredientCategories).includes(selectedCategory);

    if (isIngredientCategory) {
        // Display ingredient cards based on the selected ingredient category
        const ingredientsToDisplay = Object.entries(ingredientLevels).filter(
            ([ingredientName, details]) => details.category === selectedCategory
        ).map(([ingredientName, details]) => ({ name: ingredientName, ...details }));

        displayIngredientCards(ingredientsToDisplay);
        return; // Exit the function as we're displaying ingredients, not recipes
    }

    // If displaying recipes, proceed with recipe filtering logic
    const includeIngredients = Array.from(document.getElementById("includeIngredientsSelect").selectedOptions)
        .map(option => option.value);
    const excludeIngredients = Array.from(document.getElementById("excludeIngredientsSelect").selectedOptions)
        .map(option => option.value);

    const filteredRecipes = recipes.filter(recipe => {

        const categoryMatches = isRecipeCategory ? 
            (!selectedCategory || recipe.category === selectedCategory) :
            true;

        const compoundMatches = recipe.ingredients.every(ingredientName => {
            const levels = ingredientLevelsLowerCase[ingredientName.toLowerCase()] || {};
            return (
                (!lowSalicylates || levels.salicylates === "low") &&
                (!lowAmines || levels.amines === "low")
            );
        });

        const includesIngredients = includeIngredients.every(includeIngredient =>
            recipe.ingredients.some(ingredientName => ingredientName.toLowerCase() === includeIngredient)
        );

        const excludesIngredients = excludeIngredients.every(excludeIngredient =>
            !recipe.ingredients.some(ingredientName => ingredientName.toLowerCase() === excludeIngredient)
        );

        return categoryMatches && compoundMatches && includesIngredients && excludesIngredients;
    });

    displayRecipes(filteredRecipes);
}

function displayIngredientCards(ingredients) {
    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.innerHTML = ""; // Clear the container

    ingredients.forEach(ingredient => {
        const ingredientCard = document.createElement("div");
        ingredientCard.className = "recipe-card";

        const title = document.createElement("h3");
        title.innerText = ingredient.name;
        ingredientCard.appendChild(title);

        const category = document.createElement("p");
        category.className = `recipe-category ${ingredient.category.toLowerCase()}`;
        category.innerText = `Category: ${capitalizeFirstLetter(ingredient.category)}`;
        ingredientCard.appendChild(category);

        const detailsList = document.createElement("ul");
        
        // Add each compound level as a list item
        ["salicylates", "amines", "msg", "sulphites", "nitrates"].forEach(compound => {
            const item = document.createElement("li");
            item.innerText = `${capitalizeFirstLetter(compound)}: ${ingredient[compound] || "N/A"}`;
            item.className = `levelColor${ingredient[compound]}`; // Add color class based on levels
            detailsList.appendChild(item);
        });

        ingredientCard.appendChild(detailsList);
        recipeContainer.appendChild(ingredientCard);
    });
}


// Add a recipe to favorites
function addToFavorites(recipe) {
    // Retrieve the favorites array from localStorage or initialize an empty array
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Check if the recipe is already in favorites by its name
    if (favorites.some(fav => fav.name === recipe.name)) {
        alert(`${recipe.name} is already in favorites.`);
        return;
    }

    // Add the recipe to favorites and store in localStorage
    favorites.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`${recipe.name} has been added to your favorites!`);
}

// Display favorite recipes
// Display favorite recipes with an option to remove each from favorites
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length > 0) {
        const recipeContainer = document.getElementById("recipeContainer");
        recipeContainer.innerHTML = ""; // Clear container

        favorites.forEach(recipe => {
            const recipeCard = document.createElement("div");
            recipeCard.className = "recipe-card";

            const title = document.createElement("h3");
            title.innerText = recipe.name;
            recipeCard.appendChild(title);

            const category = document.createElement("p");
            category.className = `recipe-category ${recipe.category.toLowerCase()}`; // Add category as a class
            category.innerText = `Category: ${capitalizeFirstLetter(recipe.category)}`;
            recipeCard.appendChild(category);

            const ingredientsList = document.createElement("ul");
            recipe.ingredients.forEach(ingredientName => {
                //const levels = ingredientLevels[ingredientName] || {}; // Get levels from ingredientLevels data
                const levels = getIngredientLevels(ingredientName); // Use the new function for lookup
                const item = document.createElement("li");
                item.className = `ingredient ${colorBasedOnLevels(levels)}`;
                item.innerText = ingredientName;
                item.onclick = () => openModal(ingredientName, levels); // Add click event to open modal
                ingredientsList.appendChild(item);
            });
            recipeCard.appendChild(ingredientsList);

            const instructions = document.createElement("p");
            instructions.innerText = recipe.instructions;
            recipeCard.appendChild(instructions);

            // Remove from Favorites Button
            const removeButton = document.createElement("button");
            removeButton.className = "remove-favorite-button";
            removeButton.innerText = "Remove from Favorites";
            removeButton.onclick = () => removeFromFavorites(recipe.name);
            recipeCard.appendChild(removeButton);

            recipeContainer.appendChild(recipeCard);
        });
    } else {
        alert("You have no favorite recipes yet.");
    }
}

// Case-insensitive and partial match lookup function for ingredient levels
function getIngredientLevels(ingredientName) {
    // Try exact match (case-insensitive)
    const exactMatch = ingredientLevelsLowerCase[ingredientName.toLowerCase()];
    if (exactMatch) {
        return exactMatch;
    }

    // If no exact match, try to find a partial match
    const partialMatchKey = Object.keys(ingredientLevelsLowerCase).find(key => ingredientName.toLowerCase().includes(key));
    if (partialMatchKey) {
        return ingredientLevelsLowerCase[partialMatchKey];
    }

    // If no match found, return an empty object
    return {};
}


// Remove a recipe from favorites by name
function removeFromFavorites(recipeName) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    // Filter out the recipe with the specified name
    favorites = favorites.filter(recipe => recipe.name !== recipeName);
    
    // Update the favorites list in localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Refresh the favorites display
    displayFavorites();
}


// Get all unique ingredients from recipes and populate the include/exclude ingredient lists
function populateIngredientOptions() {
    const allIngredients = new Set();

    // Loop through all recipes to collect unique ingredients
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => allIngredients.add(ingredient));
    });

    // Convert the Set to an Array and sort it
    const sortedIngredients = Array.from(allIngredients).sort();

    // Populate Include Ingredients Select
    const includeSelect = document.getElementById("includeIngredientsSelect");
    sortedIngredients.forEach(ingredient => {
        const option = document.createElement("option");
        option.value = ingredient.toLowerCase();
        option.text = ingredient;
        includeSelect.appendChild(option);
    });

    // Populate Exclude Ingredients Select
    const excludeSelect = document.getElementById("excludeIngredientsSelect");
    sortedIngredients.forEach(ingredient => {
        const option = document.createElement("option");
        option.value = ingredient.toLowerCase();
        option.text = ingredient;
        excludeSelect.appendChild(option);
    });
}

// Run populateIngredientOptions when the page loads
document.addEventListener("DOMContentLoaded", populateIngredientOptions);

// Toggle filters section visibility
function toggleFilters() {
    const filtersContent = document.getElementById("filters");
    const filterIcon = document.getElementById("filter-icon");

    // Toggle the display of the filters section
    if (filtersContent.style.display === "none" || filtersContent.style.display === "") {
        filtersContent.style.display = "block";
        filterIcon.innerHTML = "&#11206;"; // Change to collapse icon
    } else {
        filtersContent.style.display = "none";
        filterIcon.innerHTML = "&#11208;"; // Change to expand icon
    }
}

// Initialize filters section to be hidden on page load
// Call filterRecipes() when the page loads to display results for the checked category option

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("filters").style.display = "none"; // Hide filters by default
    document.getElementById("filter-icon").innerHTML = "&#11208;"; // Set initial icon to expand

    filterRecipes();
});

setTimeout(() => {
    $(".printBtnDivCls").hide();
    $(".curvedBox").hide();
    $(".printBtnDivCls").hide();
    $(".commentMsg").hide();
    $("#tutorialListDivId").hide();
    $("#tutorialEditDivId").hide();
}, 100);