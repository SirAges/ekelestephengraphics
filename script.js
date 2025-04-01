// Function to load the JSON data and display it
window.onload = async () => {
  // Fetch the content.json file
  const response = await fetch("content.json");
  const contentData = await response.json();

  // Get the gallery container
  const gallery = document.getElementById("gallery");

  // Loop through the JSON data and create HTML elements for each item
  contentData.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    const title = document.createElement("h2");
    title.innerText = item.title;

    const description = document.createElement("p");
    description.innerText = item.description;

    let mediaElement;

    if (item.type === "image") {
      mediaElement = document.createElement("img");
      mediaElement.src = `images/${item.media}`;
      mediaElement.alt = item.title;
      mediaElement.classList.add("clickable");
      mediaElement.addEventListener("click", () => openModal(item)); // Event listener to open modal
    } else if (item.type === "video") {
      mediaElement = document.createElement("video");
      mediaElement.controls = true;
      const source = document.createElement("source");
      source.src = `videos/${item.media}`;
      mediaElement.appendChild(source);
      mediaElement.classList.add("clickable");
      mediaElement.addEventListener("click", () => openModal(item)); // Event listener to open modal
    }

    // Append title, description, and media to the itemDiv
    itemDiv.appendChild(title);
    itemDiv.appendChild(description);
    itemDiv.appendChild(mediaElement);

    // Append the itemDiv to the gallery
    gallery.appendChild(itemDiv);
  });
};

// Modal functionality
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalCaption = document.getElementById("modal-caption");
const modalVideo = document.getElementById("modal-video");

// Function to open the modal with the selected media
function openModal(item) {
  modal.style.display = "block";
  if (item.type === "image") {
    modalImage.style.display = "block";
    modalVideo.style.display = "none";
    modalImage.src = `images/${item.media}`;
    modalCaption.textContent = `${item.title}: ${item.description}`;
  } else if (item.type === "video") {
    modalImage.style.display = "none";
    modalVideo.style.display = "block";
    modalVideo.src = `videos/${item.media}`;
    modalCaption.textContent = `${item.title}: ${item.description}`;
  }
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
  modalImage.src = ""; // Clear the image source
  modalVideo.src = ""; // Clear the video source
}

// Event listener for closing modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
