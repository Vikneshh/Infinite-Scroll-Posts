const postsContainer=document.getElementById("post-container");
const loader=document.getElementById("loader");
const filter=document.getElementById("filter-container");


// Setting the default limit and page to be 3 and 1
let limit=5;
let page=1;


//Fetch post from the API

async function getPosts(){
    const res=await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data=await res.json()

    return data;
}


//show post in the DOM

async function showPosts(){
    // Awaiting and getting the elements by the fetch request
    const posts= await getPosts();
    console.log(posts)

    posts.forEach(post=>{
        const postEl=document.createElement("div");
        postEl.classList.add("post");
        postEl.innerHTML=` <div class="number">${(post.id)}</div>
        <div class="post-info">
            <h2 class="post-title">
                ${post.title}
            </h2>
            <p class="post-body">
               ${post.body}
            </p>
        </div>`
        //Remember to append each of the child elements
        postsContainer.appendChild(postEl);
    });
}

//show loader and fetch more posts

function showLoading(){
    loader.classList.add("show");

//Hiding the loader animations after 1s

    setTimeout(()=>{
        loader.classList.remove("show");
        //Loading more posts
        setTimeout(()=>{

            // Moving to second page by adding one
            page++;
            // Fetch posts into the DOM again
            showPosts();
        },400)
    },1000)
}

//Filtering the posts by the inputs from the users

//Remember these posts only filter the elemenst which is present in the DOM at that exact time and they personally doesn't make any htpp request by them. 

function filterPosts(e){
    // When we do this it will be case sensitive search and we don't want that in them so we convert all of them to UPPERCASE.
        const term=e.target.value.toUpperCase();
        const posts=document.querySelectorAll(".post");
        //This will gives us a node list of all the post

        posts.forEach((post)=>{

            //Getting the title one by one
            //Getting the body one by one
            const title=post.querySelector(".post-title").innerText.toUpperCase();
            const body=post.querySelector(".post-body").innerText.toUpperCase();

            // Greater than -1  basically means a match boz a no match will return us with -1 and a match will return 1
           if(title.indexOf(term)>-1 || body.indexOf(term)>-1){
                post.style.display='flex'; //flex is the default value we gave
           }
           else{
            post.style.display='none'; //Shows no post bcoz of no matches
           }

        })
}

//showing initial posts

showPosts()

window.addEventListener('scroll',()=>{
    //There are some properties in documentElement to get the scroll position
    // console.log(document.documentElement.scrollHeight)

    //we are going to use DESTRUCTURING to pull variables out of the objects

   const{scrollTop,scrollHeight,clientHeight}= document.documentElement;

//Got it on the stackoverflow

    if(scrollTop+clientHeight >= scrollHeight-5){
     showLoading();
    }
});

//Adding the filter functionality
// Matches strings with posts entered onto the filter
filter.addEventListener("input",filterPosts);
