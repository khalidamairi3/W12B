function postTweet() {

    let tweet_title = document.getElementById("title").value;
    let tweet_body = document.getElementById("body").value;

    let tweet = {
        title: tweet_title,
        body: tweet_body,
        userId: 1
    };
    
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            document.getElementById("message").innerHTML="tweet is posted successfully";
            
        }
        else if(this.readyState != 4){
            document.getElementById("message").innerHTML="posting...";
        }
        else{
            document.getElementById("message").innerHTML="tweet couldn't be posted";
        }
    }
    ajax.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(tweet));


}

function getcomments(comments_html,id){

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        comments_html.innerHTML="";
        if (this.readyState == 4 && this.status == 200) {
            let comments=JSON.parse(this.responseText);         
            for(let i=0;i< comments.length;i++){
                let comment_html = document.createElement("div");
                let comment_name = document.createElement("h3");
                let comment_email = document.createElement("h2");
                let comment_body = document.createElement("p");
                comment_name.innerHTML = comments[i].name;
                comment_email.innerHTML = comments[i].email;
                comment_body.innerHTML=comments[i].body;
                comment_html.appendChild(comment_name);
                comment_html.appendChild(comment_email);
                comment_html.appendChild(comment_body);
                comment_html.classList.add("comment");
                comments_html.appendChild(comment_html);
                

            }
            
        }
        else if(this.readyState != 4){
            comments_html.innerHTML="loading comments";
        }
        else{
            comments_html.innerHTML="loading comments failed";
        }
    }
    ajax.open("GET", "https://jsonplaceholder.typicode.com/posts/"+id+"/comments", true);
    ajax.send();



}

function getTweets() {

    
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        tweets_html = document.getElementById("tweets");
        tweets_html.innerHTML="";
        if (this.readyState == 4 && this.status == 200) {
            let tweets=JSON.parse(this.responseText);         
            for(let i=0;i< tweets.length;i++){
                let tweet_html = document.createElement("div");
                let tweet_title = document.createElement("h3");
                let tweet_body = document.createElement("p");
                let comments = document.createElement("div");
                comments.classList.add("comments");
                getcomments(comments,tweets[i].id);
                tweet_title.innerHTML = tweets[i].title;
                tweet_body.innerHTML=tweets[i].body;
                tweet_html.appendChild(tweet_title);
                tweet_html.appendChild(tweet_body);
                tweet_html.appendChild(comments);
                tweet_html.classList.add("tweet");
                tweets_html.appendChild(tweet_html);
                

            }
            
            
        }
        else if(this.readyState != 4){
            tweets_html.innerHTML = "Loading...";
        }
        else{
            tweets_html.innerHTML="content couldn't be loaded";
        }
    }
    ajax.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    ajax.send();


}
function patchTweet() {

    
    let tweet_body = "khaled has updated this tweet using patch request";

    let tweet = {
        body: tweet_body,
    };
    
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            
        }
        else if(this.readyState != 4){
            console.log("updating...");
        }
        else{
            console.log("update failes");
        }
    }
    ajax.open("PATCH", "https://jsonplaceholder.typicode.com/posts/1", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(tweet));


}

function deleteTweet() {

    
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            
        }
        else if(this.readyState != 4){
            console.log("deleting...");
        }
        else{
            console.log("delete failes");
        }
    }
    ajax.open("DELETE", "https://jsonplaceholder.typicode.com/posts/1", true);
    ajax.send();


}


getTweets();
patchTweet();
deleteTweet();
let tweetToPost = document.getElementById("tweet-submit"); 
tweetToPost.addEventListener("click", postTweet);

