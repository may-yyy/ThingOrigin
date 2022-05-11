import { Plane, Vector3 } from "three";
import "../public/js/main.js";
import sd2 from "../public/static/data/sceneParams.js";
import { ThingOrigin } from "./ThingOrigin";

// import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

// sd2.models = [
//     {
//         name: "Scene",
//         position: { x: 0, y: 0, z: 0 },
//         rotation: { _x: 0, _y: 0, _z: 0, _order: "XYZ" },
//         scale: { x: 1, y: 1, z: 1 },
//         type: "Group",
//         uuid: "C5A0A76D-51F7-44B8-89B7-4051B365A030",
//         objInfo: { objType: "modelFile", fileType: "gltf", folder: "test/", fileName: "scene4.glb" },
//     },
// ];

let mainScene = ThingOrigin.addScene("ttt", document.getElementById("d1"), sd2);

window.onclick = () => {};

// let arrow = ThingOrigin.model.initArrow("arrow1", [-5, -5, -5], [0, 0, 0], 100, "#f00", 10, 5);
// mainScene.add(arrow);
// let plane = ThingOrigin.model.initPlane("initPlane", [0, 1, 0], 0, 200, "#0f0");
// mainScene.add(plane);

// const bbb = new SkeletonHelper(arrow);
// mainScene.add(bbb);

let mouseGroup;
let flag = true;

let lineArr = [];
mainScene.eDispatcher.addEventListener("CLICK", (e) => {
    if (e.mouse == "left" && flag) {
        console.log(e);

        mainScene.remove(mouseGroup);

        mouseGroup = ThingOrigin.tool.initGroup();
        mouseGroup.name = "mouseGroup";

        let pos = e.event[0].point;
        lineArr.push([pos.x, pos.y, pos.z]);

        for (var i = 1; i < lineArr.length; i++) {
            var a = ThingOrigin.model.initLine([lineArr[i - 1][0], lineArr[i - 1][1], lineArr[i - 1][2]], [lineArr[i][0], lineArr[i][1], lineArr[i][2]]);
            mouseGroup.add(a);
        }

        mainScene.add(mouseGroup);
    } else {
        flag = false;
    }
});

let aaGroup;
mainScene.eDispatcher.addEventListener("MOUSEOVER", (e) => {
    if (lineArr.length > 0 && flag) {
        mainScene.remove(aaGroup);
        aaGroup = ThingOrigin.tool.initGroup();
        aaGroup.name = "aaGroup";
        var len = lineArr.length;
        let pos = e.event[0].point;

        aaGroup.add(ThingOrigin.model.initLine([lineArr[len - 1][0], lineArr[len - 1][1], lineArr[len - 1][2]], [pos.x, pos.y, pos.z]));
        mainScene.add(aaGroup);
    }
});

const localPlane = new Plane(new Vector3(0, -1, 0), 0.8);
const globalPlane = new Plane(new Vector3(-1, 0, 0), 0.1);

setTimeout(() => {
    ThingOrigin.model.initFileModel("gltf", "/static/three/xi.gltf", { scale: [1, 1, 1] }).then((model) => {
        console.log(model);
        mainScene.add(model);
        // ThingOrigin.animate.showExploded(model, 2, 3000);
        // ThingOrigin.animate.tweenRotate(model, "x", 0, 20, 3000);
        // window.onclick = () => {
        //     model.children[0].children[1].layers.toggle(1);
        // };
        // ThingOrigin.animate.showExploded(model, 10, 2000);
        // ThingOrigin.animate.tweenRotate(model, "x", 10, 50, 1000);
        // mainScene.effect.initModelClip(model, "x", 10);
        // var ii = 1;
        // setInterval(() => {
        //     console.log(ii);
        //     mainScene.effect.updateModelClip(ii);
        //     ii += 0.5;
        // }, 1000);
    });
}, 2000);

// var request = window.indexedDB.open("webDB", 1); //用var是为了方便反复执行，下同
// request.onerror = function (event) {
//     console.log("数据库打开报错");
// };
// var db;

// request.onsuccess = function (event) {
//     db = request.result;
//     //db = event.target.result; 也能拿到
//     console.log("数据库打开成功");

//     // read();
// };

// var db;
// request.onupgradeneeded = function (event) {
//     //@ts-ignore
//     db = event.target.result;

//     console.log(db);

//     var objectStore;
//     if (!db.objectStoreNames.contains("book")) {
//         objectStore = db.createObjectStore("book", {
//             keyPath: "id",
//         });

//         // 定义存储对象的数据项
//         objectStore.createIndex("id", "id", {
//             unique: true,
//         });
//         objectStore.createIndex("name", "name");
//         objectStore.createIndex("model", "model");
//     }
//     console.log("数据库升级成功");
// };

