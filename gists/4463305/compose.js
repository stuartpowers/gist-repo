var w = window,
    u = 'https://mail.google.com/mail/?ui=2&view=cm&fs=1&tf=1',
    l = document.location;
var to = 'Stuart Powers <stuart.powers@gmail.com>',
    su = 'QuickNote',
    body = l;
u = u + '&to='+to+'&su='+su+'&body='+body;
try {
    throw (0);
} catch (z) {
    a = function () {
        if (!w.open(u, 't', 'toolbar=0,resizable=0,status=1,width=600,height=500')) l.href = u;
    };
    if (/Firefox/.test(navigator.userAgent)) setTimeout(a, 0);
    else a();
}
void(0)