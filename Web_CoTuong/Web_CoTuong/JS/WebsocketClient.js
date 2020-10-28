var common = {
    clone: function (item) {
        return JSON.parse(JSON.stringify(item));
    }
};
var WebSocketClient = function (options) {
    var _options = common.clone(options);
    var _getUri = function (param) {
        var _param = param || {};
        _param.domain = _param.domain || "localhost"; //echo.websocket.org
        _param.port = _param.port || 8088;
        _param.scheme = _param.scheme || "ws:";
        return _param.scheme + "//" + _param.domain + ":" + _param.port;
    };
    var _websocketClient = function () {
        if (window.MozWebSocket) {
            window.WebSocket = window.MozWebSocket;
        }
        if (!window.WebSocket) {
            return null;
        }
        var uri = _getUri(_options);
        try {
            return new WebSocket(uri);
        }
        catch (e) {
            console.log(e);
            return {};
        }
    };
    var _websocket = _websocketClient();
    _websocket.onopen = function (evt) {
        options.onOpen && options.onOpen(event);
        console.log("connected!");
    };
    _websocket.onclose = function (evt) {
        options.onClose && options.onClose(evt);
        console.log(evt);
    };
    _websocket.onmessage = function (evt) {
        options.onMessage && options.onMessage(event);

        var data = JSON.parse(evt.data);
        console.log("Data");
        console.log(data);
        var listCheckTopic = [];
        var listAllow = [];


        if (data.PlayerInfo) {
            var _dataPlayerInfo = data.PlayerInfo;
            console.log(_dataPlayerInfo);

            //[{"Topic":"1","Info":[{"x":"1","y":"2"},{"x":"1","y":"2"},{"x":"1","y":"2"}]},{},{}]


            //var listCheckName = [];


            for (var i = 0; i < _dataPlayerInfo.length; i++) {
                var topic = _dataPlayerInfo[i].Topic;
                if (listCheckTopic.length == 0) {
                    listAllow.push(_dataPlayerInfo[i]);

                    //listCheckName.push()
                    listCheckTopic.push(topic);
                }
                else {
                    for (var j = 0; j < listCheckTopic.length; j++) {
                        console.log(listCheckTopic[j]);
                        if (_dataPlayerInfo[i].Topic != listCheckTopic[j]) {
                            listAllow.push(_dataPlayerInfo[i]);
                            listCheckTopic.push(topic);
                        }
                        else {
                            for (var k = 0; k < listAllow.length; k++) {
                                if (listAllow[k].Topic == _dataPlayerInfo[i].Topic && listAllow[k].NickName != _dataPlayerInfo[i].NickName && listAllow[k].Type != _dataPlayerInfo[i].Type) {
                                    listAllow.push(_dataPlayerInfo[i]);
                                }
                            }
                        }
                    }
                }
            }

            //hiển thị tên lên table
            console.log(listAllow);
            for (var i = 0; i < listAllow.length; i++) {
                var id = listAllow[i].Topic;
                var type = listAllow[i].Type;
                var name = listAllow[i].NickName;
                $("#" + type + "Name" + id).html(name);
            }
        }
        //JSON.parse(localStorage.listStorage).Message[0].Message
        var count = 0;
        if (!data.Topic && data.Message) {
            $("#tableOptions").html("");
            var _tr = '<tr>' +
                '<th>Client</th>' +
                '<th>Bên đen</th>' +
                '<th>Bên đỏ</th>' +
                '<th>Trạng thái</th>' +
                '</tr>';
            $("#tableOptions").append(_tr);
            var _dataServer = data.Message;
            //show data server ra=>đồng bộ
            for (var i = 0; i < _dataServer.length; i++) {
                var tr = "<tr>";
                tr += "<td>Ván đấu " + (i + 1).toString() + "</td>";
                tr += "<td>" +
                    "<input type='radio' name=vandau value=b" + (_dataServer[i].Topic.toString()) + " />" +
                    "<span id=bName" + (_dataServer[i].Topic.toString()) + ">Trống</span>" +
                    "</td>";
                tr += "<td>" +
                    "<input type='radio' name=vandau value=r" + (_dataServer[i].Topic.toString()) + " />" +
                    "<span id=rName" + (_dataServer[i].Topic.toString()) + ">Trống</span>" +
                    "</td>";
                tr += "<td>Đồng bộ</td></tr>";

                $("#tableOptions").append(tr);
                count++;
            }

            //tìm trong storage, cái nào khác thì show ra=>upload
            if (localStorage.listStorage) {
                var _dataStorage = JSON.parse(localStorage.listStorage).Message;

                for (var i = 0; i < _dataStorage.length; i++) {
                    var flag = false;
                    for (var j = 0; j < _dataServer.length; j++) {
                        if (_dataStorage[i].Topic.toString() == _dataServer[j].Topic.toString()) {
                            flag = true;
                            break;
                        }
                    }

                    if (!flag) {
                        console.log("listStorage");
                        //show ra=>upload
                        var tr = "<tr>";
                        tr += "<td>Ván đấu " + (count + 1).toString() + "</td>";
                        tr += "<td>" +
                            "<input type='radio' name=vandau value=den" + (_dataStorage[i].Topic.toString()) + " />" +
                            "<span>Trống</span>" +
                            "</td>";
                        tr += "<td>" +
                            "<input type='radio' name=vandau value=do" + (_dataStorage[i].Topic.toString()) + " />" +
                            "<span>Trống</span>" +
                            "</td>";
                        tr += "<td><button class='upload' id=upload" + (_dataStorage[i].Topic) + ">Upload</button></td></tr>";

                        $("#tableOptions").append(tr);
                        count++;
                    }
                }


                for (var i = 0; i < _dataServer.length; i++) {
                    var check = false;
                    for (var j = 0; j < _dataStorage.length; j++) {
                        if (_dataServer[i].Topic.toString() == _dataStorage[j].Topic.toString()) {
                            check = true;
                            console.log("topic", _dataServer[i].Topic.toString());
                            console.log("topic", _dataStorage[j].Topic.toString());
                            //xóa thằng có topic đó đi, rồi push lại

                            if (JSON.stringify(_dataServer[i].Message) != JSON.stringify(_dataStorage[j].Message)) {
                                console.log(i, "-------------------cập nhật nè-----------------", j);
                                console.log(JSON.stringify(_dataServer[i]));
                                console.log(JSON.stringify(_dataStorage[j]));
                                var local = JSON.parse(localStorage.listStorage);
                                local.Message.splice(j, 1);
                                localStorage.setItem("listStorage", JSON.stringify(local));

                                var local1 = JSON.parse(localStorage.listStorage);
                                local1.Message.push(_dataServer[i]);
                                localStorage.setItem("listStorage", JSON.stringify(local1));
                            }
                            break;
                        }
                    }
                    if (!check) {
                        console.log("push");
                        console.log(_dataServer[i]);
                        var local = JSON.parse(localStorage.listStorage);
                        local.Message.push(_dataServer[i]);
                        localStorage.setItem("listStorage", JSON.stringify(local));
                    }
                }
            }
            else {
                localStorage.setItem("listStorage", JSON.stringify(data));
            }

            if (data.Action) {
                console.log("action");
                var _data = data.Message;
                var _topic = data.Action.toString();

                var _dtStorage = JSON.parse(localStorage.listStorage).Message;
                for (var i = 0; i < _data.length; i++) {
                    console.log(_topic);
                    console.log(_data[i].Topic.toString())
                    console.log("=================");
                    if (_data[i].Topic.toString() == _topic) {
                        banco.setQuanCo(_data[i].Message);
                        console.log("bàn cờ mới-----------------------------------");
                        console.log(banco.getInfo());

                        $("#my-widget1").chessBoard(
                            "option", {
                            chess: banco.getInfo(), allow: "1"
                        });
                        break;
                    }
                }
                duocdanh = 1;
            }

            $(function () {
                $(".upload").click(function () {
                    //alert("click");
                    var id = $(this).attr('id');
                    id = id.toString().substr(6);

                    var length = JSON.parse(localStorage.listStorage).Message.length;
                    var _tmpData = JSON.parse(localStorage.listStorage).Message;
                    for (var i = 0; i < length; i++) {
                        if (_tmpData[i].Topic == id.toString()) {
                            console.log("vô send");
                            var _dataSend = _tmpData[i];

                            setTimeout(function () {
                                client.sendMessage(JSON.stringify(_dataSend));
                            }, 2000);
                        }
                    }
                });
            });
        }

        if (data.Topic == "viewIndex" && data.Message == "new") {
            console.log("viewIndex");
            console.log(data);
            return;
        }
    };
    _websocket.onerror = function (evt) {
        options.onError && options.onError(evt);
        console.log(evt);
    };
    return {
        getInfo: function () {
            return common.clone(_options);
        },
        sendMessage: function (data) {
            if (typeof data == "object") {
                data = JSON.stringify(data);
            }
            return _websocket.send(data);
        }
    };
};



