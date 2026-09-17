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

function addCardEventListeners(card) {
    const likeButton = card.querySelector(".like-button");
    likeButton.addEventListener("click", function () {
        likeClick(likeButton);
    });

    const commentButton = card.querySelector(".comment-button");
    commentButton.addEventListener("click", function () {
        commentClick(commentButton);
    });
}

function likeClick(likeButton) {
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

function commentClick(commentButton) {
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
    newComment.innerHTML = `[${comment.user}]: ${comment.text}`;
    list.appendChild(newComment);
}

showBooks();