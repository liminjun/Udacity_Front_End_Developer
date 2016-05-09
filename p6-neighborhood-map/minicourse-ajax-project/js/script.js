
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + ',' + cityStr;

    $greeting.text('So,you want to live at ' + address + '?');

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    var $bgImg = $("<img class='bgimg' src='" + streetviewUrl + "' alt='street'>")
    $body.append($bgImg);





    // Built by LucyBot. www.lucybot.com
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "b0572ce758374e61a8f9d1648e250d06",
        'q': cityStr
    });

    $.getJSON(url, function (result) {
        if (result.status == "OK") {
            for (var i = 0; i < result.response.docs.length; i++) {
                var article = result.response.docs[i];
                $nytElem.append('<li class="article">'
                    + '<a href="' + article.web_url + '">' + article.headLine.main + '</a>'
                    + '<p>' + article.snippet + '</p>'
                    + '</li>');

            }
        }
    }).error(function(e){
        $nytHeaderElem.text("New York Times Articles Could not Be Loaded");
    });
    
    var wikiUrl="http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+cityStr+"&callback=wikiCallback";
    $.ajax({
        url:wikiUrl,
        dataType:"jsonp",
        success:function(response){
            var articleList=response[1];
            for(var i=0;i<articleList.length;i++){
                articleStr=articleList[i];
                var url='http://en.wikipedia.org/wiki/'+articleStr;
                
                $wikiElem.append('<li><a href="'+url+'" target="_blank">'+articleStr+'</a></li>');
            }
        }
    });

    return false;
};

$('#form-container').submit(loadData);
