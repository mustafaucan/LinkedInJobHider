function hideJobListings(companies) {
    const jobCards = document.querySelectorAll('li.jobs-search-results__list-item');
    let hiddenCount = 0;

    jobCards.forEach(card => {
        const companyElement = card.querySelector('.job-card-container__primary-description');
        if (companyElement) {
            const companyName = companyElement.innerText.trim().toLowerCase();
            if (companies.includes(companyName)) {
                card.style.display = 'none';
                hiddenCount++;
            }
        }
    });

    if (hiddenCount > 0) {
        chrome.storage.sync.get('hiddenCounts', function(data) {
            let counts = data.hiddenCounts || 0;
            counts += hiddenCount;
            chrome.storage.sync.set({ hiddenCounts: counts });
        });
    }
}

chrome.storage.sync.get('blockedCompanies', function(data) {
    hideJobListings(data.blockedCompanies || []);
});

let observer = new MutationObserver((mutations) => {
    chrome.storage.sync.get('blockedCompanies', function(data) {
        hideJobListings(data.blockedCompanies || []);
    });
});

observer.observe(document, { childList: true, subtree: true });
