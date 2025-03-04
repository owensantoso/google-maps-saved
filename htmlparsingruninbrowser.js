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
      svgUrl: img.src,
      name: nameDiv.textContent.trim()
    });
  }
});

// Convert results to JSON string
const jsonStr = JSON.stringify(results, null, 2);

// Create a blob and generate a URL for it
const blob = new Blob([jsonStr], { type: "application/json" });
const url = URL.createObjectURL(blob);

// Create a temporary link element, set its href to the blob URL and trigger a download
const a = document.createElement("a");
a.href = url;
a.download = "results.json";
document.body.appendChild(a);
a.click();

// Clean up: remove the temporary link and revoke the URL
document.body.removeChild(a);
URL.revokeObjectURL(url);

//run in browser console in google maps saved lists to create json of saved list name and svg urls
// eg
// https://www.google.com/maps/@35.8074136,139.6912162,15z/data=!4m2!10m1!1e1?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D