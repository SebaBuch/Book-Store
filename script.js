const bookList = document.getElementById("book-list")

function showBooks(){
bookList.innerHTML = "";

for (let i = 0; i < books.length; i++) {
const book = books[i];
const card = document.createElement("div")
card.className = "book-card";

let commentsHtml = "";
for (let j = 0; j < book.comments.length; j++){

    const comment = book.comments[j];
    commentsHtml += "<li><strong>[" + comment.user + "]:</strong> " + comment.text + "</li>";
}

}
}