import {
  db,
  doc,
  getDoc,
  getDocs,
  addDoc,
  collection,
  getFirestore,
} from "../firebase.js";

const addBlogButton = document.getElementById("addBlog");
const modal = document.getElementById("addBlogModal");
const closeModal = document.querySelector(".modal .close");
const loader = document.getElementById('loader')
const container = document.getElementsByClassName('container thumbs')[0]
//data
const blogTitle = document.getElementById("blogTitle");
const blogContent = document.getElementById("blogContent");
const blogImage = document.getElementById("blogImage");
const submit = document.getElementById("submit");

// Show modal when Add Blog button is clicked
addBlogButton.addEventListener("click", function () {
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

//add blog func
const addBlog = async () => {
  if(blogTitle.value != '' && blogContent.value != ''){
    try {
      loader.style.display = 'block'
      await addDoc(collection(db, "Blogs"), {
        title: blogTitle.value,
        content: blogContent.value,
      });
    } catch (error) {
      Toastify({
        text: `Error Occurred: ${error.message}`,
        duration: 3000,
      }).showToast();
    }finally{
      loader.style.display = 'none'
      modal.style.display = "none";
      getBlogs()
  
    }
  }
  
};

const getBlogs = async ()=>{
  const snapshot = await getDocs(collection(db,'Blogs'));
  if(!snapshot.empty){
    snapshot.forEach(blog => {
      const {title,content} = blog.data()
      console.log(container)
    container.innerHTML +=  `
      <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <img src="../img/pic1.jpg" alt="" class="img-responsive" />
          <div class="caption">
            <h3 class="">${title}</h3>
            <p>
              ${content}
            </p>
            <div class="btn-toolbar text-center">
              <a href="#" role="button" class="btn btn-primary pull-right"
                >Details</a
              >
            </div>
          </div>
        </div>
      `
    });
  } 
}
getBlogs()

submit.addEventListener("click", addBlog);
