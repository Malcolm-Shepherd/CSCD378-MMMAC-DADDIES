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

const $slideshow = $(".cycle-slideshow");
const $workingTogether = $(".together");
$slideshow.ready(function() {
    if ($slideshow.is(".cycle-paused"))
        $slideshow.cycle("resume");
    else
        $slideshow.cycle("pause");
});

$workingTogether.ready(function() {
    $("#together").fadeIn(3000);
    $("#workingTogether").fadeIn(4500);
    $(".button").fadeIn(5500);
});

$(document).ready(function() {
    const $joinOrDonate = $("#joinOrDonate");
    if (getCookie("uid") !== "") {
        const username = getCookie("username");
        $(".button").text("Donate");
        $("#together").text(`Welcome Back, ${username}!`);
        $(".button").attr("href", "http://localhost:8080/html/donate.html");
    }

});
