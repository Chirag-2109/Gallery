let root=document.getElementById('root')
let file=document.getElementById('file')
let div=document.createElement('div')
div.id="container"
root.appendChild(div)

let imageHashes = new Set()

async function generateHash(element) {
    let buffer = await element.arrayBuffer()

    let hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        buffer
    )

    let hashArray = Array.from(new Uint8Array(hashBuffer))

    let hash = hashArray
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')

    return hash
}


file.addEventListener('change', async (event) => {

    let files = Array.from(file.files)
    console.log(files)

    for (let element of files) {

        let hash = await generateHash(element)

        if (imageHashes.has(hash)) {
            alert("This image is already uploaded!")
            continue
        }

        imageHashes.add(hash)

        let bg = document.createElement('img')

        bg.src = URL.createObjectURL(element)

        bg.style.height = "200px"
        bg.style.width = "200px"
        bg.style.objectFit = "cover"

        div.append(bg)
    }

    file.value = ""
})





// file.addEventListener('change',(event)=>{
    
//     let files = Array.from(file.files)
//     console.log(files)
//     // console.log(img.name)
//     files.forEach(element=>{
//         let bg=document.createElement('img')
//         bg.src=element.name
//         bg.style.height="200px"
//         bg.style.width="200px"
//         bg.style.objectFit="cover"
//         div.append(bg)
//     })


        
    


    
// })



///1)alert function when 

// allow only image file to be selected
// max 10 files allowed once
// same image cannot be uploaded again
// on page reload images should be present not empty page again
// image name can be changed name or directory can be changed but our system shouldn't allow same image to be uploaded again

// only javascript no backend only frontend