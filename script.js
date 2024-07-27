document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchQuery').value;
    if (query) {
        fetchRepositories(query);
    }
});

function fetchRepositories(query) {
    fetch(`https://api.github.com/search/repositories?q=${query}`)
        .then(response => response.json())
        .then(data => displayResults(data.items))
        .catch(error => console.error('Error:', error));
}

function displayResults(repositories) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    repositories.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.classList.add('repo');
        repoElement.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || 'No description available'}</p>
            <p>Stars: ${repo.stargazers_count}</p>
        `;
        resultsContainer.appendChild(repoElement);
    });
}
