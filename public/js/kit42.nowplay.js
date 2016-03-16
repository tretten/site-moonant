function load_js(id, url){
    if (old_element = document.getElementById(id))
        old_element.parentNode.removeChild(old_element);

    a = document.createElement('script');
    m = document.getElementsByTagName('script')[0];
    a.async = 1;
    a.id = id;
    a.src = url;
    m.parentNode.insertBefore(a, m);
}

function init_buttons(){
    load_js("likebtn_wjs", "//w.likebtn.com/js/w/widget.js");
    load_js("yastatic_es5", "//yastatic.net/es5-shims/0.0.2/es5-shims.min.js");
    load_js("yastatic_share", "//yastatic.net/share2/share.js");
}

// window.onpopstate = function(e){
//     if(e.state){
//         console.log(e);
//     }
//     return false;
// };


function load_page(href){
    $.ajax({
        url: href,
        type: 'GET',
        data: {history: 'Y'},
        success: function (html) {
            var player_content = $('#player').html();
            var main_content = html.split('<!-- MAIN CONTENT START -->')[1].split('<!-- MAIN CONTENT END -->')[0];
            $('#main_content')[0].innerHTML = main_content;
            $('#player').html(player_content);

            var disqus_config = function(){};
            (function() {
                var d = document, s = d.createElement('script');
                s.src = '//moon-ant.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            })();

            init_buttons();
            LikeBtn.initWrappers();
            LikeBtn.loadBunch();
        }
    })
}

$(document).ready(function(){
    // Вызов плеера
    $.kast({
        colors: 'dynamic',
        container: '#player',
        onPlay: function(){
            $('.play').hide();
            $('.pause').show();
        },
        onPause: function(){
            $('.play').show();
            $('.pause').hide();
        },
        onCurrentInfo: function(track, artist){
            var msg = artist + ' - ' + track;
            var heart = '<span class="likebtn-wrapper" data-white_label="true" data-popup_disabled="true" data-theme="custom" data-btn_size="16" data-icon_size="16" data-icon_l_c_v="#00a8ab" data-icon_d_c_v="#c7254e" data-bg_c="rgba(0,0,0,0)" data-brdr_c="rgba(0,0,0,0)" data-label_fs="r" data-lang="ru" data-identifier="' + msg + '" data-show_like_label="false" data-dislike_enabled="true" data-counter_show="false" data-popup_width="200" data-share_size="large" data-item_url="http://moon-ant.com" data-lazy_load="true" data-site_id="56b419bba4c688a213b13d5b"></span>';

            $('#nowplay').html(heart + '<strong>' + msg + '</strong>')
            $('#nowplay-share').html('<h6 class="title is-6">Найти песню:</h6><a class="button is-small" href="http://vk.com/audio?q=' + msg + '" target="_blank">VK</a> <a class="button is-small" href="https://www.youtube.com/results?search_query='+msg+'" target="_blank">Youtube</a>')
            if (typeof LikeBtn != 'undefined'){
                LikeBtn.initWrappers();
                LikeBtn.loadBunch();
            }
        }
    })

    $(document).on('click', '.play', function() { $.kast('play'); return false; } );
    $(document).on('click', '.pause', function() { $.kast('pause'); return false; } );

    $(document).on('click', 'a', function(){
        var href = $(this).attr('href');

        if (href == '#') return true;

        window.history.pushState(null, null, href);
        load_page(href)
        return false;
    });
    init_buttons();
});
