function getCookie(cname) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
if (getCookie("uid") !== "") {
    // TODO remove li innerHTML and replace with, "You must be logged in to adopt"
    }





// const formList = document.querySelector('#macItemList');
// const addFormBtn = document.querySelector('#adminAddItem');
//
// addFormBtn.addEventListener('click', function() {
//     const newForm = document.createElement('li');
//     newForm.innerHTML = '<form id="newItemForm">\n' +
//         '                        <img src="../images/TempLogo.png" alt="New Mac Item"><br>\n' +
//         '                        <input type="radio" id="item2AdoptNewLeave" name="NewAdoptableItem" value="leaveNewItem" checked>\n' +
//         '                        <label for="item2AdoptNewLeave">Leave Behind</label><br>\n' +
//         '                        <input type="radio" id="item2AdoptNew" name="AdoptableItemNew" value="adoptNewItem">\n' +
//         '                        <label for="item2AdoptNew">Adopt</label><br>\  n' +
//         '                        <button type="submit">Submit</button>\n' +
//         '                    </form>';
//     formList.appendChild(newForm);
// });
// function addForm() {
//     var newForm = document.createElement("form");t
//     var listItem = document.createElement("li");
//
//     listItem.appendChild(newForm);
//     var formList = document.getElementById("formList");
//     formList.appendChild(listItem);
// }