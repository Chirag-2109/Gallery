
let root = document.getElementById('root')
let file = document.getElementById('file')

let div = document.createElement('div')
div.id = "container"
root.appendChild(div)

let imageHashes = new Set()

let db

// -----------------------------
// OPEN INDEXEDDB DATABASE
// ----------------------------

let dbRequest = indexedDB.open("ImageGallery", 1)

dbRequest.onupgradeneeded = (event) => {

    let database = event.target.result

    if (!database.objectStoreNames.contains("images")) {

        database.createObjectStore("images", {
            keyPath: "hash"
        })

    }
}

dbRequest.onsuccess = (event) => {

    db = event.target.result

    console.log("Database connected successfully")

    loadImages()

}

dbRequest.onerror = () => {

    console.log("Database connection failed")

}


// -----------------------------
// GENERATE IMAGE HASH
// -----------------------------

async function generateHash(element) {

    let buffer = await element.arrayBuffer()

    let hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        buffer
    )

    let hashArray = Array.from(
        new Uint8Array(hashBuffer)
    )

    let hash = hashArray
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')

    return hash

}


// -----------------------------
// DISPLAY IMAGE
// -----------------------------

function displayImage(element) {

    let bg = document.createElement('img')

    bg.src = URL.createObjectURL(element)

    bg.style.height = "200px"
    bg.style.width = "200px"
    bg.style.objectFit = "cover"

    div.append(bg)

}


// -----------------------------
// LOAD SAVED IMAGES
// -----------------------------

function loadImages() {

    let transaction = db.transaction(
        "images",
        "readonly"
    )

    let store = transaction.objectStore("images")

    let request = store.getAll()

    request.onsuccess = () => {

        let images = request.result

        images.forEach(element => {

            imageHashes.add(element.hash)

            displayImage(element.blob)

        })

    }

}


// -----------------------------
// UPLOAD IMAGES
// -----------------------------

file.addEventListener('change', async () => {

    if (!db) {

        alert("Database is not ready. Please try again.")

        return

    }

    let files = Array.from(file.files)

    for (let element of files) {

        let hash = await generateHash(element)

        // Check if image already exists
        if (imageHashes.has(hash)) {

            alert("This image is already uploaded!")

            continue

        }

        // Add hash to Set
        imageHashes.add(hash)

        // Save image to IndexedDB
        let transaction = db.transaction(
            "images",
            "readwrite"
        )

        let store = transaction.objectStore("images")

        store.put({

            hash: hash,
            blob: element

        })

        // Display image on the page
        displayImage(element)

    }

    // Reset input so the same file can be selected again
    file.value = ""

})