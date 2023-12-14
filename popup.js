document.getElementById('add').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const url = document.getElementById('url').value;

    if (name && url) {
        chrome.storage.sync.get({ links: [] }, function(data) {
            const links = data.links;
            links.push({ name, url });
            chrome.storage.sync.set({ links }, function() {
                document.getElementById('name').value = '';
                document.getElementById('url').value = '';
                displayLinks();
            });
        });
    }
});

function displayLinks() {
    chrome.storage.sync.get({ links: [] }, function(data) {
        const linksElement = document.getElementById('links');
        linksElement.innerHTML = '';
        data.links.forEach(function(link) {
            const div = document.createElement('div');
            div.className = 'link-item';
            div.textContent = link.name;
            div.addEventListener('click', function() {
                chrome.tabs.create({ url: link.url });
            });
            linksElement.appendChild(div);
        });
    });
}

document.addEventListener('DOMContentLoaded', displayLinks);
