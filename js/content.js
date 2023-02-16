// console
console.log(`%c${'----------\n欢迎使用col-dl插件.\n此插件仅用于华东师范大学共享调节团队内部使用。\n----------'}`, 'font-size: 20px;color: #9c26b0;font-weight: bold;')

chrome.runtime.onMessage.addListener((req, sender, resp) => {
  let txt = "";
  // const pages = document.getElementById("mainIframe").contentWindow.document.getElementsByClassName("divPage");
  const pages = document.getElementById("mainIframe").contentWindow.document.getElementsByClassName("divPage");
  const title = document.getElementById("mainIframe").contentWindow.document.querySelector(".QNTitleRed").innerText;
  txt += title + "\n";
  for (const val of pages) {
    console.log(typeof val.children[0].tagName)
    if (val.children[0].tagName.toLowerCase() === "h2") {
      console.log('enter');
      txt += (val.children[0].innerText + "\n");
    }
    if (val.children[1].tagName.toLowerCase() === "b") {
      txt += (val.children[1].innerText + "\n");
    }
    for (const ele of val.children) {
      if (ele.tagName.toLowerCase() === "p") {
        txt += (ele.innerText + "\n");
      }
    }
    txt += "\n";
  }
  let content = txt.replace(/\* - .*/g, "")
  // 创建下载
  const dl = document.createElement("a");
  dl.setAttribute("download", title);
  const blob = new Blob([content]);
  dl.setAttribute("href", URL.createObjectURL(blob));
  dl.style.display = "none";
  document.body.appendChild(dl);
  dl.click();
  document.body.removeChild(dl);
  resp("导出成功");
})