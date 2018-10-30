function createArticle() {
    let url = "http://localhost:3000/api/articles/create";
    let title = document.getElementsByName('title')[0].value;
    let author = document.getElementsByName('author')[0].value;
    let text = document.getElementsByName('text')[0].value;
    let date = document.getElementsByName('date')[0].value;
    let data =  {
        "title" : title,
        "author" : author,
        "text" : text,
        "date" : date
    };
    data = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}