function createBookContent(book) {
    const commentsList = createCommentsList(book.comments);

    return `<h2>${book.title}</h2>
        <hr class='card-divider'>
        <img class='book-cover' src='${book.image}' alt='Cover von ${book.title}'>
        <hr class='card-divider'>
        <div class='book-top'>
        <p class='price'>${book.price.toFixed(2)} €</p>
        <button class='like-button'><span class='like-count'>${book.likes}</span></button>
        </div>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Erscheinungsjahr:</strong> ${book.year}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <hr class='card-divider'>
        <h3>Kommentare:</h3>
        <ul class='comment-list'>${commentsList}</ul>
        <input type='text' class='comment-input' placeholder='Schreib einen Kommentar'>
        <button class='comment-button'>Senden</button>`;
}

function createCommentsList(comments) {
    let commentItems = "";

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
       commentItems += `<li>[${comment.user}]: ${comment.text}</li>`;
    }

    return commentItems;
}