// Select all container elements by their combined classes
const containers = document.querySelectorAll('.RcCsl.rJl64b.MOlO1d.AG25L');
const results = [];

// Loop through each container
containers.forEach(container => {
  // Find the img element with class "Liguzb"
  const img = container.querySelector('img.Liguzb');
  // Find the div containing the name with the given class
  const nameDiv = container.querySelector('div.Io6YTe.fontBodyLarge.kR99db.fdkmkc');
  
  // Only if both elements exist, add to results
  if (img && nameDiv) {
    results.push({
      name: nameDiv.textContent.trim(),
      svgUrl: img.src
    });
  }
});

// Output the results in the console
console.log(results);