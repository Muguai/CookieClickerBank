import { postArray } from "../data/posts.js";

const elPosts = document.getElementById('posts');
const elTopPost = document.getElementById('topPost');
const elTopPostImage = document.getElementById('topPostImage');

function createTopPost(post){
    console.log("before " + elTopPost);
    console.log("CreateTopPost " + post.Id);
    elTopPostImage.src = post.photo;
    const headerHTML = `<div class="card-header"> <b class="card-text  text-black-50">Published: ${post.date}</b> </div>`;
    const bodyHTML = `<div class="card-body">

    <h2 class="card-text"> ${post.title}</h2>
    <h4 class="card-text card-subtitle text-black-50 mb-4">${post.subTitle}</h4>
    <p>
        ${post.intro}
    </p>
    <p class="text-black-50 d-flex align-items-center">
        <span class="material-icons">person</span>
        ${post.author}
    </p>
    </div>`;

    console.log(createTag(post.tags))
    elTopPost.innerHTML = headerHTML + bodyHTML + createTag(post.tags);
}


function createTag(tags){
    let result = `<div class="card-footer ">`;
    tags.forEach(element => (result += `<span class="badge bg-primary ">#${element}</span> `));
    result += `</div>`;
    return result;

}

function createPost(post){

    const imgHTML = `<img class= "d-block w-100 card-img-top" src=${post.photo}> `;
    const headerHTML = `<div class="card-header">
                            <b class="card-text  text-black-50">Published: ${post.date}</b>
                        </div> `;
    const bodyHTML = `<div class="card-body">
                        <h2 class="card-text">${post.title}</h2>
                        <h4 class="card-text card-subtitle text-black-50 mb-4">${post.subTitle}</h4>
                        <p>
                            ${post.intro}
                        </p>
                        <p class="text-black-50 d-flex align-items-center">
                            <span class="material-icons">person</span>
                            ${post.author}
                        </p>
                    </div>`;
    
    return imgHTML + headerHTML + bodyHTML + createTag(post.tags);
}

function initializeWebsite(){
    createTopPost(postArray[0]);
    console.log(elPosts);
    const sections = elPosts.getElementsByTagName('section');
    let divArray = [];
    for (var i = 0; i < sections.length; i += 1) {
            console.log(i);
            sections[i].innerHTML = createPost(postArray[i + 1]);
    }
}

initializeWebsite();
