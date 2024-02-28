let waste = [];
let allItems = [];
let delete_state = false;

function ownAlert(text) {
  document.getElementById("ownAlert").style.display = "flex";
  document.getElementById("window").style.opacity = "0.4";

  document.getElementById("month").setAttribute("disabled", "");
  document.getElementById("name").setAttribute("disabled", "");
  document.getElementById("price").setAttribute("disabled", "");
  document.getElementById("comment").setAttribute("disabled", "");
  document.getElementById("seeAll").setAttribute("disabled", "");
  document.getElementById("find").setAttribute("disabled", "");
  document.getElementById("add").setAttribute("disabled", "");
  document.getElementById("delete").setAttribute("disabled", "");

  document.getElementById("textAlert").innerHTML = text;
}

function closeAlert() {
  document.getElementById("ownAlert").style.display = "none";
  document.getElementById("window").style.opacity = "1.0";

  document.getElementById("month").removeAttribute("disabled");
  document.getElementById("name").removeAttribute("disabled");
  document.getElementById("price").removeAttribute("disabled");
  document.getElementById("comment").removeAttribute("disabled");
  document.getElementById("seeAll").removeAttribute("disabled");
  document.getElementById("find").removeAttribute("disabled");
  document.getElementById("add").removeAttribute("disabled");
  document.getElementById("delete").removeAttribute("disabled");
}

window.prompt = (message) => {
  $("#PromisePrompt .modal-body label").html(message);
  var PromisePrompt = $("#PromisePrompt")
    .modal({
      keyboard: false,
      backdrop: "static",
    })
    .modal("show");
  $("#PromisePromptInput").focus();
  let prmpt = null;
  $("#PromisePrompt .btn-success").on("click", (e) => {
    prmpt = $("#PromisePrompt .modal-body input").val();
  });
  $('p a[href="#"]').on("click", async (e) => {
    e.preventDefault();
    if (await prompt("Want to test the Prompt?")) {
      let prmpt = await prompt("Entered value:");
      if (prmpt) await alert(`entered: «${prmpt}»`);
      else await alert("Do not enter a value");
    } else await alert("Promise based alert sample");
  });
  return new Promise(function (resolve, reject) {
    PromisePrompt.on("hidden.bs.modal", (e) => {
      resolve(prmpt);
    });
  });
};

function seeAll() {
  if (waste != "") {
    item.innerHTML = allItems;
    let str = item.innerHTML.replaceAll(",", "");
    item.innerHTML = str;
    if (delete_state) {
      for (i of document.getElementsByClassName("items")) {
        i.style.background = "#f333";
        i.style.border = "2px dashed #f336";
      }
    } else {
      for (i of document.getElementsByClassName("items")) {
        i.style.background = null;
        i.style.border = null;
      }
    }
  } else ownAlert("oh! u didn't write any notes");
}

function find() {
  if (!waste.length == 0)
    document.getElementById("form").style.display = "flex";
  else ownAlert("no no no babe! u don't have any notes");
}

