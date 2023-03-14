function updateHandler(data) {
    if (data.status === "ok") {
        alert(`Updated ${data.name}'s stock from ${data.oldStock} to ${data.stock}.`);
    }

}
function updateStock(itemId, stock){

    $.ajax({
            url: "http://localhost:8082/adminitems",
            type: 'post',
            data: {itemID: itemId,
                stock: stock},
            crossDomain: true,
            success: function(data){
                updateHandler(data);
            }
        }
    );
}

if(getCookie("uid") === "1"){
    document.getElementById("admin1").hidden = false;
    document.getElementById("admin2").hidden = false;

    document.addEventListener("DOMContentLoaded", function (){
        const admin1 = document.getElementById("admin1Button");
        const stock1 = document.getElementById("stock1");
        const admin2 = document.getElementById("admin2Button");
        const stock2 = document.getElementById("stock2");
        let stockREfalse = (/^[0-9]*$/);

        admin1.addEventListener("click", function(event){
            if (!(stockREfalse.test(stock1.value)) === false){
                updateStock("1", stock1.value);
            }

            event.preventDefault();
        });
        admin2.addEventListener("click", function(event){
            if (!(stockREfalse.test(stock2.value)) === false){
                updateStock("2", stock2.value);
            }

            event.preventDefault();
        });
    });
}