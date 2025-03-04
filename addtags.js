const fs = require('fs');
const path = require('path');

// Define the path to the places.json file (assumed in the same folder)
const filePath = path.join(__dirname, 'places.json');

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  
  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    
    // Use a Set to collect unique tags
    const uniqueTags = new Set();
    
    // Iterate over all places and add their tags to the Set
    jsonData.places.forEach(place => {
      if (Array.isArray(place.tags)) {
        place.tags.forEach(tag => uniqueTags.add(tag));
      }
    });
    
    // Convert the Set to an array and add it as a new property
    jsonData.tags = Array.from(uniqueTags);
    
    // Write the updated JSON back to the file (formatted for readability)
    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', err => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Successfully updated places.json with unique tags.');
      }
    });
    
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});