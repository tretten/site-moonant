var current_song = null;
function myWrite(msg){
    if (current_song != msg){
        var heart = '<span class="likebtn-wrapper" data-white_label="true" data-popup_disabled="true" data-theme="custom" data-btn_size="16" data-icon_size="16" data-icon_l_c_v="#00a8ab" data-icon_d_c_v="#c7254e" data-bg_c="rgba(0,0,0,0)" data-brdr_c="rgba(0,0,0,0)" data-label_fs="r" data-lang="ru" data-identifier="' + msg + '" data-show_like_label="false" data-dislike_enabled="true" data-counter_show="false" data-popup_width="200" data-share_size="large" data-item_url="http://moon-ant.com" data-lazy_load="true" data-site_id="56b419bba4c688a213b13d5b"></span>';
        $('#nowplay').html(heart + '<strong>'+msg+'</strong>')
        $('#nowplay-share').html('<h6 class="title is-6">Найти песню:</h6><a class="button is-small" href="http://vk.com/audio?q=' + msg + '" target="_blank">VK</a> <a class="button is-small" href="https://www.youtube.com/results?search_query='+msg+'" target="_blank">Youtube</a>')
        if (typeof LikeBtn != 'undefined'){
            LikeBtn.initWrappers();
            LikeBtn.loadBunch();
        }
        // console.log(msg);
        current_song = msg;
    }
 }

document.write   = myWrite;

function reload_js(id, src, on_load){
    $('#' + id).remove();
    var head     = document.getElementsByTagName('head')[0];
    var script   = document.createElement('script');
    script.type  = 'text/javascript';
    script.src   = src;
    script.id    = id
    script.async = 1;
    if (on_load){
        script.onload = on_load
    }
    head.appendChild(script);
}

(function load_song(){
        reload_js('song_js', 'http://scripts.myradiostream.com/s25/12650/song.js');
        window.setTimeout(load_song, 2000);
})

();

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
