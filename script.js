const bookList = document.getElementById("book-list")

function showBooks() {
    bookList.innerHTML = "";

    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const card = document.createElement("div")
        card.className = "book-card";

        let commentsHtml = "";
        for (let j = 0; j < book.comments.length; j++) {

            const comment = book.comments[j];
            commentsHtml += "<li>[" + comment.user + "]: " + comment.text + "</li>";
        }

        card.innerHTML =

            "<h2>" + book.title + "</h2>" +
            "<div class='book-top'>" +
            "<p class='price'>" + book.price.toFixed(2) + " €</p>" +
            "<button class='like-button'> <span class='like-count'>" + book.likes + "</span></button>" +
            "</div>" +
            "<p>Author: " + book.author + "</p>" +
            "<p>Erscheinungsjahr: " + book.year + "</p>" +
            "<p>Genre: " + book.genre + "</p>" +
            "<h3>Kommentare:</h3>" +
            "<ul class='comment-list'>" + commentsHtml + "</ul>" +
            "<input type='text' class='comment-input' placeholder='Schreib einen Kommentar ...'>" +
            "<button class='comment-button'>Senden</button>";

        bookList.appendChild(card);
        card.dataset.index = i;

        const likeButton = card.querySelector(".like-button");
        likeButton.addEventListener("click", function () {

            const clickedCard = this.closest(".book-card");
            const clickedBook = books[clickedCard.dataset.index];

            clickedBook.likes = clickedBook.likes + 1;
            this.querySelector(".like-count").textContent = clickedBook.likes;
        });

        const commentButton = card.querySelector(".comment-button");
        commentButton.addEventListener("click", function () {

            const clickedCard = this.closest(".book-card");
            const clickedBook = books[clickedCard.dataset.index];
            const input = clickedCard.querySelector(".comment-input");
            const text = input.value.trim();

            if (text == "") {
                return;
            }

            clickedBook.comments.push({ user: "Du", text: text });

            const list = clickedCard.querySelector(".comment-list");
            const newComment = document.createElement("li");
            newComment.innerHTML = "[Du]" + text;
            list.appendChild(newComment);

            input.value = "";
        });
    }
}

showBooks();