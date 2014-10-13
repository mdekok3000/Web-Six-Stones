var stoneCount = 1;
var hasNeutral = 0;

$(document).ready(function() {

    //ON RESIZE OF WINDOW
    $(window).resize(function() {

        if($(window).width() > 480)
        {
            //GET NEW HEIGHT
            var currHeight = $(window).height();    
            //RESIZE BOTH ELEMENTS TO NEW HEIGHT
            $('#sidebar, #content').css('height', currHeight);
            $('#sidebar ul li.header[role=number_of_stones]').html('Stones');
            $('#sidebar ul li.form[role=neutral] span').html('Neutral');
        }
        else
        {
            $('#sidebar, #content').css('height', 'auto');
            $('#sidebar ul li.header[role=number_of_stones]').html('Number of Stones to Pull');
            $('#sidebar ul li.form[role=neutral] span').html('Pull Neutral Stone');                         
        }

    }).resize();
    
    $('#sidebar ul li.form[role=neutral]').click(function() {
        $(this).children('#neutral').click();
    });
    
    $('#sidebar ul li.form[role=neutral] #neutral').click(function() {
        event.stopPropagation();
    });
    
    if(stoneCount == 1)
    {
        $('#pullLead').hide();
        $('#pullStones').css('width', '100%');
    }
    else
    {
        $('#pullStones').css('width', '50%');
        $('#pullLead').show();
    }
    
});

function setStoneCount(numStones) {
    $('.setstone').removeClass('active');
    $('#setstone'+numStones).addClass('active');
    
    stoneCount = numStones;
    
    if(stoneCount == 1)
    {
        $('#pullLead').hide();
        $('#pullStones').css('width', '100%');
    }
    else
    {
        $('#pullStones').css('width', '50%');
        $('#pullLead').show();
    }
}

function pullStones(pullLead) {
    var colorArr = new Array("White", "Blue", "Black", "Red", "Green", "Clear");
    
    $('.stoneset').hide();
    $('img.stone').hide();
    
    for(var i in colorArr)
    {
        $('img.stone').removeClass(colorArr[i]+'Stone');
    }
    
    if($('input#neutral').prop('checked'))
    {
        var colors = shuffle(colorArr);
        $('img.stone[role=neutral]').addClass(colors[0]+'Stone').show();
        $('.stoneset[role=neutral]').show();
    }
    
    var colors = shuffle(colorArr);
    var rColors = colors.splice(0, stoneCount);
    
    for(var i in rColors)
    {
        if(i == 0 && pullLead)
        {
            $('img.stone[role=lead]').addClass(rColors[i]+'Stone').show();
            continue;
        }
        
        $('img.stone[role=stone'+eval(i+"+"+1)+']').addClass(rColors[i]+'Stone').show();
    }
    
    if(pullLead) $('.stoneset[role=lead]').show();
    $('.stoneset[role=pulls]').show();             
}