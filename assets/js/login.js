$(function () {
    $('#link_reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    let form = layui.form
    // 验证
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd) {
                return '两次密码输入不一致';
            }
        }
    });
    // 注册
    let layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            success: (res) => {
                //    console.log(res);
                if (res.status !== 0) { 
                    return layer.msg(res.message, { icon: 5 });
                }
                // return alert(res.message)
                // return alert('注册成功，请登录')
                layer.msg('注册成功，请登录', { icon: 6 });
                $('#link_login').click();
                $('#form_reg')[0].reset();
            }
        })
    })
    // 登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                //    console.log(res);
                if (res.status !== 0) return layer.msg(res.message, { icon: 5 });
                localStorage.setItem('token', res.token)
                // 跳转
                location.href = "./index.html"
            }
        })
    })
})