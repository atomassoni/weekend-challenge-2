var currentIndex = 0;
var people = [];
var timerNext = setInterval(nextPerson, 10000);

$(document).ready(function() {



    getData();

    //if a box is clicked, the current index is set to that box, the person is displayed
    $('#ajax-data').on('click', '.person-box', thisPerson);
    //previous and next move the highlighted box forward or back and display a new peson
    $('#prev').on('click', prevPerson);
    $('#next').on('click', nextPerson);

});

    function getData() {
        $.ajax({
            type: "GET",
            url: "/data",
            success: function(data) {
                console.log('ajazzz');
                people = data.mu;
                initialize();

            }

        });
    }

    function initialize() {

        console.log("initialized", people);
        $.each(people, function(i, person) {
            $('#ajax-data').append('<div class="person-box"></div>');
            var $el = $('#ajax-data').children().last();
            person.ind = i;
            $el.data(person);

        });

        //makes sure the first box is selected and displayed
        selectBox(currentIndex);
    }

    function thisPerson() {

        var person = $(this).data();
        currentIndex = person.ind;

        selectBox(currentIndex);

        clearInterval(timerNext);
        timerNext = setInterval(nextPerson, 10000);

    }

    //goes to the next person's box, also, sets auto timer to traverse boxes
    function nextPerson() {

        if (currentIndex != people.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        selectBox(currentIndex);

        clearInterval(timerNext);
        timerNext = setInterval(nextPerson, 10000);
    }

    //goes to the previous person's box, also, sets auto timer to traverse boxes in reverse
    function prevPerson() {

        if (currentIndex != 0) {
            currentIndex--;
        } else {
            currentIndex = people.length - 1;
        }

        selectBox(currentIndex);

        clearInterval(timerNext);
        timerNext = setInterval(prevPerson, 10000);

    }

    //turns person's box a color, and displays their shoutout info, fades prev person out first then next person in
    function selectBox(index) {

        unselectBox();

        $("#person-info").fadeOut(1000, function() {
            $('#name').text(people[index].name);
            $('#git-username').empty();
            $('#git-username').append('<a href="https://github.com/' + people[index].git_username + '">' + people[index].git_username + '</a>');
            $('#shoutout').text(people[index].shoutout);
            $("#person-info").fadeIn(1000);
        });

        $('.person-box').eq(index).addClass('red');

    }

    //unselects all highlighting on the boxes
    function unselectBox() {

        $('.person-box').removeClass('red');

    }
