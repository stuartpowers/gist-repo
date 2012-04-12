// Stuart Powers

function write_window(content) {
    top.consoleRef=window.open('',
            'git-r-done',
            +',menubar=1'
            +',toolbar=1'
            +',status=1'
            +',scrollbars=1'
            +',resizable=1');
    top.consoleRef.document.writeln(content);
    top.consoleRef.document.close();
}

function dostuff() {
    $.ajax({
       url: document.location.href,
       dataType:'html',
       success: function(content){
           setTimeout(function(){write_window(content)},500);
       }
    });
}



function add_jquery(attempt) {
    var jq=document.createElement('script');
    jq.type='text/javascript';
    jq.async=false;
    jq.src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    var s=document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(jq,s);
    try
    {
        var foo=$('*');
        dostuff();
    }
    catch(err)
    {
        if(attempt < 5)
        {
             attempt = attempt + 1;
             setTimeout("add_jquery("+attempt+")",1000)
        }
        else
        {
             alert('could not load jquery..try again!');
        }
    }
}

add_jquery(0);


// javascript:function%20write_window(content)%20{top.consoleRef=window.open(%27%27,%27git-r-done%27,+%27,menubar=1%27+%27,toolbar=1%27+%27,status=1%27+%27,scrollbars=1%27+%27,resizable=1%27);top.consoleRef.document.writeln(content);top.consoleRef.document.close();}function%20dostuff()%20{$.ajax({url:%20document.location.href,dataType:%27html%27,success:%20function(content){setTimeout(function(){write_window(content)},500);}});}function%20add_jquery(attempt)%20{var%20jq=document.createElement(%27script%27);jq.type=%27text/javascript%27;jq.async=false;jq.src=%27https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js%27;var%20s=document.getElementsByTagName(%27script%27)[0];s.parentNode.insertBefore(jq,s);try{var%20foo=$(%27*%27);dostuff();}catch(err){if(attempt%20<%205){attempt%20=%20attempt%20+%201;setTimeout(%22add_jquery(%22+attempt+%22)%22,1000)}else{alert(%27could%20not%20load%20jquery..try%20again!%27);}}}add_jquery(0);
