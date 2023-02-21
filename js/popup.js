tab_id = null;

// 判断当前tab的id
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  tab_id = tabs[0].id;
})

document.getElementById("exportFile").addEventListener("click", (event) => {
  chrome.tabs.sendMessage(tab_id, {'name': 'e'}, (resp) => {
    document.getElementById("ans").innerText = resp;
  })
})

document.getElementById("copyClipboard").addEventListener("click", (event) => {
  chrome.tabs.sendMessage(tab_id, {'name': 'c'}, (resp) => {
    document.getElementById("ans").innerText = resp;
  })
})