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
    } else if (item.type === "video") {
      mediaElement = document.createElement("video");
      mediaElement.controls = true;
      const source = document.createElement("source");
      source.src = `videos/${item.media}`;
      mediaElement.appendChild(source);
    }

    // Append title, description, and media to the itemDiv
    itemDiv.appendChild(title);
    itemDiv.appendChild(description);
    itemDiv.appendChild(mediaElement);

    // Append the itemDiv to the gallery
    gallery.appendChild(itemDiv);
  });
};
