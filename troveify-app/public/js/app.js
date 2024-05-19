document.addEventListener('DOMContentLoaded', function() {
    async function fetchCollections() {
        const response = await fetch('/api/collections');
        const collections = await response.json();
        displayCollections(collections);
    }

    function displayCollections(collections) {
        const collectionList = document.getElementById('collectionList');
        collectionList.innerHTML = '';
        collections.forEach(collection => {
            const li = document.createElement('li');
            li.classList.add('collectionItem');
            li.textContent = collection.name;
            li.addEventListener('click', function() {
                addToCollectionButton.style.display = 'block';
                addToCollectionButton.textContent = `Add to ${collection.name}`;
                addToCollectionButton.dataset.collectionId = collection.id;
                localStorage.setItem('selectedCollection', collection.id);
            });
            collectionList.appendChild(li);
        });
    }

    const addButton = document.getElementById('addButton');
    const collectionInput = document.getElementById('collectionInput');

    addButton.addEventListener('click', function() {
        collectionInput.style.display = 'inline-block';
        collectionInput.focus();
    });

    collectionInput.addEventListener('blur', function() {
        if (collectionInput.value.trim() === '') {
            collectionInput.style.display = 'none';
        }
    });

    collectionInput.addEventListener('keypress', async function(event) {
        if (event.key === 'Enter') {
            const collectionName = collectionInput.value.trim();
            if (collectionName !== '') {
                const response = await fetch('/api/collections', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: collectionName, items: [] })
                });
                const newCollection = await response.json();
                collectionInput.value = '';
                collectionInput.style.display = 'none';
                fetchCollections();
            }
        }
    });

    fetchCollections();
});
