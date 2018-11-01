$(function(){
  $("#get").click(()=>{
    const limit = document.getElementById("limit").value;

    json = {
      limit : Number(limit),
      page : 1
    };
    getSortObject(json);
    $.ajax({
      type: "POST",
    url: "/api/articles/readall",
    contentType: "application/json",
    data: JSON.stringify(json),
    success:  (data) => {
        document.getElementById("limit").hidden = true;
        const result = data;
        getButtons(result.pages, limit);
    }
    });
})
})
  
  function getButtons(count,limit){
    let buttons = document.createElement("div");
    buttons.id = "buttons";
    for (let index = 1; index <= count; index++){
      let button = getButton(index,limit);
      buttons.appendChild(button);
    }
    document.body.appendChild(buttons);
  }
  
  function getButton(index,limit){
    let button = document.createElement("button");
    button.id = index;
    button.innerHTML = button.id;
    button.setAttribute("onclick", `showArticles(${index},${limit})`);
    return button;
  }
  
  function showArticles(page, limit){
    document.getElementById("articles").innerHTML = " ";
    const json = {
      limit : limit,
      page : page
    };
    getSortObject(json);
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/api/articles/readall",
      contentType: "application/json",
      data: JSON.stringify(json),
      success: (data) => {
      const result = data;
      const articles = result.items;
      for (let index = 0; index < articles.length; index++){
        let article = getArticle(articles[index]);
        document.getElementById("articles").appendChild(article);
      }
    }});
  }
  
  function getArticle(articleValue){
    let article = document.createElement("div");
    let title = document.createElement("p");
    let text = document.createElement("p");
    let date = document.createElement("p");
    let author = document.createElement("p");
    title.textContent = `Title: ${articleValue.title}`;
    text.textContent = `Description: ${articleValue.text}`;
    date.textContent = `Date: ${articleValue.date}`;
    author.textContent = `Author: ${articleValue.author}`;
    appendAll(article, [title,text,date,author]);
    if (typeof articleValue.comments !== 'undefined' && articleValue.comments.length > 0){
      article.append(getComments(articleValue.comments))
    }
    return article;
  }
  
  function getSortObject(object){
    if (!document.getElementById("sorting").hidden){
      object.sortOrder = document.getElementById("sort").value;
      object.sortField = document.getElementById("sortfield").value;
    }
  }
  
  function getComments(comments){
    let commentBlock = document.createElement("div");
    for (let index = 0; index < comments.length; index++){
      let comment = getComment(comments[index]);
      commentBlock.appendChild(comment);
    }
    return commentBlock;
  }
  
  function getComment(commentValue){
    let comment = document.createElement("div");
    let text = document.createElement("p");
    let date = document.createElement("p");
    let author = document.createElement("p");
    text.textContent = `Text: ${commentValue.text}`;
    date.textContent = `Date: ${commentValue.date}`;
    author.textContent = `Author ${commentValue.author}`;
    appendAll(comment, [text,date,author]);
    return comment;
  }

  function appendAll(parent, childrens){
    for (let index = 0; index < childrens.length; index++){
      parent.appendChild(childrens[index]);
    }
  }