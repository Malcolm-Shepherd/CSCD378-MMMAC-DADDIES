let $slideshow = $(".cycle-slideshow");
let $workingTogether =$(".together");

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