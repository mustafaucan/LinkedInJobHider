chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ blockedCompanies: [], hiddenCounts: 0, lastReset: Date.now() }, () => {
    console.log('Initialization complete.');
  });
  
  chrome.alarms.create('reportHiddenCounts', { periodInMinutes: 10080 }); // 1 week in minutes
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'reportHiddenCounts') {
    chrome.storage.sync.get(['hiddenCounts', 'lastReset'], function(data) {
      let currentTime = Date.now();
      let oneWeek = 1000 * 60 * 60 * 24 * 7; // One week in milliseconds

      if (currentTime - data.lastReset >= oneWeek) {
        chrome.windows.create({
          url: 'report.html',
          type: 'popup',
          width: 400,
          height: 400
        });

        chrome.storage.sync.set({ lastReset: currentTime, hiddenCounts: 0 });
      }
    });
  }
});
