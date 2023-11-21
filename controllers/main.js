let getValue= ()=>{
  let promise = axios({
    method: "GET",
    url: "../data/Data.json",
    responseType: "json",
  });
  promise
    .then((result) => {
      let valueChoose = "";
      let navPills = result.data.navPills;
      let tabPanes = result.data.tabPanes;
      // render thanh nav
      editType(navPills);
      renderNav(navPills);
      // render trang đầu tiên
      editType(tabPanes);
      let tabClothes = tabPanes.filter((x) => x.type === "bikinitop");
      renderPill(tabClothes);
      // Khi click vào nav thì render các phần tử tương ứng
      let btnChoose = document.querySelectorAll(".btn");
      console.log(btnChoose);
      for (const item of btnChoose) {
        item.onclick = () => {
          valueChoose = item.value;
          let tab = tabPanes.filter((item) => item.type === valueChoose);
          renderPill(tab);
        };
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
getValue();

let editType = (arr) => {
  for (const item of arr) {
    if (item.type == "topclothes") {
      item.type = "bikinitop";
    } else if (item.type == "botclothes") {
      item.type = "bikinibottom";
    } else if (item.type == "shoes") {
      item.type = "feet";
    } else if (item.type == "handbags") {
      item.type = "handbag";
    } else if (item.type == "necklaces") {
      item.type = "necklace";
    }
  }
};
let renderNav = (arr) => {
  let content = ``;
  for (const item of arr) {
    content += `<li><button class="btn" value="${item.type}">${item.showName}</button></li>`;
  }
  document.querySelector(".nav-pills").innerHTML = content;
};

let renderPill = (arr) => {
  let content = "";
  for (const item of arr) {
    content += `
            <div class= "col-3 item">
                <img src="${item.imgSrc_jpg}" alt="">
                <p>${item.name}</p>
                <button id="btnThuDo" name="${item.type}" value ="${item.imgSrc_png}" onclick="editImage()">Thử đồ</button>
            </div>
        `;
  }
  document.querySelector(".tab-content").innerHTML = content;
};
let editImage = ()=> {
  let arrBtn = document.querySelectorAll("#btnThuDo");
  for (const item of arrBtn) {
    item.onclick = function () {
      let name = "." + item.name;
      document.querySelector(name).style.backgroundImage = `url(${item.value})`;
    };
  }
}