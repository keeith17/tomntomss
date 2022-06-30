(($)=>{
    
    class Toms {

        init(){
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.top();
            this.footer();
            // console.log('section3.offset().top', $('#section3').offset().top);
            // console.log('section4.offset().top', $('#section4').offset().top);
            // console.log('section5.offset().top', $('#section5').offset().top);
            // console.log('section6.offset().top', $('#section6').offset().top);
        }

        header(){
            // 내비게이션
            $('.main-btn').on({
                mouseenter: function(){
                    $('.sub').fadeOut(0);
                    $(this).next().fadeIn(300);
                }
            });
            $('#nav').on({
                mouseleave: function(){
                    $('.sub').fadeOut(300);
                }
            });

            //모바일 서브메뉴 슬라이드다운
            $('.m-main-btn').on({
                click: function(){
                    if($(this).hasClass('on')===false){
                        $('.m-sub').slideUp(300);
                        $('.m-main-btn').removeClass('on');
                        $(this).addClass('on');
                        $(this).next().slideDown(300);    
                    }
                    else {
                        $('.m-sub').slideUp(300);
                        $('.m-main-btn').removeClass('on');
                    }
                }
            });
            // $('').on({
            //     click: function(){
            //         $('.m-sub').slideUp(300);
            //         $('.m-main-btn').removeClass('on');
            //     }
            // });

            //모바일 햄버거버튼 누를때
            $('.mobile-btn').on({
                click: function(){
                    $('#nav-mobile').fadeIn(300);
                    $('.nav-mobile-gap ul').animate({left:0}, 300);
                }
            });
            $('.close-btn').on({
                click: function(){
                    $('.nav-mobile-gap ul').animate({left:-325}, 300);
                    $('#nav-mobile').fadeOut(300);
                }
            });
            //켜둔상태로 창 키울때
            let winW = $(window).width();
            $(window).resize(function(){
                winW = $(window).width();
                if(winW>1050){
                $('#nav-mobile').fadeOut(0);
                return winW;
                }
            });

            //캠페인 닫기
            $('.camp-close-btn').on({
                click: function(){
                    $(this).hide();
                }
            });


            //스크롤이벤트
            let result = null;
            let newscroll = null;
            let oldscroll = newscroll;

            $(window).scroll(function(){
                //console.log( $(window).scrollTop() );
                if($(window).width()>1050){
                    newscroll = $(window).scrollTop();
                    result = newscroll - oldscroll > 0 ? 'DOWN' : 'UP';
                    //console.log(result);
                    if(result === 'DOWN'){
                        if($(window).scrollTop() > 150){
                            $('#header').addClass('h120');
                        }
                    }
                    if(result === 'UP'){
                        $('#header').addClass('h120');
                    }
                    if($(window).scrollTop() < 150){
                        $('#header').removeClass('h120');
                    }
                    oldscroll = newscroll;
                }
            });

        }

        section1(){

            //반응형 너비 변수
            let winW = $(window).width();

            $(window).resize(function(){
                winW = $(window).width();
                // $('#section1 .slide-wrap').stop().animate({width:winW},0);
                //console.log(winW);
                return winW;
            });
            
            let cnt=0;
            let cnt2=0;
            let setId = 0;
            let setId2 = 0;
            //메인슬라이드
            function mainSlide(){
                $('#section1 .slide').css({zIndex:1}).animate({opacity:1},0);
                $('#section1 .slide').eq(cnt).css({zIndex:2});
                $('#section1 .slide').eq(cnt-1).css({zIndex:3}).animate({opacity:0},1000);

                $('.sec1-btn').removeClass('on');
                $('.sec1-btn').eq(cnt).addClass('on');
                $("#section1 .num").text(`${cnt+1}`);
            }
            function mainSlideP(){
                $('#section1 .slide').css({zIndex:1}).animate({opacity:1},0);
                $('#section1 .slide').eq(cnt).css({zIndex:2});
                $('#section1 .slide').eq(cnt<4?cnt+1:0).css({zIndex:3}).animate({opacity:0},1000);

                $('.sec1-btn').removeClass('on');
                $('.sec1-btn').eq(cnt).addClass('on');
                $("#section1 .num").text(`${cnt+1}`);
            }
            //다음카운트
            function nextCount(){
                cnt++;
                cnt>4?cnt=0:cnt;
                mainSlide();
            }
            function prevCount(){
                cnt--;
                cnt<0?cnt=4:cnt;
                mainSlideP();
            }
            //자동타이머
            function autoTimer(){
                setId = setInterval(nextCount,3000);
            }
            autoTimer();


            $('.sec1-btn').each(function(idx){  //page-btn의 각각은 idx를 가지고 있음
                $(this).click(function(e){ //'이' page-btn을 클릭할 때면 기능을 수행하는데
                    e.preventDefault();
                    clearInterval(setId);  //1 인터벌 제거
                    clearInterval(setId2);
                    cnt=idx                 //2 idx로 cnt를 세팅
                    mainSlide();         //3 메인 슬라이드 실행
                    pause();
                });
            
            });

            function pause(){
                clearInterval(setId);
                clearInterval(setId2);
                $('#section1 .pause-btn').prop('class','fa fa-play play-btn');
                cnt2=0;
                setId2 = setInterval(function(){
                    cnt2++;
                    console.log(cnt2);
                    if(cnt2>5){
                        clearInterval(setId);
                        clearInterval(setId2);
                        nextCount();
                        autoTimer();
                        play();
                    }
                },1000);        
            }
            function play(){
                $('#section1 .play-btn').prop('class','fa fa-pause pause-btn');
                clearInterval(setId2);
            }

            $('#section1 .pause-btn').click(function(){
                if($('#section1 .pause-btn').hasClass('fa-pause')){
                    clearInterval(setId);
                    pause();
                }
                else{
                    nextCount();
                    autoTimer();
                    play();
                }
            });

            let touchStart  = null;
            let touchEnd = null;
            let result = null;
            let mouseDown = false;

            $('#section1 .slide-wrap').on({
                mousedown: function(e){
                    pause();
                    touchStart = e.clientX;
                    mouseDown = true;
                },
                mouseup: function(e){
                    touchEnd = e.clientX;
                    result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(result==='NEXT'){
                        if( !$('#section1 .slide-wrap').is(':animated')){
                        nextCount();
                        }
                    }
                    if(result==='PREV'){
                        if( !$('#section1 .slide-wrap').is(':animated')){
                        prevCount();
                        }
                    }
                    mouseDown = false;
                },
                mouseleave: function(e){
                    if(!mouseDown){
                        return;
                    }
                    touchEnd = e.clientX;
                    result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(result==='NEXT'){
                        nextCount();
                    }
                    if(result==='PREV'){
                        prevCount();
                    }
                    mouseDown = false;

                }
            });
        }
        section2(){
            let cnt = 0;
            let slideW = $('#section3 .slide-wrap').width();

            function mainSlide() {
                slideW = $('#section2 .slide-wrap').width();
                if(slideW>750){
                    $('#section2 .slide-wrap').stop().animate({top:-70*cnt},600, function(){
                        cnt>2?cnt=0:cnt;
                        console.log(cnt);
                        $('#section2 .slide-wrap').stop().animate({top:-70*cnt},0);
                    });    
                }
                else{
                    $('#section2 .slide-wrap').stop().animate({top:-70*cnt},600, function(){
                        cnt>7?cnt=2:cnt;
                        console.log(cnt);
                        $('#section2 .slide-wrap').stop().animate({top:-70*cnt},0);
                    });    
                }
            }

            function nextCount() {
                cnt++;
                mainSlide();
            }

            function autoTimer() {
                setInterval(nextCount,3500);
            }

            autoTimer();
        }
        section3(){

            let cnt=0;
            let cnt2=0;
            let setId = 0;
            let setId2 = 0;
            let slideW = $('#section3 .slide-view').width();
            let winW = $(window).width();

            let touchStart  = null;
            let touchEnd = null;
            let result = null;

            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false;
            //메인슬라이드
            function mainSlide(){
                winW = $(window).width();
                slideW = $('#section3 .slide-view').width();
                if(winW>770) {
                    $('#section3 .slide-wrap').stop().animate({left:-slideW/3*cnt},600, function(){
                        cnt>8?cnt=1:cnt;
                        cnt<0?cnt=8:cnt;
                        $('#section3 .slide-wrap').animate({left:-slideW/3*cnt},0);
                    });
                }
                else {
                    $('#section3 .slide-wrap').stop().animate({left:-slideW*cnt},600, function(){
                        cnt>9?cnt=2:cnt;
                        cnt<0?cnt=8:cnt;
                        $('#section3 .slide-wrap').animate({left:-slideW*cnt},0);
                    });
                }
                $('.sec3-btn').removeClass('on');
                $('.sec3-btn').eq(cnt>8?cnt=0:cnt).addClass('on');
            }
            //다음카운트
            function nextCount(){
                cnt++;
                //console.log('cnt', cnt);
                $("#section3 .num").text(cnt>8?1:cnt+1);
                mainSlide();
            }
            function prevCount(){
                cnt--;
                $("#section3 .num").text(cnt<0?9:cnt+1);
                mainSlide();
            }
            //자동타이머
            function autoTimer(){
                setId = setInterval(nextCount,3000);
            }
            autoTimer();

            //리사이즈

            $(window).resize(function(){
                winW = $(window).width();
                slideW = $('#section3 .slide-view').width();
                if(winW>770){
                    $('#section3 .slide-wrap').stop().animate({left:-slideW/3*cnt},300);
                    //console.log(winW);
                    return slideW;
                }
                else{
                    $('#section3 .slide-wrap').stop().animate({left:-slideW*cnt},300);
                    //console.log(winW);
                    return slideW;
                }
            });            



            $('.sec3-btn').each(function(idx){  //page-btn의 각각은 idx를 가지고 있음
                $(this).click(function(e){ //'이' page-btn을 클릭할 때면 기능을 수행하는데
                    e.preventDefault();
                    clearInterval(setId);  //1 인터벌 제거
                    clearInterval(setId2);
                    cnt=idx                 //2 idx로 cnt를 세팅
                    $("#section3 .num").text(cnt+1);
                    mainSlide();         //3 메인 슬라이드 실행
                    pause();
                });
            
            });

            function pause(){
                clearInterval(setId);
                clearInterval(setId2);
                $('#section3 .pause-btn').prop('class','fa fa-play play-btn');
                cnt2=0;
                setId2 = setInterval(function(){
                    cnt2++;
                    console.log(cnt2);
                    if(cnt2>5){
                        clearInterval(setId);
                        clearInterval(setId2);
                        nextCount();
                        autoTimer();
                        play();
                    }
                },1000);        
            }
            function play(){
                $('#section3 .play-btn').prop('class','fa fa-pause pause-btn');
                clearInterval(setId2);
            }

            $('#section3 .pause-btn').click(function(){
                if($('#section3 .pause-btn').hasClass('fa-pause')){
                    clearInterval(setId);
                    pause();
                }
                else{
                    nextCount();
                    autoTimer();
                    play();
                }
            });

            $('#section3 .prev-btn').on({
                click: function(e){
                    e.preventDefault();
                    prevCount();
                    pause();
                }
            });
            $('#section3 .next-btn').on({
                click: function(e){
                    e.preventDefault();
                    nextCount();
                    pause();
                }
            });

            //터치스와이프, 드래그
            $('#section3 .slide').on({
                click: function(e){
                    e.preventDefault();
                }
            });
            $('#section3 .slide-wrap').on({
                mousedown: function(e){
                    e.preventDefault();
                    pause();
                    winW = $(window).width();

                    touchStart = e.clientX;
                    if(winW>734){
                        dragStart = e.clientX - $('#section3 .slide-wrap').offset().left-slideW/3 + ( ( winW - $('#section3 .slide-container').width() )/2 );
                    }
                    else{
                        dragStart = e.clientX - $('#section3 .slide-wrap').offset().left - slideW;  
                    }
                    // console.log( (winW - $('#section3 .slide-container').width())/2 );
                    // console.log(`$('.slide-wrap').offset().left`, $('#section3 .slide-wrap').offset().left);
                    // console.log(`$('.slide-wrap').offset().left-winW`, $('#section3 .slide-wrap').offset().left-slideW/3);
                    // console.log(`dragStart`,dragStart);
                    // console.log(`e.clientX`, e.clientX);
                    mouseDown = true;
                },
                mouseup: function(e){
                    e.preventDefault();
                    touchEnd = e.clientX;
                    result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(result==='NEXT'){
                        if( !$('#section3 .slide-wrap').is(':animated')){
                        nextCount();
                        }
                    }
                    if(result==='PREV'){
                        if( !$('#section3 .slide-wrap').is(':animated')){
                        prevCount();
                        }
                    }
                    mouseDown = false;
                },
                mousemove: function(e){
                    e.preventDefault();
                    if(!mouseDown){
                        return;
                    }
                    dragEnd = e.clientX;
                    //console.log('dragEnd',dragEnd);
                    $('#section3 .slide-wrap').css({left:dragEnd-dragStart});
                },
                mouseleave: function(e){
                    e.preventDefault();
                    if(!mouseDown){
                        return;
                    }
                    touchEnd = e.clientX;
                    result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(result==='NEXT'){
                        nextCount();
                    }
                    if(result==='PREV'){
                        prevCount();
                    }
                    mouseDown = false;

                }
            });


            //패럴럭스
            let winH = $(window).height()
            let sec3Top = $('#section3').offset().top - winH
            let t = false;
            $(window).scroll(function(){
                if($(window).scrollTop() > sec3Top){
                    if(t===false){
                        t=true;
                        $('#section3').addClass('sec3Ani');
                    }
                }
                if($(window).scrollTop() === 0){
                    t=false;
                    $('#section3').removeClass('sec3Ani');
                }
            });
        }
        section4(){

            //모바일전환
            let winW = $(window).width();
            $(window).resize(function(){

                winW = $(window).width();
                //console.log(winW);
                if(winW<734){
                    $('#section4 .pc-img').hide();
                    $('#section4 .mobile-img').show();
                }
                else {
                    $('#section4 .pc-img').show();
                    $('#section4 .mobile-img').hide();
                }

            });
            

            let winH = $(window).height()
            let sec4Top = $('#section4').offset().top - winH
            let t = false;
            $(window).scroll(function(){
                if($(window).scrollTop() > sec4Top){
                    if(t===false){
                        t=true;
                        $('#section4').addClass('sec4Ani');
                    }
                }
                if($(window).scrollTop() === 0){
                    t=false;
                    $('#section4').removeClass('sec4Ani');
                }
            });
        }
        section5(){
            let cnt=0;
            let cnt2=0;
            let setId = 0;
            let setId2 = 0;
            let slideW = $('#section5 .slide-view').width();
            let winW = $(window).width();

            let touchStart  = null;
            let touchEnd = null;
            let result = null;

            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false;

            //메인슬라이드
            function mainSlide(){
                winW = $(window).width();
                slideW = $('#section5 .slide-view').width();
                if(winW>770){
                    $('#section5 .slide-wrap').stop().animate({left:-slideW/3*cnt},600, function(){
                        cnt>4?cnt=0:cnt;
                        cnt<0?cnt=4:cnt;
                        $('#section5 .slide-wrap').animate({left:-slideW/3*cnt},0);
                    });
                }
                else{
                    $('#section5 .slide-wrap').stop().animate({left:-slideW*cnt},600, function(){
                        cnt>4?cnt=0:cnt;
                        cnt<0?cnt=4:cnt;
                        $('#section5 .slide-wrap').animate({left:-slideW*cnt},0);
                    });                    
                }
                $('.sec5-btn').removeClass('on');
                $('.sec5-btn').eq(cnt>4?cnt=0:cnt).addClass('on');
            }
            //다음카운트
            function nextCount(){
                cnt++;
                $("#section5 .num").text(cnt>4?1:cnt+1);
                mainSlide();
            }
            function prevCount(){
                cnt--;
                $("#section5 .num").text(cnt<0?5:cnt+1);
                mainSlide();
            }
            //자동타이머
            function autoTimer(){
                setId = setInterval(nextCount,3000);
            }
            autoTimer();

            //리사이즈

            $(window).resize(function(){
                if(winW>770){
                    winW = $(window).width();
                    slideW = $('#section5 .slide-view').width();    
                    $('#section5 .slide-wrap').stop().animate({left:-slideW/3*cnt},300);
                    //console.log(winW);
                    return slideW;    
                }
                else if(winW < 770) {
                    winW = $(window).width();
                    slideW = $('#section5 .slide-view').width();    
                    $('#section5 .slide-wrap').stop().animate({left:-slideW*cnt},300);
                    //console.log(winW);
                    return slideW;    
                }
            });            

            $('.sec5-btn').each(function(idx){  //page-btn의 각각은 idx를 가지고 있음
                $(this).click(function(e){ //'이' page-btn을 클릭할 때면 기능을 수행하는데
                    e.preventDefault();
                    clearInterval(setId);  //1 인터벌 제거
                    clearInterval(setId2);
                    cnt=idx                 //2 idx로 cnt를 세팅
                    $("#section5 .num").text(cnt+1);
                    mainSlide();         //3 메인 슬라이드 실행
                    pause();
                });
            
            });

            function pause(){
                clearInterval(setId);
                clearInterval(setId2);
                $('#section5 .pause-btn').prop('class','fa fa-play play-btn');
                cnt2=0;
                setId2 = setInterval(function(){
                    cnt2++;
                    console.log(cnt2);
                    if(cnt2>5){
                        clearInterval(setId);
                        clearInterval(setId2);
                        nextCount();
                        autoTimer();
                        play();
                    }
                },1000);        
            }
            function play(){
                $('#section5 .play-btn').prop('class','fa fa-pause pause-btn');
                clearInterval(setId2);
            }

            $('#section5 .pause-btn').click(function(){
                if($('#section5 .pause-btn').hasClass('fa-pause')){
                    clearInterval(setId);
                    pause();
                }
                else{
                    nextCount();
                    autoTimer();
                    play();
                }
            });

            $('#section5 .prev-btn').on({
                click: function(e){
                    e.preventDefault();
                    prevCount();
                    pause();
                }
            });
            $('#section5 .next-btn').on({
                click: function(e){
                    e.preventDefault();
                    nextCount();
                    pause();
                }
            });

            //터치스와이프, 드래그
            $('#section5 .slide').on({
                click: function(e){
                    e.preventDefault();
                }
            });
            $('#section5 .slide-wrap').on({
                mousedown: function(e){
                    e.preventDefault();
                    pause();
                    winW = $(window).width();

                    touchStart = e.clientX;
                    if(winW>734){
                        dragStart = e.clientX - $('#section5 .slide-wrap').offset().left-slideW/3 + ( ( winW - $('#section5 .slide-container').width() )/2 );
                    }
                    else{
                        dragStart = e.clientX - $('#section5 .slide-wrap').offset().left-slideW;
                    }
                    // console.log( (winW - $('#section5 .slide-container').width())/2 );
                    // console.log(`$('.slide-wrap').offset().left`, $('#section5 .slide-wrap').offset().left);
                    // console.log(`$('.slide-wrap').offset().left-winW`, $('#section5 .slide-wrap').offset().left-slideW/3);
                    // console.log(`dragStart`,dragStart);
                    // console.log(`e.clientX`, e.clientX);
                    mouseDown = true;
                },
                mouseup: function(e){
                    e.preventDefault();
                    touchEnd = e.clientX;
                    result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(result==='NEXT'){
                        if( !$('#section5 .slide-wrap').is(':animated')){
                        nextCount();
                        }
                    }
                    if(result==='PREV'){
                        if( !$('#section5 .slide-wrap').is(':animated')){
                        prevCount();
                        }
                    }
                    mouseDown = false;
                },
                mousemove: function(e){
                    e.preventDefault();
                    if(!mouseDown){
                        return;
                    }
                    dragEnd = e.clientX;
                    //console.log('dragEnd',dragEnd);
                    $('#section5 .slide-wrap').css({left:dragEnd-dragStart});
                },
                mouseleave: function(e){
                    e.preventDefault();
                    if(!mouseDown){
                        return;
                    }
                    touchEnd = e.clientX;
                    result = touchStart - touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(result==='NEXT'){
                        nextCount();
                    }
                    if(result==='PREV'){
                        prevCount();
                    }
                    mouseDown = false;

                }
            });


            //패럴럭스
            let winH = $(window).height()
            let sec5Top = $('#section5').offset().top - winH
            let t = false;
            $(window).scroll(function(){
                if($(window).scrollTop() > sec5Top){
                    if(t===false){
                        t=true;
                        $('#section5').addClass('sec5Ani');
                    }
                }
                if($(window).scrollTop() === 0){
                    t=false;
                    $('#section5').removeClass('sec5Ani');
                }
            });

        }
        section6(){
            let winH = $(window).height()
            let sec6Top = $('#section6').offset().top - winH
            let t = false;
            $(window).scroll(function(){
                if($(window).scrollTop() > sec6Top){
                    if(t===false){
                        t=true;
                        $('#section6').addClass('sec6Ani');
                    }
                }
                if($(window).scrollTop() === 0){
                    t=false;
                    $('#section6').removeClass('sec6Ani');
                }
            });
        }
        top(){
            $(window).scroll(function(){
                if($(window).scrollTop()>200){
                    $('#top').stop().fadeIn(500);
                }
                else{
                    $('#top').stop().fadeOut(500);
                }
            });
            
            $('#top').on({
                click: function(){
                    $('html').stop().animate({scrollTop:0}, 300);
                }
            });
        }

        footer(){
        }
    }

    const newtoms = new Toms();
    newtoms.init();

})(jQuery);