async function findChange() {
  let selectElem = document.getElementById("findBy");
  document.getElementById("promptSpan").innerHTML = selectElem.value;

  if (selectElem.value === "Name") {
    let o = waste.flat();
    var arr = [];
    await prompt("what item u looking for?", "item name");
    let promptValue = document.getElementById("PromisePromptInput").value;
    for (i in o) {
      let index = o.indexOf(o.find((o) => o.name == promptValue));
      if (index != -1) {
        arr.push(o[index - 1], o[index], o[index + 1], o[index + 2]);
        o.splice(index, 1);
        if (arr.length > o.length) arr.splice(waste.flat().length);
        item.innerHTML = JSON.stringify(arr)
          .replaceAll(/[.?*+^$[\](){}|]/g, "")
          .replaceAll(/"/g, "")
          .replaceAll("\\", "")
          .replaceAll(",", " ");
        document.getElementById("form").style.display = "none";
      }
    }
    if (o.indexOf(o.find((o) => o.name == promptValue)) === -1) {
      ownAlert("sorry, looks like there is no item name like that");
      document.getElementById("form").style.display = "none";
    }
  }

  if (selectElem.value === "Date") {
    let o = waste.flat();
    var arr = [];
    await prompt("what item u looking for?", "date yyyy-mm-dd");
    let promptValue = document.getElementById("PromisePromptInput").value;
    for (i in o) {
      let index = o.indexOf(o.find((o) => o.date == promptValue));
      if (index != -1) {
        arr.push(o[index], o[index + 1], o[index + 2], o[index + 3]);
        o.splice(index, 1);
        if (arr.length > o.length) arr.splice(waste.flat().length);
        item.innerHTML = JSON.stringify(arr)
          .replaceAll(/[.?*+^$[\](){}|]/g, "")
          .replaceAll(/"/g, "")
          .replaceAll("\\", "")
          .replaceAll(",", " ");
        document.getElementById("form").style.display = "none";
      }
    }
    if (o.indexOf(o.find((o) => o.date == promptValue)) === -1) {
      ownAlert("sorry, looks like there is no item date like that");
      document.getElementById("form").style.display = "none";
    }
  }

  if (selectElem.value === "Price") {
    let o = waste.flat();
    var arr = [];
    await prompt("what item u looking for?", "item price");
    let promptValue = document.getElementById("PromisePromptInput").value;
    for (i in o) {
      let index = o.indexOf(o.find((o) => o.price == promptValue));
      if (index != -1) {
        arr.push(o[index - 2], o[index - 1], o[index], o[index + 1]);
        o.splice(index, 1);
        if (arr.length > o.length) arr.splice(waste.flat().length);
        item.innerHTML = JSON.stringify(arr)
          .replaceAll(/[.?*+^$[\](){}|]/g, "")
          .replaceAll(/"/g, "")
          .replaceAll("\\", "")
          .replaceAll(",", " ");
        document.getElementById("form").style.display = "none";
      }
    }
    if (o.indexOf(o.find((o) => o.price == promptValue)) === -1) {
      ownAlert("sorry, looks like there is no item name like that");
      document.getElementById("form").style.display = "none";
    }
  }
}

function addArea() {
  let item = document.getElementById("item");
  let date = document.getElementById("month").value;
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let comment = document.getElementById("comment").value;

  let newItem = "";
  let newPrice = "";
  let newComment = "";

  if (document.getElementById("month").value != "") {
    if (name.length != 0 && price.length != 0) {
      newItem +=
        '<div id="areaName" class="inputAreas">' + "Item: " + name + "</div>";
      newPrice +=
        '<div id="areaPrice" class="inputAreas">' +
        "Price: " +
        price +
        "</div>";
      if (comment.length != 0) {
        newComment +=
          '<div id="areaComment" class="inputAreas">' +
          "Comment: " +
          comment +
          "</div>";
      } else comment.innerHTML = "";
    } else
      ownAlert(
        "oh no! looks like u doesn't fill one of the entry fields. PLZ do that and try again. TNX BYEEE"
      );

    item.innerHTML = newItem + newPrice + newComment;
    waste.push([{ date }, { name }, { price }, { comment }]);

    BuildFromWaste();
  } else
    ownAlert(
      "no way!! u doesn't fill date field. PLZ do that and try again. TNX BYEEE"
    );
}

function BuildFromWaste() {
  allItems = [];
  for (i in waste) {
    let str = JSON.stringify(waste[i].flat())
      .replaceAll(/[.?*+^$[\](){}|]/g, "")
      .replaceAll(/"/g, "")
      .replaceAll("\\", "")
      .replaceAll(",", " ");
    let item =
      '<button onclick="DeleteComment(this)" data-num="' +
      i +
      '" id="items' +
      i +
      '" class="items">' +
      str +
      "</button>";
    allItems.push(item);
  }
}

function Delete() {
  if (waste != "") {
    delete_state = delete_state ? false : true;
    seeAll();
  } else ownAlert("there is nothing to delete...");
}

function DeleteComment(el) {
  if (delete_state) {
    let id = el.getAttribute("data-num");
    waste.splice(id, 1);
    BuildFromWaste();
    seeAll();
  }
}

function openSecWin() {
  document.getElementById("window").style.display = "none";
  document.getElementById("secWindow").style.display = "flex";
}
