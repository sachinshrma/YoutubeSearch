var searchBox = document.querySelector('#search-box')
var searchBtn = document.querySelector('#search-btn')
var prevBtn   = document.querySelector('#prev-btn')
var nextBtn   = document.querySelector('#next-btn')

var url='https://www.googleapis.com/youtube/v3/search?key=AIzaSyDGGG9bl2sv26gIzbnauWcCsOLJWMbN6bE&type=video&part=snippet&maxResults=15&q=js'

var videos=[]
var start=0
var end=0
let count=0
searchBtn.addEventListener('click',event=>{
    fetch(url+searchBox.value)
    .then(response=>{
        return response.json()
    })
    .then(result=>{
        videos=result.items
        start=0
        end=videos.length
        populateView(false)
    })   
})

prevBtn.addEventListener('click',event=>{
    // loadVideos(url+keyword+'&pageToken='+prevToken) 
    populateView(true)    
})

nextBtn.addEventListener('click',event=>{
    // loadVideos(url+keyword+'&pageToken='+nextToken)  
    populateView(false)  
})


function populateView(rev){
    
    if(rev){
        if(start-count<=0)  return          
        document.querySelector('.result-container').innerHTML=''          
        start=start-count
        count=0
        let j=start-1-4        
        for(;j<start;++j){
            count++;
            var snippet=videos[j].snippet
            createVideoElement(snippet)
        }
    }else{
        if(start==end)  return        
        document.querySelector('.result-container').innerHTML=''
        count=0
        for(let i=start;i<end&&i<start+5;++i){
            count++;
            var snippet=videos[i].snippet
            createVideoElement(snippet)
        }
        start+=count
    }
    console.log(start+' '+end);
}
function createVideoElement(data){
    var card=document.createElement("div")
    card.classList.add("card")
    var image = document.createElement("img")
    image.src=data.thumbnails.medium.url
    image.style.width="100%"
    var container=document.createElement("div")
    container.classList.add("container")
    var title=document.createElement("h3")
    title.innerHTML=data.title
    var description=document.createElement("p")
    description.innerHTML=data.description
    var date=document.createElement("p")
    var author=document.createElement("p")
    author.innerHTML=data.channelTitle
    date.innerHTML=data.publishedAt

    container.appendChild(title)
    container.appendChild(description)
    container.appendChild(author)
    container.appendChild(date)
    card.appendChild(image)
    card.appendChild(container)

    document.querySelector('.result-container').appendChild(card)
}
