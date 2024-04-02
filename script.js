function fetchUsers() {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            return response.json();
        })
        .then(users => {
            resolve(users);
        })
        .catch(error => {
            reject(error);
        });
    });
}

function displayUsers(users) {
    const tabContainer = document.getElementById('tabContainer');
    const userListContainer = document.getElementById('userList');
    
    tabContainer.innerHTML = ''; 
    userListContainer.innerHTML = ''; 

    users.forEach(user => {
        const userId = user.id;
        const username = user.username;

        
        const tabButton = document.createElement('button');
        tabButton.textContent = username;
        tabButton.classList.add('tablinks');
        tabButton.dataset.userId = userId;
        tabButton.addEventListener('click', function() {
            fetchUserPosts(userId);
        });
        tabContainer.appendChild(tabButton);
    });
}




async function fetchUserPosts(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        displayUserPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}



function displayUserPosts(posts) {
    const userListContainer = document.getElementById('userList');
    userListContainer.innerHTML = ''; 

    posts.forEach(post => {
        const postTitle = post.title;
        const postItem = document.createElement('div');
        postItem.textContent = postTitle;
        postItem.setAttribute('id', 'my-post');
        userListContainer.appendChild(postItem);
    });

    const tabs = document.querySelectorAll('#userList');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    userListContainer.classList.add('active');
}





fetchUsers()
    .then(users => {
        displayUsers(users); 
        if (users.length > 0) {
            fetchUserPosts(users[0].id); 
        }
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });





