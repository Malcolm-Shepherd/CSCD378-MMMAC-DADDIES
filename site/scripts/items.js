function stockHandler(data){
    if(data.status === "ok"){
        if(data.stock >= 0) {
            alert(`Thank you for adopting, ${data.stock} ${data.name} left.`);
        }
        else{
            alert("Out of stock.")
        }
    }
}

function postID(itemID){
    $.ajax({
            url: "http://localhost:8082/items",
            type: 'post',
            data: {itemID: itemID},
            crossDomain: true,
            success: function(data){
                stockHandler(data);
            }
        }
    );
}
if(getCookie("uid") !== "" ){
    document.addEventListener("DOMContentLoaded", function (){
        const submit1 = document.getElementById("item1Button");
        const submit2 = document.getElementById("item2Button");

        submit1.addEventListener("click", function(event){

            if(document.getElementById("item1Adopt").checked){
                postID("1");
            }
            else{
                alert("Wow.");
            }


            event.preventDefault();
        });
        submit2.addEventListener("click", function(event){

            if(document.getElementById("item2Adopt").checked){
                postID("2");
            }
            else{
                alert("Wow.");
            }


            event.preventDefault();
        });
    });
}
else{
    document.getElementById("item1Button").disabled = true;
    document.getElementById("item2Button").disabled = true;
    document.getElementById("item1Button").innerText = "Must Login";
    document.getElementById("item2Button").innerText = "Must Login";
}