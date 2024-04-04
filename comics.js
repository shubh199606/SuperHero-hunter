const req= new XMLHttpRequest();
const public_key='9798c70d3a564b5b348e0faab8ac5062';
const private_key='da5aafdff6ebeddaa9bc8db4b9e87dbc02ca049a'
const apiKey='9798c70d3a564b5b348e0faab8ac5062'

var curr_Comic_Char_ToShow=null
const ts=Date.now();
// console.log(ts);
const st=ts+private_key+public_key;

var hash =  CryptoJS.MD5(st).toString();
console.log("hash : ",hash);

console.log(req);
const url=`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}`;
console.log(url);

// req.open("GET", url);
// req.send();



console.log("button fire");
var urlQueryParams=new URLSearchParams(window.location.search);

// console.log(urlQueryParams);


function singleCharacter(){
  var searchedQuery=urlQueryParams.get("character")
  console.log(searchedQuery);
  var comics=urlQueryParams.get('comic')
  console.log("comics :",comics);


   if(searchedQuery){
   console.log("inside this");
   const xhr=new XMLHttpRequest();
   const comicUrl=`https://gateway.marvel.com:443/v1/public/characters/${searchedQuery}?ts=${ts}&apikey=${public_key}&hash=${hash}`
//    const url=`https://gateway.marvel.com:443/v1/public/characters/1009381?ts=${ts}&apikey=9798c70d3a564b5b348e0faab8ac5062&hash=${hash}`
   console.log("comic url ",comicUrl);
   xhr.open('GET',comicUrl)
   xhr.onloadstart=()=>{
      console.log("1:")
      document.getElementsByClassName("col-md-12").innerHTML=`<h5 class="animate-character">fetching the comics .... </h5>`
      const value=document.getElementsByTagName('div')
      console.log(value)
   
   }
   xhr.onerror=function(){
    console.log("some error occur")
   	console.log("2:")
      const value=document.getElementsByTagName('div')
      console.log(value)
   }
   xhr.onload=function(){
   	console.log("3:");
    console.log(this)
       if(this.status==200){
   		console.log("comics fetched !!");
   		// console.log(JSON.parse(this.responseText));
   		const results=JSON.parse(this.responseText);
   		const comics=results["data"].results;

   		console.log("comics loaded : ",comics);
   		if(results["data"]==0){
   			document.getElementById("comic-section").innerHTML=`<h2>No comics found !! </h2>`
   		}else{
            console.log(results["data"].results);
            const Info=results["data"].results ;
             document.querySelector('.boxItem').innerHTML=`
             <h1>${Info[0].name}...</h1>
             <ul>
             
               <li>
                   <div class="row">
                       <div class="col-md-12 text-center" id="component">
                         <h3 class="animate-charcter">Comics : &nbsp;${Info[0].comics.available}</h3>
                       </div>
                   </div>
                 
                       
                  
               </li>
               <li>
                   
                   <div class="row">
                       <div class="col-md-12 text-center" id="component">
                         <h3 class="animate-charcter">Events :&nbsp;${Info[0].events.available}</h3>
                       </div>
                   </div>
                 
               </li>
               <li>
                   
                   <div class="row">
                       <div class="col-md-12 text-center">
                         <h3 class="animate-charcter">Series: &nbsp; ${Info[0].series.available}</h3>
                       </div>
                   </div>
                 
                   
               </li>
               <li>
                   
                   <div class="row">
                       <div class="col-md-12 text-center" id="component">
                         <h3 class="animate-charcter">Stories : &nbsp;${Info[0].stories.available}</h3>
                       </div>
                   </div>
                 
                   
               </li>
             </ul>
             `

   		}
   	}
   	else{
   		console.log("error occur in comics fetch");
   	}
    }
    xhr.onloadend=()=>{

    }
    xhr.send();
  }
  if(comics){
    console.log("don't worry ");
    const comicUrl=`https://gateway.marvel.com:443/v1/public/comics/${comics}?ts=${ts}&apikey=${public_key}&hash=${hash}`
    console.log(comicUrl);
    const xhr=new XMLHttpRequest()
    xhr.open('GET',comicUrl)
    xhr.onloadstart=()=>{
      console.log("here the comics search begin..");
    }
    xhr.onerror=function(){
      console.log("some error occur !!");
    }
    xhr.onload=function(){

      if(this.status==200){
        console.log("comics fetched !!");
        // console.log(JSON.parse(this.responseText));
        const results=JSON.parse(this.responseText);
        const comics=results["data"].results;
 
        console.log("comics loaded : ",comics);
        if(results["data"]==0){
          document.getElementById("comic-section").innerHTML=`<h2>No comics found !! </h2>`
        }else{
             console.log(results["data"].results);
             const Info=results["data"].results ;
             console.log("info ",Info);
             document.querySelector('.boxItem').innerHTML=`
             <h1 style="font-size:1.9rem;">${Info[0].title}...</h1>
             <ul>
             
               <li>
                   <div class="row">
                       <div class="col-md-12 text-center" id="component">
                         <h3 class="animate-charcter">Characters : &nbsp;${Info[0].characters.available}</h3>
                       </div>
                   </div>
                 
                       
                  
               </li>
               <li>
                   
                   <div class="row">
                       <div class="col-md-12 text-center" id="component">
                         <h3 class="animate-charcter">Creators :&nbsp;${Info[0].creators.available}</h3>
                       </div>
                   </div>
                 
               </li>
               <li>
                   
                   <div class="row">
                       <div class="col-md-12 text-center">
                         <h3 class="animate-charcter">Series: &nbsp; ${Info[0].series.name}</h3>
                       </div>
                   </div>
                 
                   
               </li>
               <li>
                   
               <div class="row">
                   <div class="col-md-12 text-center">
                     <h3 class="animate-charcter">Price: &nbsp; ${Info[0].prices[0].price}$</h3>
                   </div>
               </div>
             
               
               </li>
               <li>
                   
                   <div class="row">
                       <div class="col-md-12 text-center" id="component">
                         <h3 class="animate-charcter">Stories : &nbsp;${Info[0].stories.available}</h3>
                       </div>
                   </div>
                 
                   
               </li>
             </ul>
             `

             
      } }
      else{
        console.log("error occur in comics fetch");
      }   

    }

    xhr.onloadend=()=>{
      console.log("the fetching ends");
  
     }
    xhr.send();
   
   }
  
}




