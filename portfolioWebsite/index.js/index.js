 // Fetch existing reviews from the server
    function fetchReviews() {
      axios.get('http://localhost:5000/api/reviews')
        .then(response => {
          const reviews = response.data;
          const reviewsContainer = document.getElementById('reviews-container');
          reviewsContainer.innerHTML = ''; // Clear the container

          // Populate the container with fetched reviews
          reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
              <h3>${review.name}</h3>
              <p>${review.review}</p>
            `;
            reviewsContainer.appendChild(reviewElement);
          });
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
        });
    }

    // Handle form submission to add a new review
    document.getElementById('review-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from submitting normally
      const name = document.getElementById('name').value;
      const review = document.getElementById('review').value;

      // Send the new review to the server
      axios.post('http://localhost:5000/api/reviews', { name, review })
        .then(response => {
          fetchReviews(); // Refresh the list of reviews
          document.getElementById('name').value = ''; // Clear the form
          document.getElementById('review').value = '';
        })
        .catch(error => {
          console.error('Error submitting review:', error);
        });
    });

    // Initial fetch of reviews when the page loads
    fetchReviews();