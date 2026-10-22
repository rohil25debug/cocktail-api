import express from "express"; //its make our web server
import axios from "axios"; //http or api

const app = express();
const port = 3000;

app.set("view engine", "ejs"); // In this we can use EJS to create html pages
 
app.use(express.static("public"));//express.static used to serve static files 
 
app.get("/", (req, res) => {
  res.render("index.ejs", {
    cocktail: null,
    error: null
  });
});
 
app.get("/random-cocktail", async (req, res) => {
  try {
     
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );

    
     const cocktail = response.data.drinks?.[0];  //The ? is optional chaining which is safely trying to access [0] before drinks .

     if (!cocktail) {
      throw new Error("No cocktail was found.");
    }

     res.render("index.ejs", {
      cocktail: cocktail,
      error: null
    });
  } catch (error) {               // It is used for handling errors.
     console.error("API request failed:", error.message);

     res.status(500).render("index.ejs", {
      cocktail: null,
      error: "Sorry, we could not fetch a cocktail. Please try again."
    });
  }
});

 app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});