// function add(book) {
//     console.log(db);

//     var request1 = db
//         .transaction(["book"], "readwrite") //新建事务，readwrite, readonly(默认), versionchange
//         .objectStore("book") //拿到IDBObjectStore 对象
//         .add({
//             // 插入记录
//             id: book.id,
//             name: book.name,
//             model: book.model,
//         });
//     request1.onsuccess = function (event) {
//         console.log("数据写入成功");
//     };
//     request1.onerror = function (event) {
//         console.log("数据写入失败");
//     };
//     request1.onabort = function (event) {
//         console.log("事务回滚");
//     };
// }

// function read() {
//     var transaction = db.transaction("book", "readwrite");
//     var store = transaction.objectStore("book");
//     console.log(store);

//     var dataRequest = store.get("id");
//     console.log(dataRequest);

//     dataRequest.onsuccess = function (e) {
//         console.log(e);

//         //异步的
//         // var student = e.target.result;
//         // console.log(student.name);
//     };
// }

// //步骤一:创建异步对象
// var ajax = new XMLHttpRequest();
// //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
// ajax.open("get", "/static/three/xi.gltf");
// //步骤三:发送请求
// ajax.send();
// //步骤四:注册事件 onreadystatechange 状态改变就会调用
// ajax.onreadystatechange = function () {
//     if (ajax.readyState == 4 && ajax.status == 200) {
//         //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
//         // console.log(ajax.responseText); //输入相应的内容
//         // let ab = new ArrayBuffer(ajax.responseText);
//         // console.log(new Blob([ab], { type: "gltf" }));
//         // console.log(ajax.response);

//         let blob = new Blob([ajax.responseText]);
//         console.log(blob);

//         // add({ id: 10, name: "书名", model: blob });
//         add({ id: 100, name: "xi", model: blob });

//         // var reader = new FileReader();
//         // let m1 = reader.readAsBinaryString(ajax.responseText);

//         // reader.onload = function (e) {
//         //     console.log(e, reader);
//         // };
//     }
// };

// setTimeout(() => {
//     var transaction = db.transaction("book", "readwrite");
//     var store = transaction.objectStore("book");

//     var dataRequest = store.index("id").get(100);
//     console.log(dataRequest);

//     dataRequest.onsuccess = function (e) {
//         // console.log(e.target.result.model);

//         //异步的
//         // var student = e.target.result;
//         // console.log(student.name);
//         ThingOrigin.model.initFileModel("gltf", e.target.result.model, undefined, true).then((model) => {
//             mainScene.add(model);

//             mainScene.helper.initBox(model.uuid);

//             mainScene.tweenMove("name", "xi", "x", 0, 90, 20000);
//         });
//     };
// }, 1000);

// mainScene.overrideMaterial = new MeshBasicMaterial({ color: "green" });

// ThingOrigin.model.initText("这是文字", "/static/font/Microsoft YaHei Light_Regular.json", { color: "#ff0", size: 50, height: 100 }).then((font) => {
//     mainScene.add(font);
// });
// ThingOrigin.model.initTextLine("这是文字", "/static/font/Microsoft YaHei Light_Regular.json", { color: "#ff0", size: 50 }, { position: [50, 50, 50] }).then((font) => {
//     mainScene.add(font);
// });

// mainScene.add(ThingOrigin.model.initSphere("qiu1", undefined, { position: [0, 0, 0] }));
// mainScene.add(ThingOrigin.model.initSphere("qiu1", undefined, { position: [0, 0, -180] }));
// mainScene.add(ThingOrigin.model.initSphere("qiu1", undefined, { position: [0, 0, 180] }));

// var tagId: string;
// let CSSDiv = document.createElement("div");
// CSSDiv.id = "Test";
// CSSDiv.textContent = "文字测试";
// ThingOrigin.model.initFileModel("gltf", "/static/three/test/scene4.glb").then((model) => {
//     console.log(model);

//     mainScene.add(model);
//     tagId = mainScene.addCSS2D("name", "car001", CSSDiv);
// });

// ThingOrigin.model.initMap("/static/data/china.json").then((model) => {
//     console.log(model);

//     mainScene.add(model);
// });

// var models = ThingOrigin.model.initSpriteShape("points", a, { shape: "triangle", color: "#fff", radius: 2 }, { cusType: "777" });
// ThingOrigin.getScene("ttt").add(models);

// var cyl = ThingOrigin.model.initCylinder("cube1", {
//     radiusTop: 10,
//     radiusBottom: 20,
// });
// ThingOrigin.getScene("ttt").add(cyl);

//旧版demo
//旧版demo
//旧版demo

