import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
    const newPostBtn = document.getElementById('new-post-btn');
    const postForm = document.getElementById('post-form');
    const submitPostBtn = document.getElementById('submit-post');
    const postsContainer = document.getElementById('posts-container');

    const quill = new Quill('#editor', {
        theme: 'snow'
    });

    newPostBtn.addEventListener('click', () => {
        postForm.classList.toggle('uk-hidden');
    });

    submitPostBtn.addEventListener('click', async () => {
        const title = document.getElementById('post-title').value;
        const author = document.getElementById('post-author').value;
        const body = quill.root.innerHTML;

        if (title && author && body) {
            await backend.addPost(title, author, body);
            loadPosts();
            postForm.classList.add('uk-hidden');
        } else {
            alert('Please fill in all fields.');
        }
    });

    async function loadPosts() {
        const posts = await backend.getPosts();
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('uk-card', 'uk-card-default', 'uk-card-body', 'uk-margin');
            postElement.innerHTML = `
                <h3 class="uk-card-title">${post.title}</h3>
                <p><strong>Author:</strong> ${post.author}</p>
                <div>${post.body}</div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    loadPosts();
});
