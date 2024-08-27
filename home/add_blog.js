import {
  db,
  collection,
  addDoc,
  storage,
  getDocs,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../firebase.js";

const addBlogButton = document.getElementById("addBlog");
const modal = document.getElementById("addBlogModal");
const closeModal = document.querySelector(".modal .close");
const container = document.getElementsByClassName("container thumbs")[0];
const loader = document.getElementById("loader");
// Data elements
const blogTitle = document.getElementById("blogTitle");
const blogContent = document.getElementById("blogContent");
const blogImage = document.getElementById("blogImage");
const submit = document.getElementById("submit");

// Show modal when Add Blog button is clicked
addBlogButton.addEventListener("click", function () {

  loader.style.display = "none";
  modal.style.display = "block";
});

// Close modal when 'X' is clicked
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

// Close modal when clicking outside of the modal content
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Add blog post to Firestore
const addBlog = async (imageURL) => {
  loader.style.display = "block";
  if (blogTitle.value !== "" && blogContent.value !== "" && imageURL) {
    try {
      
      await addDoc(collection(db, "Blogs"), {
        title: blogTitle.value,
        content: blogContent.value,
        image: imageURL,
      });
      Toastify({
        text: "Blog added successfully!",
        duration: 3000,
      }).showToast();
    } catch (error) {
      loader.style.display = "none";

      Toastify({
        text: `Error Occurred: ${error.message}`,
        duration: 3000,
      }).showToast();
    } finally {
      loader.style.display = "none";
      blogTitle.value = ''
      blogContent.value = ''
      blogImage.value = ''
      modal.style.display = "none";
      getBlogs();
    }
  } else {
    Toastify({
      text: "Please fill in all fields and upload an image.",
      duration: 3000,
    }).showToast();
  }
};

// Upload image and get its URL
const uploadImage = () => {
  const file = blogImage.files[0];
  if (!file) {
    Toastify({
      text: "Please select an image to upload.",
      duration: 3000,
    }).showToast();
    return;
  }

  const imagesRefWithFolder = ref(storage, `products/${file.name}`);
  const uploadTask = uploadBytesResumable(imagesRefWithFolder, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      Toastify({
        text: `Upload Error: ${error.message}`,
        duration: 3000,
      }).showToast();
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          console.log("File available at", downloadURL);
          loader.style.display = "block";
          addBlog(downloadURL); // Call addBlog with the download URL of the uploaded image
        })
        .catch((error) => {
          Toastify({
            text: `Error getting download URL: ${error.message}`,
            duration: 3000,
          }).showToast();
        });
    }
  );
};

// Handle form submission
submit.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default form submission

  uploadImage();
});

// Fetch and display blogs from Firestore
const getBlogs = async () => {
  try {
    const snapshot = await getDocs(collection(db, "Blogs"));
    if (!snapshot.empty) {
      container.innerHTML = "";
      snapshot.forEach((blog) => {
        const { title, content, image } = blog.data();
        container.innerHTML += `
          <div class="col-sm-6 col-md-4">
            <div class="thumbnail">
              <img src="${image}" alt="" class="img-responsive" />
              <div class="caption">
                <h3>${title}</h3>
                <p>${content}</p>
                <div class="btn-toolbar text-center">
                  <a href="#" role="button" class="btn btn-primary pull-right">Details</a>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    }
  } catch (error) {
    Toastify({
      text: `Error fetching blogs: ${error.message}`,
      duration: 3000,
    }).showToast();
  }
};

// Initial fetch of blogs
getBlogs();
