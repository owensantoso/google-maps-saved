const fs = require('fs');

// Load the JSON data
const data = JSON.parse(fs.readFileSync('places.json', 'utf8'));
const places = data.places;

// Define the tags you want to search for
const queryTags = ['want to go', 'korean'];

// Filter places that have every tag in queryTags
const results = places.filter(place =>
  queryTags.every(tag => place.tags.includes(tag))
);

console.log(results);