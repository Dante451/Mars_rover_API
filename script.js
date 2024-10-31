// API key: Np68H2WqgJoMhGFi9OE4EoIetEj7XSrSV7nrd9fO
// API key: 999aRBvW6cgN2bCZhdamyfJ8bhibFqdidzl45YUq

const SIGNIFICANT_DATE = '2012-08-06';

// Load initial photos on page load
function loadInitialPhotos() {
    const apiKey = '999aRBvW6cgN2bCZhdamyfJ8bhibFqdidzl45YUq';
    const roverName = 'Curiosity';
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${SIGNIFICANT_DATE}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display the photos and description if they exist
            if (data.photos && data.photos.length > 0) {
                const description = 'Photos from the Curiosity landing on Mars.';
                displayPhotos(data.photos, description);
            } else {
                document.getElementById('photos').innerHTML = '<p>No photos available for this date.</p>';
            }
        })
        .catch(error => {
            document.getElementById('photos').innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
}

// Function to display photos and description
function displayPhotos(photos, description) {
    const photosContainer = document.getElementById('photos');
    photosContainer.innerHTML = ''; 

    // Create and append a description element
    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = description;
    photosContainer.appendChild(descriptionElement);

    const uniqueImages = new Set(); 
    let count = 0; 

    // Loop through the photos to display them
    for (const photo of photos) {
        // Check if the image is unique and if we haven't reached the limit
        if (!uniqueImages.has(photo.img_src) && count < 3) {
            uniqueImages.add(photo.img_src); 

            // Create and append the image element
            const img = document.createElement('img');
            img.src = photo.img_src;
            img.alt = `Photo taken by ${photo.rover.name} on ${photo.earth_date}`;

            // Create and append the caption element
            const caption = document.createElement('p');
            caption.innerText = `Rover: ${photo.rover.name} | Taken on: ${photo.earth_date}`;

            photosContainer.appendChild(img); 
            photosContainer.appendChild(caption); 

            count++;
        }

        if (count >= 3) {
            break;
        }
    }

    if (uniqueImages.size === 0) {
        photosContainer.innerHTML += '<p>No unique photos available for this date.</p>';
    }
}

// Add event listener for the button to show photos
document.getElementById('showPicturesBtn').addEventListener('click', () => {
    const day = document.getElementById('daySelect').value.padStart(2, '0');
    const month = document.getElementById('monthSelect').value.padStart(2, '0');
    const year = document.getElementById('yearSelect').value;

    if (!day || !month || !year) {
        alert('Please select a valid date.');
        return;
    }

    const selectedDate = `${year}-${month}-${day}`;
    const photosContainer = document.getElementById('photos');
    photosContainer.innerHTML = ''; 

    const apiKey = '999aRBvW6cgN2bCZhdamyfJ8bhibFqdidzl45YUq';
    const roverName = 'Curiosity';
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${selectedDate}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.photos && data.photos.length > 0) {
                displayPhotos(data.photos, 'Photos from the Curiosity Rover Mars Expedition.');
            } else {
                photosContainer.innerHTML = '<p>No photos available for this date.</p>';
            }
        })
        .catch(error => {
            photosContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
});

// Call the function to load initial photos when the page loads
window.onload = loadInitialPhotos;
