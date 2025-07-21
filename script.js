// 🚀 Міні-проєкт: “Міні-блог” (отримання і додавання постів через API)
// Функціонал:
// GET — отримати список постів з публічного API
// POST — додати новий пост (через fetch з методом POST)
// Відобразити пости у консолі або на сторінці
// API для тестування:
// Використаємо JSONPlaceholder — безкоштовний фейковий REST API.
// GET пости:
// https://jsonplaceholder.typicode.com/posts
// POST пост:
// https://jsonplaceholder.typicode.com/posts
// Твоє завдання:
// Напиши async-функцію getPosts(), яка за допомогою fetch отримує пости і виводить їх у консоль (або на сторінку).
// Напиши async-функцію addPost(post), яка надсилає новий пост методом POST (має бути об’єкт із полями title та body).
// Виклич їх послідовно, щоб спершу отримати пости, а потім додати новий.

const parent = document.querySelector('.listParent');
const button = document.querySelector('.btn');

function wait (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function addPost(post) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                title: post.title,
                body: post.body,
                id: post.id,
                userId: post.userId
            })
        });
        const data = await response.json();
    }
    catch (error) {
        console.log(`Error! ${error}`);
    }
}



console.log('Console run');

async function getPosts() {
    button.style.display = 'none';
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit');
        const posts = await response.json();
        let counter = 0;
        let count = 0;
        for (const post of posts) {
            counter++;
            if (counter >= 85) {
                count++;
                const list = document.createElement('li');
                parent.appendChild(list);
                list.textContent = `${count}: ${post.title} : ID: ${post.id}`;
                await wait(500);
                list.style.listStyleType = 'none';
            }
            // if (counter < 85) {
            //     return;
            // }
            if(counter == 100) {
                const msg = 'You fetched all data';
                alert(msg);
            }
        }
    }
    catch (error) {
        console.log('Error! ' + error);
    }
}

addPost({title: 'Motocross', body: 'I like drive enduro', id: 11, userId: 1});