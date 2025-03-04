const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const folderPath = './'; // Folder containing CSV files
let placesMap = {}; // Use an object with URL as key to avoid duplicates

// Helper function to process a CSV file
function processCSV(filePath, tag) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const { Title, Note, URL, Comment } = row;
        if (!placesMap[URL]) {
          // Create a new place entry
          placesMap[URL] = {
            Title,
            Note,
            URL,
            Comment,
            tags: [tag]
          };
        } else {
          // Add the tag if not already present
          if (!placesMap[URL].tags.includes(tag)) {
            placesMap[URL].tags.push(tag);
          }
        }
      })
      .on('end', () => resolve())
      .on('error', (err) => reject(err));
  });
}

// Process all CSV files in the folder
async function processAllCSVs() {
  const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.csv'));
  
  for (const file of files) {
    const tag = path.basename(file, '.csv'); // Use filename as tag
    const filePath = path.join(folderPath, file);
    await processCSV(filePath, tag);
  }
  
  // Convert the map to an array
  const places = Object.values(placesMap);
  
  // Write the result to a JSON file
  fs.writeFileSync('places.json', JSON.stringify({ places }, null, 2));
  console.log('Data has been written to places.json');
}

processAllCSVs().catch(err => console.error('Error processing CSV files:', err));