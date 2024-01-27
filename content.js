// document.body.innerHTML = document.body.innerHTML.replace(/anyfactor/gi, '<a target="_blank" href="https://anyfactor.net">anyfactor</a>');

function replaceIPsWithLinks(node) {
    // Regular expression for matching IPv4 and IPv6 addresses
    const ipPattern = /\b(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4})\b/g;

    // Function to replace text with links
    function replaceTextWithLink(textNode) {
        const text = textNode.nodeValue;
        const parent = textNode.parentNode;

        let match;
        let lastOffset = 0;

        // Iterate over all IP address matches
        while ((match = ipPattern.exec(text)) !== null) {
            const ip = match[0];
            const href = `https://ipinfo.io/${ip}`;

            // Create a link element
            const link = document.createElement('a');
            link.href = href;
            link.textContent = ip;
            link.target = "_blank";  // Open in a new tab

            // Insert text before the IP address
            parent.insertBefore(document.createTextNode(text.substring(lastOffset, match.index)), textNode);

            // Insert the link
            parent.insertBefore(link, textNode);

            // Update the lastOffset
            lastOffset = ipPattern.lastIndex;
        }

        // Add any remaining text
        parent.insertBefore(document.createTextNode(text.substring(lastOffset)), textNode);

        // Remove the original text node
        parent.removeChild(textNode);
    }

    // Iterate over all text nodes
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    textNodes.forEach(replaceTextWithLink);
}

// Call the function when the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', replaceIPAddresses);

chrome.storage.sync.get('enabled', function (data) {
    if (data.enabled) {
        setTimeout(replaceIPsWithLinks(document.body), 2000);
    }
});