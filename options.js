document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('company-input');
  const button = document.getElementById('add-company');
  const list = document.getElementById('company-list');

  chrome.storage.sync.get('blockedCompanies', function(data) {
    const companies = data.blockedCompanies || [];
    companies.forEach(company => {
      addCompanyToList(company);
    });
  });

  button.addEventListener('click', () => {
    const company = input.value.trim().toLowerCase();
    if (company) {
      chrome.storage.sync.get('blockedCompanies', function(data) {
        const companies = data.blockedCompanies || [];
        if (!companies.includes(company)) {
          companies.push(company);
          chrome.storage.sync.set({ blockedCompanies: companies }, function() {
            addCompanyToList(company);
            input.value = '';
          });
        }
      });
    }
  });

  function addCompanyToList(company) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = company;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-danger btn-sm remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeCompanyFromList(company, li);
    });

    li.appendChild(removeBtn);
    list.appendChild(li);
  }

  function removeCompanyFromList(company, listItem) {
    chrome.storage.sync.get('blockedCompanies', function(data) {
      let companies = data.blockedCompanies || [];
      companies = companies.filter(item => item !== company);
      chrome.storage.sync.set({ blockedCompanies: companies }, function() {
        listItem.remove();
      });
    });
  }
});