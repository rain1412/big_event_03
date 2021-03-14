// $.ajaxPrefilter()在使用$.git $.ajsx等后立即使用
$(function()
{
    let baseURL="http://ajax.frontend.itheima.net"
    $.ajaxPrefilter(function (params) {
        params.url=baseURL+params.url;
    })
})