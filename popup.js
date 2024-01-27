document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.getElementById('toggleSwitch');

    // Load the state of the extension
    chrome.storage.sync.get('enabled', function (data) {
        checkbox.checked = data.enabled;
    });

    // Save the state of the extension
    checkbox.addEventListener('change', function () {
        chrome.storage.sync.set({ 'enabled': checkbox.checked });
    });
});
