console.log("Welcome to News Site");
document.getElementById("searchtxt").value=""; // initializing searchbtn on reloading
let news_accordion_list=document.getElementById("news_accordion_list");  //grabing the news container list

//creating a get request
const xhr=new XMLHttpRequest();
xhr.open("GET", `https://newscafapi.p.rapidapi.com/apirapid/news/world/`, true);  //asynchronus
xhr.setRequestHeader("X-RapidAPI-Key", config.ApiKey); //setting header Keys is diff module included in index.html
xhr.setRequestHeader("X-RapidAPI-Host", config.ApiHost);  //setting header
xhr.onload= function(){
    if(this.status===200){   //status 200 stands for response okay, it checks for errors, file searched fetched or not
        let json=JSON.parse(this.responseText);
        console.log(json)
        let newsHTML="";
        json.forEach(function(element, index){
            let news_card=`
            <div id="${index}">
                <p class="news-title"><button class="btn-secondary btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${index}" 
                aria-expanded="false" aria-controls="collapseExample${index}" style="margin-left: 2vw; margin-top: .5vh;">
                    ${element.title}
                </button></p>
                <div class="collapse" id="collapseExample${index}" style="margin-left: 4vw; margin-right: 5vw;">
                    <div class="card card-body">
                        <b class="news-description">${element.title}</b> <br> ${element.content} <br> 
                        <a href="${element.source_url}">Read more here</a>
                    </div>
                </div>
            </div>           
            `;
            newsHTML+=news_card;
        });
        news_accordion_list.innerHTML=newsHTML;
    }
    else{ console.error("Some error occured"); }
}
xhr.send(); 
console.log("request sent!!");

//searching function (navbar) for sorting notes on the basis of text inputed
let search=document.getElementById("searchtxt");  //selecting inputing tag
search.addEventListener("input", function(){
    // console.log("input event used");
    let inputval=search.value.toLowerCase();  //lowercase function will convert uppercase inputed text into lowercase
    let newstitle=document.getElementsByClassName("news-title");
    Array.from(newstitle).forEach(function(element,index){
        //base condition for searching as now we have retreived card text
        if(element.innerText.toLowerCase().includes(inputval)){
            element.style.display= "block";  //changing css
            document.getElementById(index).style.display="block"; //changing css
            // element.style.visibility= "revert";  //changing css
            // document.getElementById(index).style.visibility="revert"; //changing css
        }
        else{ 
            element.style.display= "none";
            document.getElementById(index).style.display="none"; //changing css 
            // element.style.visibility= "collapse";
            // document.getElementById(index).style.visibility="collapse"; //changing css 
        }
    });
});

//preventing default action of searchbtn
let searchbtn=document.getElementById("searchbtn");
searchbtn.addEventListener("click", (e)=>{e.preventDefault();});