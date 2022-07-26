var data = {
    menu: [
        {
            title: "开发指南",
            children: [
                {
                    title: "安装",
                    url: "./start/install.html",
                },
                {
                    title: "快速上手",
                    url: "./start/start.html",
                },
                {
                    title: "场景参数",
                    url: "./start/sceneParam.html",
                },
            ],
        },
        {
            title: "Examples",
            children: [
                {
                    title: "animate",
                    children: [
                        {
                            title: "补间动画",
                            url: "./animate/tweenRotate.html",
                        },
                    ],
                },
                {
                    title: "control",
                    children: [
                        {
                            title: "鼠标点击连线",
                            url: "./controls/mouseLine.html",
                        },
                    ],
                },
                {
                    title: "effect",
                    children: [
                        {
                            title: "剖切面_全局",
                            url: "./effect/clipGlobal.html",
                        },
                    ],
                },
                {
                    title: "scene",
                    children: [
                        {
                            title: "天空盒",
                            url: "./scene/initSky.html",
                        },
                        {
                            title: "背景图片",
                            url: "./scene/backgroundImg.html",
                        },
                    ],
                },
                {
                    title: "model",
                    children: [
                        {
                            title: "导入模型文件",
                            url: "./models/initFileModel.html",
                        },
                        {
                            title: "新建group",
                            url: "./models/initGroup.html",
                        },
                        {
                            title: "生成直线",
                            url: "./models/initLine.html",
                        },
                        {
                            title: "生成点云组",
                            url: "./models/initPoints.html",
                        },
                    ],
                },
            ],
        },
    ],
};

var vm = new Vue({
    el: "#menu",
    data: data,
    methods: {
        jump(title, url) {
            document.title = "TO - " + title;
            const frame = document.getElementById("iframe");
            frame.src = url;
        },
    },
});
