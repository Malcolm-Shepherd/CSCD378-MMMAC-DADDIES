let $slideshow = $(".cycle-slideshow");

$slideshow.click(function() {
    if ($slideshow.is(".cycle-paused"))
        $slideshow.cycle("resume");
    else
        $slideshow.cycle("pause");
});