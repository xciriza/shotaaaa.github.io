var networkIssuesInformed = false;

function checkStatus(){
  var status = document.getElementById("status");
  sendCommand("", "ping").then(res => {
    if (res.code == 200) {
      status.classList.add("ready");
      status.classList.remove("error");
      document.getElementById("statusText").innerText = "真常，比顶真还真";
      networkIssuesInformed = false;
    } else {
      throw new Error("");
    }
  }).catch(err => {
    status.classList.add("error");
    status.classList.remove("ready");
    document.getElementById("statusText").innerText = "寄了，没有用的";
    if (!networkIssuesInformed) {
      message("你的链接失效了，快滚去重新输入/mojo。", "fail");
      networkIssuesInformed = true;
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebarItems = document.querySelector("#sidebar").children;

  for (const item of sidebarItems) {
    item.onclick = (e) => switchPage(e.target.dataset.value)
  }
  checkStatus();
  setInterval(() => { // check console status
    checkStatus();
  }, 30 * 1000 );
  // adjust frame height
  setTimeout(() => {
    var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    var content = document.getElementById("content");
    var height1 = height - content.getBoundingClientRect().y - 30;
    content.style.height = height1 + "px";
    var area = document.getElementById("right");
    area.style.height = height - area.getBoundingClientRect().y + "px";
    message("欢迎使用，MOJO原作者是个炒鸡炒鸡厉害的人哦！.");
  },10); // delay height modification to avoid issues
  })
