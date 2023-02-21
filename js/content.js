// console
console.log(`%c${'----------\n欢迎使用col-dl插件.\n此插件仅用于华东师范大学共享调节团队内部使用。\n----------'}`, 'font-size: 20px;color: #9c26b0;font-weight: bold;')

chrome.runtime.onMessage.addListener((req, sender, resp) => {
  const name = req.name;
  let txt = "";
  const pages = document.getElementById("mainIframe").contentWindow.document.getElementsByClassName("divPage");
  const title = document.getElementById("mainIframe").contentWindow.document.querySelector(".QNTitleRed").innerText;
  let title_o = title.replace(/\s-\s\d.*/g, "");
  txt += "【" + title_o + "】\n\n";
  for (const val of pages) {
    if (val.children[0].tagName.toLowerCase() === "h2") {
      if (val.children[1].tagName.toLowerCase() === "b") {
        const str = val.children[0].innerText;
        const str_o = str.replace(/(第)\s(\d*)\s(题)\s-\s\d.*/g, "$1$2$3");
        txt += (str_o + ": " + val.children[1].innerText + "\n");
      } else {
        console.log('no')
        txt += (val.children[0].innerText + "\n");
      }
    }
    for (const ele of val.children) {
      if (ele.tagName.toLowerCase() === "p") {
        txt += (ele.innerText + "\n");
      }
    }
    txt += "\n";
  }
  let content = txt.replace(/\* - .*/g, "").replace(/\s-\s\d.*(\n)/g, "$1");
  // 判断下载还是复制到剪贴板
  if (name === 'e') {
    // 下载文件
    const dl = document.createElement("a");
    dl.setAttribute("download", title_0);
    const blob = new Blob([content]);
    dl.setAttribute("href", URL.createObjectURL(blob));
    dl.style.display = "none";
    document.body.appendChild(dl);
    dl.click();
    document.body.removeChild(dl);
    resp("导出成功");
  } else {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(content);
    } else {
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        textarea.style.position = 'fixed';
        textarea.style.top = '10px';
        textarea.value = content;
        textarea.select();
        document.execCommand('copy', true);
        document.body.removeChild(textarea);
    }
    resp("已复制到剪贴板")
  }
})