// var a = [];
// for (var i = 0; i < points.length; i++) {
//     if (points[i].Y < 80 && points[i].X <= -110) {
//         points[i]["POINT_ID"] = "rest";
//         a.push(points[i]);
//     }
//     if (points[i].Y < 80 && points[i].X <= 65 && points[i].X >= -70) {
//         points[i]["POINT_ID"] = "rest";
//         a.push(points[i]);
//     }
//     if (points[i].Y < 80 && points[i].X >= 120) {
//         points[i]["POINT_ID"] = "rest";
//         a.push(points[i]);
//     }
//     if (points[i].Y < 80 && points[i].X >= 65 && points[i].X <= 120 && points[i].Z <= -40) {
//         points[i]["POINT_ID"] = "rest";
//         a.push(points[i]);
//     }
// }

// console.log(JSON.stringify(a));

// // ThingOrigin.getScene("ttt").model.sprite.initPic("points", points, { url: "/static/img/sprite2.png", size: 5 }, { cusType: "777" });
// // ThingOrigin.getScene("ttt").model.addPoints("points", points, { color: "#f00", size: 3 });

// // var pointGroup = ThingOrigin.getScene("ttt").getObjectByProperty("name", "points");

// ThingOrigin.getScene("ttt").model.addSphere("sphere", {
//     radius: 30,
// });
// ThingOrigin.getScene("ttt").background = new TextureLoader().load("/static/img/ground.jpg");

// ThingOrigin.getScene("ttt")
//     .model.loadModel("gltf", "/static/three/car/scene.glb", { scale: [0.03, 0.03, 0.03] })
//     .then((uuid) => {
//         console.log("加载完毕", uuid);

//         // bbb.material.push(new MeshBasicMaterial({ color: 0xff0000 }));

//         // bbb.material[0].blending = bbb.material.length;
//         // console.log(bbb.material[0].blending);
//         // let iid = ThingOrigin.getScene("ttt").getObjectByProperty("name", "SUB30-1").uuid;
//     });

// let wall = ThingOrigin.getScene("ttt").model.addGeometry("cube", "cube");
// ThingOrigin.getScene("ttt").model.addCylinder("cube1", {
//     radiusTop: 10,
//     radiusBottom: 20,
// });

// ThingOrigin.getScene("ttt").eDispatcher.addEventListener("CLICK", (e) => {
//     console.log(e);
//     if (e.event[0]) {
//         if (e.event[0].object.name == "qiu") {
//             if (!ThingOrigin.getScene("ttt").ifOwnCSS2D(e.event[0] && e.event[0].object)) {
//                 ThingOrigin.getScene("ttt").model.addCSS2D("name", "qiu", document.getElementById("menu").cloneNode(true) as HTMLElement);
//             } else {
//                 let boxId = e.event[0].object.children[0].uuid;
//                 console.log(boxId);
//                 ThingOrigin.getScene("ttt").model.removeCSS2D(boxId);
//             }
//         }
//     }

//     // ThingOrigin.getScene("ttt").model.showExploded("name", "AB_tai003", 1.4, 1000);
//     // ThingOrigin.getScene("ttt").model.setVisible("qiu1", false);
//     // ThingOrigin.getScene("ttt").controls.initRaycaster(sceneParams.controls.raycaster.events);
//     // var a = ThingOrigin.getScene("ttt").getObjectByProperty("name", "car");
//     // var b = ThingOrigin.getScene("ttt").cloneObject("ttt", a.uuid, [100, 10, 100]);
//     // ThingOrigin.getScene("ttt").add(b);
//     // console.log(e);
//     // wallPoints.push([e.position.x, e.position.y, e.position.z]);
//     // console.log(wallPoints);
//     // let unResponse = ["BoxHelper", "GridHelper", "AxesHelper", "TransformControlsPlane", "Line"];
//     // for (let i = 0; i < e.event.length; i++) {
//     //     if (unResponse.indexOf(e.event[i].object.type) == -1) {
//     //         ThingOrigin.getScene("ttt").camera.lookAt(e.event[i].object.uuid, 1000, 1);
//     //         break;
//     //     }
//     // }
// });

// let showOn;
// ThingOrigin.getScene("ttt").eDispatcher.addEventListener("MOUSEOVER", (e) => {
//     if (showOn) {
//         showOn.material[0].color.set("#02A1E2");
//         showOn.material[1].color.set("#3480C4");

//         var properties = showOn.parent.properties;

//         document.getElementById("provinceInfo").textContent = properties.name;

//         document.getElementById("provinceInfo").style.visibility = "visible";
//     } else {
//         document.getElementById("provinceInfo").style.visibility = "hidden";
//     }
//     if (!e.event[0]) return;
//     if (e.event[0].object.type != "Mesh") return;

//     console.log(e);

//     e.event[0].object.material[0].color.set(0xff0000);
//     e.event[0].object.material[1].color.set(0xff0000);

//     showOn = e.event[0].object;
// });
