const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");

async function updateReadmeQuote() {
  const readmePath = path.join(__dirname, "README.md");
  const archivePath = path.join(__dirname, "quotes-archive.txt");
  try {
    const response = await axios.get(
      "https://random-quotes-freeapi.vercel.app/api/random"
    );
    const quote = `"${response.data.quote}" — ${response.data.author}`;
    const date = new Date().toISOString().split("T")[0];
    const readmeContent = `# My Daily Inspiration\n\n**Today's Quote**  \n> ${quote}  \n*Updated on ${date}*\n\nSee past quotes in [quotes-archive.txt](quotes-archive.txt).`;
    await fs.writeFile(readmePath, readmeContent);
    await fs.appendFile(archivePath, `${date}: ${quote}\n`);
    console.log("Quote updated successfully");
  } catch (error) {
    console.error("Error updating quote:", error);
    process.exit(1);
  }
}

updateReadmeQuote();
