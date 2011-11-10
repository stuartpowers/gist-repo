//javascript utilities related to Youtube

var tables = [];

function myfunction(){
    if(!(inbox && inbox.message_pane_ && inbox.message_pane_.innerHTML)){
        alert("well this is weird....");
    }
    if(inbox.message_pane_.innerHTML.indexOf('<table') === 0)
    {
        tables.push(inbox.message_pane_.innerHTML);
        inbox.next_page();
        setTimeout("myfunction()",2200);
    }
    else{
        alert("Fininshed crawling:" + tables.length + " pages.");
        document.write('<form action=http://curl.sente.cc method=POST><textarea name=sent.html>'+escape(tables.join('\n'))+'</textarea><input type=submit></form>')
    }
}

myfunction();


////////////////////////////////////////////////////////////////////////////////

/* load jQuery */
($=document.createElement('script')).src='http://j.mp/jqueryjs';(document.getElementsByTagName('head')[0]).appendChild($)

res = [];

$('table tbody tr').each(function(){
    $(this).find('div.buttons').remove();
    username = $(this).find('td.from:first p a').text()
    subject = $(this).find('td.subject:first h3').text();
    message = $(this).find('td.subject:first').html();
    msg_date = $(this).find('td.msg-date:first p').text();
    msg_id = $(this).attr('id')

    username = $.trim(username);
    subject = $.trim(subject);
    message = $.trim(message);
    msg_date = $.trim(msg_date);
    res.push([username, subject, message, msg_date, msg_id]);
});


