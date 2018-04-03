x = document.getElementById("demo");

function loadXMLDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(this.responseText));
        cats=JSON.parse(this.responseText);

        for (let category of cats) {
        	var div = document.createElement("div");
        	div.innerHTML=category.title;
        	div.id="category"+category.id
        	x.appendChild(div);
        	getClues(category.id);
        }
      }
    };
    xhttp.open("GET", "http://jservice.io/api/categories?count=5&offset=10", true);
    xhttp.send();
}

function getClues(cat_id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      clues=JSON.parse(this.responseText);
      var column = document.getElementById("category"+cat_id);
      for (let queue of clues.clues) {
        var div = document.createElement("div");
        div.classList.add("slot");
          div.innerHTML=queue.value;
          div.onclick=function() {
            this.innerHTML=queue.question;
            this.onclick=function() {
              this.innerHTML=queue.answer;
            }
          }
          column.appendChild(div);
        }
      }
    };
  xhttp.open("GET", "http://jservice.io/api/category?id="+cat_id, true);
  xhttp.send();
}
