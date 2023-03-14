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

$(document).ready(function() {
    const $slideshow = $(".cycle-slideshow");
    const $workingTogether = $(".together");
    const $joinOrDonate = $("#joinOrDonate");

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

    if (getCookie("uid") !== "") {
        console.log("Hello, world!");
        $(".button").text("Donate");
        $(".button").attr("href", "http://localhost:8080/html/donate.html");
    }
});
