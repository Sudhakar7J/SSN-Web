document.getElementById("logins").addEventListener('click',function () {
    alert("Hello");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        alert(user.getEmail());
    }).catch(function(error) {
        var email = error.email;
    });

    /*firebase.auth().signOut().then(function() {
      alert("Signout")
    });*/

    var db = firebase.firestore();

    //Add data
    db.collection("cities").doc("SF").set(
      {
          name: "San Francisco",
          state: "CA",
          country: "USA",
          capital: false,
          population: 860000,
          regions: ["west_coast", "norcal"]
      }
    );

    //Get all bus number
    //Search by Place name
    /*db.collection("bus_route").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var d = doc.data();
            for (var i = 0; i < d.stop.length; i++) {
                if(d.stop[i].place == "Thirumangalam")
                    alert(doc.id);
            }
        });
    });*/

    //Search by Route no
    /*db.collection("bus_route").doc("9").get().then(function(doc) {
        var d = doc.data();
        for (var i = 0; i < d.stop.length; i++) {
                alert(d.stop[i].place);
                alert(d.stop[i].time);
        }
    });*/
});

$(function () {

    // init feather icons
    feather.replace();

    // init tooltip & popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    //page scroll
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000);
        event.preventDefault();
    });

    //toggle scroll menu
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //adjust menu background
        if (scroll >= 100) {
            $('.sticky-navigation').removeClass('navbar-dark').addClass('navbar-light').addClass('bg-white').addClass('shadow-bottom');
            $('.btn-navbar').removeClass('btn-outline-secondary').addClass('btn-primary');
        } else {
            $('.sticky-navigation').removeClass('navbar-light').removeClass('bg-white').addClass('navbar-dark').removeClass('shadow-bottom');
            $('.btn-navbar').removeClass('btn-primary').addClass('btn-outline-secondary');
        }

        // adjust scroll to top
        if (scroll >= 600) {
            $('.scroll-top').addClass('active');
        } else {
            $('.scroll-top').removeClass('active');
        }
        return false;
    });

    // slick slider
    $('.slick-reviews').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        arrows: false
    });

    // scroll top top
    $('.scroll-top').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000);
    });

    /**Theme switcher - DEMO PURPOSE ONLY */
    $('.switcher-trigger').click(function () {
        $('.switcher-wrap').toggleClass('active');
    });
    $('.color-switcher ul li').click(function () {
        var color = $(this).attr('data-color');
        $('#theme-color').attr("href", "css/" + color + ".css");
        $('.color-switcher ul li').removeClass('active');
        $(this).addClass('active');
    });
});

//odemeter random count for videos
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}