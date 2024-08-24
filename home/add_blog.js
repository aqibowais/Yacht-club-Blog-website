
    const addBlogButton = document.getElementById('addBlog');
    const modal = document.getElementById('addBlogModal');
    const closeModal = document.querySelector('.modal .close');
  
    // Show modal when Add Blog button is clicked
    addBlogButton.addEventListener('click', function () {
      modal.style.display = 'block';
    });
  
    // Close modal when 'X' is clicked
    closeModal.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  
    // Close modal when clicking outside of the modal content
    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

  