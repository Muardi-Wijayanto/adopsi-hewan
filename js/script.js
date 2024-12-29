// toggel class active
const navbarNav = document.querySelector(".navbar-nav");

// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
    navbarNav.classList.toggle("active");
};

// toggel class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

// klik diluar element
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector('#search-button');

document.addEventListener("click", function (e) {
    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove("active");
    }
    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove("active");
    }
});

// navbar scroll
// Tangkap elemen navbar
const navbar = document.querySelector('.navbar');

// Tambahkan event listener untuk scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Jika scroll lebih dari 50px
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});


// about section
document.getElementById('allBtn').addEventListener('click', function() {
    filterAnimals('all');
});

document.getElementById('dogBtn').addEventListener('click', function() {
    filterAnimals('dog');
});

document.getElementById('catBtn').addEventListener('click', function() {
    filterAnimals('cat');
});

function filterAnimals(type) {
    const items = document.querySelectorAll('.grid-item');
    items.forEach(item => {
        if (type === 'all') {
            item.style.display = 'block';
        } else if (item.getAttribute('data-type') === type) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    const buttons = document.querySelectorAll('.cta');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(type + 'Btn').classList.add('active');
}

const modal = document.getElementById("adoptModal");
const span = document.getElementsByClassName("close")[0];
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

document.querySelectorAll('.overlay button').forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.stopPropagation();
        const gridItem = btn.closest('.grid-item');
        const petImage = gridItem.getAttribute('data-image') || gridItem.querySelector('img').src;
        document.getElementById("modalImage").src = petImage;
        modal.style.display = "block";
    });
});


span.onclick = function() {
    modal.style.display = "none";
}

yesBtn.onclick = function() {
    alert("Successfully adopted this pet!");
    modal.style.display = "none";
}

noBtn.onclick = function() {
    alert("Returning to the adoption menu.");
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function showAlert(modalId, message, imageUrl) {
    const modal = document.getElementById(modalId);
    const messageElement = modal.querySelector('p');
    const imageElement = modal.querySelector('img');

    // Update pesan dan gambar
    messageElement.textContent = message;
    imageElement.src = imageUrl;

    // Tampilkan modal
    modal.style.display = "block";

    // Tambahkan event untuk menutup modal
    modal.querySelector('.close-alert').onclick = function() {
        modal.style.display = "none";
    };
    modal.querySelector('button').onclick = function() {
        modal.style.display = "none";
    };
}

// Tambahkan event ke tombol Yes dan No
yesBtn.onclick = function() {
    modal.style.display = "none"; // Tutup modal utama
    showAlert("successAlert", "Successfully adopted this pet!", "/images/thumbs-up-cat.gif");
};

// Membuat event untuk tombol No
// Ketika tombol No di klik, maka akan menutup modal utama
// dan menampilkan modal noAlert dengan pesan "Returning to the adoption menu."
// dan gambar "/src/sad cats.jpg"
noBtn.onclick = function() {
    modal.style.display = "none"; // Tutup modal utama
    showAlert("noAlert", "Returning to the adoption menu.", "/images/sad cats.jpg");
};



// accordion
// document.querySelectorAll('.accordion input[type="radio"]').forEach(radio => {
//     radio.addEventListener('click', function(event) {
//         const content = event.target.parentElement.nextElementSibling;
//         if (event.target.checked) {
//             content.classList.add('active');
//         } else {
//             content.classList.remove('active');
//         }
//     });
// });


// untuk donate
function convertToCustomInput(selectElement) {
    if (selectElement.value === 'custom') {
        // Buat elemen input baru
        const customInput = document.createElement('input');
        customInput.type = 'text';
        customInput.id = 'amount';
        customInput.name = 'amount';
        customInput.placeholder = 'Enter custom amount';
        customInput.style.marginTop = '10px';
        customInput.style.textAlign = 'left'; // Ubah isi jadi di kiri
        customInput.style.paddingLeft = '10px'; // Ubah padding ke kiri

        // Tambahkan event untuk menambahkan simbol dolar
        customInput.addEventListener('input', (e) => {
            const value = e.target.value.replace(/[^0-9]/g, ''); // Hanya angka
            if (value) {
                e.target.value = `${value} $`;
            } else {
                e.target.value = '';
            }
        });

        // Tambahkan event untuk menghapus simbol dolar
        customInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value.endsWith(' $')) {
                e.target.value = e.target.value.slice(0, -2);
            }
        });

        // Ganti dropdown dengan input angka
        selectElement.replaceWith(customInput);
    }
}

// Gallery Interaction Script
document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');

    // Create navigation buttons
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');

    prevButton.innerText = '<';
    nextButton.innerText = '>';

    prevButton.className = 'gallery-nav prev';
    nextButton.className = 'gallery-nav next';

    galleryGrid.parentElement.appendChild(prevButton);
    galleryGrid.parentElement.appendChild(nextButton);

    // Scroll functionality
    prevButton.addEventListener('click', () => {
        galleryGrid.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        galleryGrid.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Optional: Hide buttons if no scroll is possible
    const updateNavVisibility = () => {
        prevButton.style.display = galleryGrid.scrollLeft > 0 ? 'block' : 'none';
        nextButton.style.display = galleryGrid.scrollLeft < galleryGrid.scrollWidth - galleryGrid.clientWidth ? 'block' : 'none';
    };

    galleryGrid.addEventListener('scroll', updateNavVisibility);
    updateNavVisibility();
});



// untuk FAQ
document.addEventListener("DOMContentLoaded", function () {
    const accordionItems = document.querySelectorAll(".accordion li");

    accordionItems.forEach((item) => {
        item.addEventListener("click", function () {
            // Toggle active class on clicked item
            item.classList.toggle("active");

            // Close other items
            accordionItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains("active")) {
                    otherItem.classList.remove("active");
                }
            });
        });
    });
});



// Menggunakan JavaScript untuk membuat carousel
