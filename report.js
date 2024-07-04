document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get('hiddenCounts', function(data) {
    document.getElementById('hidden-count').innerText = data.hiddenCounts || 0;
  });

  document.getElementById('close-btn').addEventListener('click', () => {
    window.close();
  });
});