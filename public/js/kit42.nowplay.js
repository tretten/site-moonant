
function update_song_info(track, artist){
    var msg = artist + ' - ' + track;
    var heart = '<span class="likebtn-wrapper" data-white_label="true" data-popup_disabled="true" data-theme="custom" data-btn_size="16" data-icon_size="16" data-icon_l_c_v="#00a8ab" data-icon_d_c_v="#c7254e" data-bg_c="rgba(0,0,0,0)" data-brdr_c="rgba(0,0,0,0)" data-label_fs="r" data-lang="ru" data-identifier="' + msg + '" data-show_like_label="false" data-dislike_enabled="true" data-counter_show="false" data-popup_width="200" data-share_size="large" data-item_url="http://moon-ant.com" data-lazy_load="true" data-site_id="56b419bba4c688a213b13d5b"></span>';

    $('#nowplay').html(heart + '<strong>'+msg+'</strong>')
    $('#nowplay-share').html('<h6 class="title is-6">Найти песню:</h6><a class="button is-small" href="http://vk.com/audio?q=' + msg + '" target="_blank">VK</a> <a class="button is-small" href="https://www.youtube.com/results?search_query='+msg+'" target="_blank">Youtube</a>')
    if (typeof LikeBtn != 'undefined'){
        LikeBtn.initWrappers();
        LikeBtn.loadBunch();
    }
}

(function(d,e,s){if(d.getElementById("likebtn_wjs"))return;a=d.createElement(e);m=d.getElementsByTagName(e)[0];a.async=1;a.id="likebtn_wjs";a.src=s;m.parentNode.insertBefore(a, m)})(document,"script","//w.likebtn.com/js/w/widget.js");

function toggle() {
    var ele = document.getElementById("toggleText");
    var text = document.getElementById("displayText");
    if(ele.style.display == "block") {
        ele.style.display = "none";
        text.innerHTML = "Обсудить..";
    } else {
        ele.style.display = "block";
        text.innerHTML = "Закрыть обсуждение";
    }
}

// window.onpopstate = function(e){
//     if(e.state){
//         console.log(e);
//     }
//     return false;
// };


function catch_anchors(){
    $('body').on('click', 'a', function(){
        var href = $(this).attr('href');
        if (href == '#') return true;
        window.history.pushState(null, null, href);
        load_page(href)
        return false;
    })
}

function load_page(href){
    $.ajax({
        url: href,
        type: 'GET',
        data: {history: 'Y'},
        success: function (html) {
            // var body = html.split('<body>')[1].split('</body>')[0];
            // console.log(body);
            // $('body')[0].innerHTML = body;
            $('html')[0].innerHTML = html;
            catch_anchors();
            current_song = null;
            load_song();
        }
    })
}

$(document).ready(function(){
    // catch_anchors();
});
