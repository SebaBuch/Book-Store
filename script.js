const bookList = document.getElementById("book-list")

function showBooks() {
    bookList.innerHTML = "";

    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        const card = createBookCard(book, i);

        bookList.appendChild(card);
        addCardEventListeners(card);
    }
}

function createBookCard(book, index) {
    const card = document.createElement("div");
    card.className = "book-card";
    card.dataset.index = index;
    card.innerHTML = createBookContent(book);

    return card;
}

function createBookContent(book) {
    const commentsList = createCommentsList(book.comments);

    return "<h2>" + book.title + "</h2>" +
        "<img class='book-cover' src='" + book.image + "' alt='Cover von " + book.title + "'>" +
        "<div class='book-top'>" +
        "<p class='price'>" + book.price.toFixed(2) + " €</p>" +
        "<button class='like-button'><span class='like-count'>" + book.likes + "</span></button>" +
        "</div>" +
        "<p><strong>Author:</strong> " + book.author + "</p>" +
        "<p><strong>Erscheinungsjahr:</strong> " + book.year + "</p>" +
        "<p><strong>Genre:</strong> " + book.genre + "</p>" +
        "<h3>Kommentare:</h3>" +
        "<ul class='comment-list'>" + commentsList + "</ul>" +
        "<input type='text' class='comment-input' placeholder='Schreib einen Kommentar'>" +
        "<button class='comment-button'>Senden</button>";
}

function createCommentsList(comments) {
    let commentItems = "";

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        commentItems += "<li>[" + comment.user + "]: " + comment.text + "</li>";
    }

    return commentItems;
}

function addCardEventListeners(card) {
    const likeButton = card.querySelector(".like-button");
    likeButton.addEventListener("click", function () {
        handleLikeClick(likeButton);
    });

    const commentButton = card.querySelector(".comment-button");
    commentButton.addEventListener("click", function () {
        handleCommentClick(commentButton);
    });
}

function handleLikeClick(likeButton) {
    const clickedCard = likeButton.closest(".book-card");
    const clickedBook = books[clickedCard.dataset.index];
    const likeCount = likeButton.querySelector(".like-count");

    if (likeButton.classList.contains("liked")) {
        clickedBook.likes = clickedBook.likes - 1;
        likeButton.classList.remove("liked");
    } else {
        clickedBook.likes = clickedBook.likes + 1;
        likeButton.classList.add("liked");
    }

    likeCount.textContent = clickedBook.likes;
}

function handleCommentClick(commentButton) {
    const clickedCard = commentButton.closest(".book-card");
    const clickedBook = books[clickedCard.dataset.index];
    const input = clickedCard.querySelector(".comment-input");
    const text = input.value.trim();

    if (text == "") {
        return;
    }

    const newCommentData = { user: "Du", text: text };
    clickedBook.comments.push(newCommentData);
    addCommentToList(clickedCard, newCommentData);
    input.value = "";
}

function addCommentToList(card, comment) {
    const list = card.querySelector(".comment-list");
    const newComment = document.createElement("li");
    newComment.innerHTML = "[" + comment.user + "]: " + comment.text;
    list.appendChild(newComment);
}

showBooks();