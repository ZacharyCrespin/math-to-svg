// Get document elements
const input = document.getElementById("input")
const button = document.getElementById("button")
const outputDiv = document.getElementById("output")
const downloadBtn = document.getElementById("download")

let svgContent
let lastInput = ""

function convert() {
  const math = input.value
  if (math != "" && math != lastInput) {
    lastInput = math
    // Encode the math to a URI string
    const encodedMath = encodeURIComponent(math)
    fetch(`/api?math=${encodedMath}`)
    .then((res) => res.text())
    .then((res) => {
      svgContent = res
      // Parse the SVG text into a DOM element
      const parser = new DOMParser();
      const svgElement = parser.parseFromString(res, 'image/svg+xml').documentElement;

      // Make sure the output div is empty
      outputDiv.innerHTML = ""
      // Display the SVG
      outputDiv.appendChild(svgElement)
      outputDiv.hidden = false
      downloadBtn.hidden = false
      button.disabled = false
    })
  } else {
    button.disabled = false
  }
}
button.addEventListener("click", () => {
  button.disabled = true
  convert()
})

function download() {
  // Create a Blob object from the SVG content
  const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });

  // Generate a URL for the Blob
  const svgUrl = URL.createObjectURL(svgBlob);

  // Create an anchor element for the download
  const downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = 'image.svg';
  downloadLink.style.display = 'none';

  // Append the anchor element to the document
  document.body.appendChild(downloadLink);

  // Trigger the download
  downloadLink.click();

  // Clean up the URL object
  URL.revokeObjectURL(svgUrl);
}
downloadBtn.addEventListener('click', download);
