document.addEventListener("DOMContentLoaded", () => {
    // Hide the page content temporarily
    document.body.style.opacity = 0;

    // Load the header
    fetch("header.html")
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to load header:", response.statusText);
          throw new Error("Header not found");
        }
        return response.text();
      })
      .then((headerContent) => {
        document.body.insertAdjacentHTML("afterbegin", headerContent);
      })
      .catch((error) => console.error(error));

    // Load the footer
    fetch("footer.html")
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to load footer:", response.statusText);
          throw new Error("Footer not found");
        }
        return response.text();
      })
      .then((footerContent) => {
        document.body.insertAdjacentHTML("beforeend", footerContent);

        // Fade-in the content after both header and footer are loaded
        document.body.style.opacity = 1;
      })
      .catch((error) => console.error(error));
});
