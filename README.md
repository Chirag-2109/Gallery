# Gallery
# Image Gallery with Duplicate Detection

A browser-based image gallery built using HTML, CSS, and JavaScript. The application allows users to upload multiple images, detect duplicate images using SHA-256 hashing, and store images persistently using IndexedDB.

## Features

- Upload multiple images at once.
- Display uploaded images in a gallery.
- Detect duplicate images using SHA-256 hashing.
- Prevent duplicate images even when their filenames are changed.
- Store images persistently using IndexedDB.
- Restore images automatically after refreshing the page.
- Access stored images from another tab of the same browser and website.
- Display images with fixed dimensions and consistent styling.

## Technologies Used

- **HTML5** – Structure of the web page.
- **CSS3** – Image styling and layout.
- **JavaScript (ES6+)** – Application logic and event handling.
- **Web Crypto API** – Generate SHA-256 hashes for duplicate detection.
- **IndexedDB** – Store images and their hashes in the browser.

## How It Works

### 1. Image Upload

Users can select and upload multiple images using the file input.

### 2. Duplicate Detection

The application reads the binary content of each image and generates a SHA-256 hash.

The generated hash is used to identify whether the same image has already been uploaded.

Changing the filename does not affect the hash because the hash is generated from the image content.

### 3. Image Storage

Images are stored in the browser's IndexedDB database along with their unique hashes.

The database stores the following information:

- Image hash
- Image Blob

### 4. Image Restoration

When the page loads, the application retrieves the saved images from IndexedDB and displays them in the gallery.

## Project Structure

```text
Image-Gallery/
│
├── index.html
├── script.js
└── README.md
```

## How to Run the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   ```

2. Open the project folder.

3. Open `index.html` in a browser.

4. Select one or more images using the file input.

5. Upload images and test duplicate detection.

## Duplicate Detection Example

Suppose you upload an image named:

```text
photo1.jpg
```

If you rename the same image to:

```text
photo2.jpg
```

The application still identifies it as a duplicate because the hash is generated from the image's binary content rather than its filename.

## Browser Storage

This project uses IndexedDB to store images locally in the browser.

### Supported Behavior

- Images remain available after refreshing the page.
- Images can be accessed from another tab using the same browser and website origin.
- Images are stored locally rather than uploaded to a server.

### Limitations

- Images are stored only in the current browser's storage.
- Images are not automatically available on other devices or browsers.
- Clearing browser site data can remove the stored images.
- The application does not currently use cloud storage or a backend server.

## Future Improvements

- Add image deletion functionality.
- Add image search and filtering.
- Display image names and metadata.
- Add drag-and-drop image uploads.
- Add a responsive gallery layout.
- Add image download functionality.
- Add cloud storage for cross-device access.

## Learning Outcomes

This project helped me practice:

- DOM manipulation.
- Event listeners.
- File handling in JavaScript.
- Asynchronous programming using `async` and `await`.
- SHA-256 hashing using the Web Crypto API.
- JavaScript `Set` for duplicate tracking.
- IndexedDB for persistent browser storage.
- Working with image Blobs and object URLs.

## License

This project is created for learning and educational purposes.
```
