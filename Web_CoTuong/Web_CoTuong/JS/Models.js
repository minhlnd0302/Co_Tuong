var XeClass = function (options) {
    var info = {
        x: options.x,
        y: options.y,
        p: options.p == 1 ? 1 : 2, // 1: đỏ, 2: đen
        t: 0
    };

    var _setInfo = function (_options) {
        info.x = _options.x;
        info.y = _options.y;
        info.p = _options.p;
        info.t = _options.t;
    };

    var _Move = function (x, y, banco) {
        var result = _canMove(banco);
        result.forEach(function (item) {
            if (item.x == x && item.y == y) {
                var _image = "";
                if (info.p == 1) {
                    _image = imagesDo[Number(info.t)];
                }
                else {
                    _image = imagesDen[Number(info.t)];
                }
                var infoMove = banco.getItem(x, y);
                if (infoMove != null || infoMove != undefined) {
                    banco.removeItem(infoMove);
                }

                _setInfo({ x: Number(x), y: Number(y), p: Number(info.p), t: Number(info.t) });
            }
        });
        setTimeout(function () { client.sendMessage({ Topic: vandangchoi, Message: banco.getInfo() }); }, 1000);
    };

    var _canMove = function (_banco) {
        var x = Number(info.x);
        var y = Number(info.y);
        var result = [];

        for (let i = 1; i <= 9; i++) {
            if ((x - i) >= 0) {
                var infoCo = _banco.getItem(x - i, y);
                console.log("co", infoCo);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {

                        result.push({ x: x - i, y: y });
                        break;
                    }
                    else {
                        break;
                    }
                }
                else {
                    console.log(x - i, y);
                    result.push({ x: x - i, y: y });
                    console.log(result);
                }
            }
        }

        for (let i = 1; i <= 9 - x; i++) {
            if ((x + i) < 10) {
                var infoCo = _banco.getItem(x + i, y);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x + i, y: y });
                        break;
                    }
                    else {
                        break;
                    }
                }
                else {
                    result.push({ x: x + i, y: y });
                }
            }
        }

        for (let i = 1; i <= 9; i++) {
            if ((y - i) >= 0) {
                var infoCo = _banco.getItem(x, y - i);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x, y: y - i });
                        break;
                    }
                    else {
                        break;
                    }
                }
                else {
                    result.push({ x: x, y: y - i });
                }
            }
        }

        for (let i = 1; i <= 9; i++) {
            if ((y + i) < 9) {
                var infoCo = _banco.getItem(x, y + i);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x, y: y + i });
                        break;
                    }
                    else {
                        break;
                    }
                }
                else {
                    result.push({ x: x, y: y + i });
                }
            }
        }

        return result;
    };
    return {
        getInfo: function () {
            return {
                x: info.x,
                y: info.y,
                p: info.p,
                t: info.t
            }
        },
        setInfo: function (_options) {
            _setInfo(_options);
        },
        canMove: function (_banco) {
            //this.getInfo()
            //modify here
            return _canMove(_banco);
        },
        Move: function (x, y, banco) {
            _Move(x, y, banco);
        }
    };
};

var MaClass = function (options) {
    var info = {
        x: options.x,
        y: options.y,
        p: options.p == 1 ? 1 : 2, // 1: đỏ, 2: đen
        t: 1
    };

    var _setInfo = function (_options) {
        info.x = _options.x;
        info.y = _options.y;
        info.p = _options.p;
        info.t = _options.t;
    };

    var _Move = function (x, y, banco) {
        var result = _canMove(banco);
        result.forEach(function (item) {
            if (item.x == x && item.y == y) {
                var _image = "";
                if (info.p == 1) {
                    _image = imagesDo[Number(info.t)];
                }
                else {
                    _image = imagesDen[Number(info.t)];
                }
                var infoMove = banco.getItem(x, y);
                if (infoMove != null || infoMove != undefined) {
                    banco.removeItem(infoMove);
                    //localStorage["quanco"] = JSON.stringify(_quanco);
                }

                _setInfo({ x: Number(x), y: Number(y), p: Number(info.p), t: Number(info.t) });
            }
        });

        setTimeout(function () { client.sendMessage({ Topic: vandangchoi, Message: banco.getInfo() }); }, 1000);
    };

    var _canMove = function (_banco) {
        console.log("Mã");
        //modify here    
        var x = Number(info.x);
        var y = Number(info.y);
        var result = [];

        if ((x + 1 < 10) && (y + 2 < 9)) {
            var _image = "";
            if (info.p == 1) {
                _image = imagesDo[Number(info.t)];
            }
            else {
                _image = imagesDen[Number(info.t)];
            }
            var infoCan = _banco.getItem(x, y + 1); // vật cản
            if (infoCan == undefined || infoCan == null) {
                var coCheck = _banco.getItem(x + 1, y + 2); //cờ kiểm tra quân địch hay quân ta
                if (coCheck == undefined || coCheck == null) {
                    result.push({ x: x + 1, y: y + 2 });
                }
                else {
                    if (coCheck.getInfo().p != info.p) {
                        result.push({ x: x + 1, y: y + 2 });
                    }
                }
            }
        }

        if (x - 1 >= 0 && y + 2 < 9) {
            var infoCan = _banco.getItem(x, y + 1);
            if (infoCan == undefined || infoCan == null) {
                var coCheck = _banco.getItem(x - 1, y + 2);
                if (coCheck == undefined || coCheck == null) {
                    result.push({ x: x - 1, y: y + 2 });
                }
                else {
                    if (coCheck.getInfo().p != info.p) {
                        result.push({ x: x - 1, y: y + 2 });
                    }
                }

            }
        }
        if (x + 1 < 10 && y - 2 >= 0) {
            var infoCan = _banco.getItem(x, y - 1);
            if (infoCan == undefined || infoCan == null) {
                var coCheck = _banco.getItem(x + 1, y - 2);
                if (coCheck == undefined || coCheck == null) {
                    result.push({ x: x + 1, y: y - 2 });
                }
                else {
                    if (coCheck.getInfo().p != info.p) {
                        result.push({ x: x + 1, y: y - 2 });
                    }
                }

            }
        }

        if (x - 1 >= 0 && y - 2 >= 0) {
            var infoCan = _banco.getItem(x, y - 1);
            if (infoCan == undefined || infoCan == null) {
                var coCheck = _banco.getItem(x - 1, y - 2);
                if (coCheck == undefined || coCheck == null) {
                    result.push({ x: x - 1, y: y - 2 });
                }
                else {
                    if (coCheck.getInfo().p != info.p) {
                        result.push({ x: x - 1, y: y - 2 });
                    }
                }
            }
        }
        if (x - 2 >= 0 && y + 1 < 9) {
            var infoCan = _banco.getItem(x - 1, y);
            if (infoCan == undefined || infoCan == null) {
                var coCheck = _banco.getItem(x - 2, y + 1);
                if (coCheck == undefined || coCheck == null) {
                    result.push({ x: x - 2, y: y + 1 });
                }
                else {
                    if (coCheck.getInfo().p != info.p) {
                        result.push({ x: x - 2, y: y + 1 });
                    }
                }
            }
        }

        if (x - 2 >= 0 && y - 1 >= 0) {
            var infoCan = _banco.getItem(x - 1, y);
            if (infoCan == undefined || infoCan == null) {
                var coCheck = _banco.getItem(x - 2, y - 1);
                if (coCheck == undefined || coCheck == null) {
                    result.push({ x: x - 2, y: y - 1 });
                }
                else {
                    if (coCheck.getInfo().p != info.p) {
                        result.push({ x: x - 2, y: y - 1 });
                    }
                }

            }
        }

        if (x + 2 < 10 && y + 1 < 9) {
            var infoCan = _banco.getItem(x + 1, y);
            if (infoCan == undefined || infoCan == null) {
                var coCheck = _banco.getItem(x + 2, y + 1);
                if (coCheck == undefined || coCheck == null) {
                    result.push({ x: x + 2, y: y + 1 });
                }
                else {
                    if (coCheck.getInfo().p != info.p) {
                        result.push({ x: x + 2, y: y + 1 });
                    }
                }

            }
        }

        if (x + 2 < 10 && y - 1 >= 0) {
            var infoCan = _banco.getItem(x + 1, y);
            if (infoCan == undefined || infoCan == null) {
                var coCheck = _banco.getItem(x + 2, y - 1);
                if (coCheck == undefined || coCheck == null) {
                    result.push({ x: x + 2, y: y - 1 });
                }
                else {
                    if (coCheck.getInfo().p != info.p) {
                        result.push({ x: x + 2, y: y - 1 });
                    }
                }

            }
        }
        console.log(result);
        return result;
    };

    return {
        getInfo: function () {
            return {
                x: info.x,
                y: info.y,
                p: info.p,
                t: info.t
            }
        },
        setInfo: function (_options) {
            _setInfo(_options);
        },
        canMove: function (_banco) {
            return _canMove(_banco);
        },
        Move: function (x, y, banco) {
            _Move(x, y, banco);
        }
    }
}

var BoClass = function (options) {
    var info = {
        x: options.x,
        y: options.y,
        p: options.p == 1 ? 1 : 2, // 1: đỏ, 2: đen
        t: 2
    };

    var _setInfo = function (_options) {
        info.x = _options.x;
        info.y = _options.y;
        info.p = _options.p;
        info.t = _options.t;
    };

    var _Move = function (x, y, banco) {
        var result = _canMove(banco);
        result.forEach(function (item) {
            if (item.x == x && item.y == y) {
                var _image = "";
                if (info.p == 1) {
                    _image = imagesDo[Number(info.t)];
                }
                else {
                    _image = imagesDen[Number(info.t)];
                }
                var infoMove = banco.getItem(x, y);
                if (infoMove != null || infoMove != undefined) {
                    banco.removeItem(infoMove);
                    //localStorage["quanco"] = JSON.stringify(_quanco);
                }

                _setInfo({ x: Number(x), y: Number(y), p: Number(info.p), t: Number(info.t) });
            }
        });
        setTimeout(function () { client.sendMessage({ Topic: vandangchoi, Message: banco.getInfo() }); }, 1000);
    };

    var _canMove = function (_banco) {
        var result = [];
        var x = Number(info.x);
        var y = Number(info.y);
        var p = info.p;

        if (p == "1") {
            if (x + 2 <= 4 && y + 2 <= 8) {
                var infoCan = _banco.getItem(x + 1, y + 1);
                if (infoCan == undefined || infoCan == null) {
                    var coCheck = _banco.getItem(x + 2, y + 2);
                    if (coCheck == undefined || coCheck == null) {
                        result.push({ x: x + 2, y: y + 2 });
                    }
                    else {
                        if (coCheck.getInfo().p != info.p) {
                            result.push({ x: x + 2, y: y + 2 });
                        }
                    }
                }
            }

            if (x + 2 <= 4 && y - 2 >= 0) {
                var infoCan = _banco.getItem(x + 1, y - 1);
                if (infoCan == undefined || infoCan == null) {
                    var coCheck = _banco.getItem(x + 2, y - 2);
                    if (coCheck == undefined || coCheck == null) {
                        result.push({ x: x + 2, y: y - 2 });
                    }
                    else {
                        if (coCheck.getInfo().p != info.p) {
                            result.push({ x: x + 2, y: y - 2 });
                        }
                    }
                }
            }

            if (x - 2 >= 0 && y - 2 >= 0) {
                var infoCan = _banco.getItem(x - 1, y - 1);
                if (infoCan == undefined || infoCan == null) {
                    var coCheck = _banco.getItem(x - 2, y - 2);
                    if (coCheck == undefined || coCheck == null) {
                        result.push({ x: x - 2, y: y - 2 });
                    }
                    else {
                        if (coCheck.getInfo().p != info.p) {
                            result.push({ x: x - 2, y: y - 2 });
                        }
                    }
                }
            }

            if (x - 2 >= 0 && y + 2 <= 8) {
                var infoCan = _banco.getItem(x - 1, y + 1);
                if (infoCan == undefined || infoCan == null) {
                    var coCheck = _banco.getItem(x - 2, y + 2);
                    if (coCheck == undefined || coCheck == null) {
                        result.push({ x: x - 2, y: y + 2 });
                    }
                    else {
                        if (coCheck.getInfo().p != info.p) {
                            result.push({ x: x - 2, y: y + 2 });
                        }
                    }
                }
            }
        }
        else {
            if (x + 2 <= 9 && y + 2 <= 8) {
                var infoCan = _banco.getItem(x + 1, y + 1);
                if (infoCan == undefined || infoCan == null) {
                    var coCheck = _banco.getItem(x + 2, y + 2);
                    if (coCheck == undefined || coCheck == null) {
                        result.push({ x: x + 2, y: y + 2 });
                    }
                    else {
                        if (coCheck.getInfo().p != info.p) {
                            result.push({ x: x + 2, y: y + 2 });
                        }
                    }
                }
            }

            if (x + 2 <= 9 && y - 2 >= 0) {
                var infoCan = _banco.getItem(x + 1, y - 1);
                if (infoCan == undefined || infoCan == null) {
                    var coCheck = _banco.getItem(x + 2, y - 2);
                    if (coCheck == undefined || coCheck == null) {
                        result.push({ x: x + 2, y: y - 2 });
                    }
                    else {
                        if (coCheck.getInfo().p != info.p) {
                            result.push({ x: x + 2, y: y - 2 });
                        }
                    }
                }
            }

            if (x - 2 >= 5 && y - 2 >= 0) {
                var infoCan = _banco.getItem(x - 1, y - 1);
                if (infoCan == undefined || infoCan == null) {
                    var coCheck = _banco.getItem(x - 2, y - 2);
                    if (coCheck == undefined || coCheck == null) {
                        result.push({ x: x - 2, y: y - 2 });
                    }
                    else {
                        if (coCheck.getInfo().p != info.p) {
                            result.push({ x: x - 2, y: y - 2 });
                        }
                    }
                }
            }

            if (x - 2 >= 5 && y + 2 <= 8) {
                var infoCan = _banco.getItem(x - 1, y + 1);
                if (infoCan == undefined || infoCan == null) {
                    var coCheck = _banco.getItem(x - 2, y + 2);
                    if (coCheck == undefined || coCheck == null) {
                        result.push({ x: x - 2, y: y + 2 });
                    }
                    else {
                        if (coCheck.getInfo().p != info.p) {
                            result.push({ x: x - 2, y: y + 2 });
                        }
                    }
                }
            }
        }
        return result;
    };

    return {
        getInfo: function () {
            return {
                x: info.x,
                y: info.y,
                p: info.p,
                t: info.t
            }
        },
        setInfo: function (_options) {
            _setInfo(_options);
        },
        canMove: function (_banco) {
            return _canMove(_banco);
        },
        Move: function (x, y, banco) {
            _Move(x, y, banco);
        }
    }
}

var SiClass = function (options) {
    var info = {
        x: options.x,
        y: options.y,
        p: options.p == 1 ? 1 : 2, // 1: đỏ, 2: đen
        t: 3
    };

    var _setInfo = function (_options) {
        info.x = _options.x;
        info.y = _options.y;
        info.p = _options.p;
        info.t = _options.t;
    };

    var _Move = function (x, y, banco) {

        var result = _canMove(banco);
        result.forEach(function (item) {
            if (item.x == x && item.y == y) {
                var _image = "";
                if (info.p == 1) {
                    _image = imagesDo[Number(info.t)];
                }
                else {
                    _image = imagesDen[Number(info.t)];
                }
                var infoMove = banco.getItem(x, y);
                if (infoMove != null || infoMove != undefined) {
                    banco.removeItem(infoMove);
                    //localStorage["quanco"] = JSON.stringify(_quanco);
                }

                _setInfo({ x: Number(x), y: Number(y), p: Number(info.p), t: Number(info.t) });
            }
        });

        setTimeout(function () { client.sendMessage({ Topic: vandangchoi, Message: banco.getInfo() }); }, 1000);
    };

    var _canMove = function (_banco) {
        var result = [];
        var x = Number(info.x);
        var y = Number(info.y);
        var p = info.p;
        if (p == "1") {
            if (x + 1 <= 2 && y + 1 <= 5) {
                var infoCo = _banco.getItem(x + 1, y + 1);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x + 1, y: y + 1 });
                    }
                }
                else {
                    result.push({ x: x + 1, y: y + 1 });
                }
            }
            if (x + 1 <= 2 && y - 1 >= 3) {
                var infoCo = _banco.getItem(x + 1, y - 1);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x + 1, y: y - 1 });
                    }
                }
                else {
                    result.push({ x: x + 1, y: y - 1 });
                }
            }

            if (x - 1 >= 0 && y + 1 <= 5) {
                var infoCo = _banco.getItem(x - 1, y + 1);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x - 1, y: y + 1 });
                    }
                }
                else {
                    result.push({ x: x - 1, y: y + 1 });
                }
            }

            if (x - 1 >= 0 && y - 1 >= 3) {
                var infoCo = _banco.getItem(x - 1, y - 1);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x - 1, y: y - 1 });
                    }
                }
                else {
                    result.push({ x: x - 1, y: y - 1 });
                }
            }
        }
        else {
            if (x + 1 <= 9 && y + 1 <= 5) {
                var infoCo = _banco.getItem(x + 1, y + 1);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x + 1, y: y + 1 });
                    }
                }
                else {
                    result.push({ x: x + 1, y: y + 1 });
                }
            }

            if (x + 1 <= 9 && y - 1 >= 3) {
                var infoCo = _banco.getItem(x + 1, y - 1);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x + 1, y: y - 1 });
                    }
                }
                else {
                    result.push({ x: x + 1, y: y - 1 });
                }
            }

            if (x - 1 >= 7 && y + 1 <= 5) {
                var infoCo = _banco.getItem(x - 1, y + 1);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x - 1, y: y + 1 });
                    }
                }
                else {
                    result.push({ x: x - 1, y: y + 1 });
                }
            }

            if (x - 1 >= 7 && y - 1 >= 3) {
                var infoCo = _banco.getItem(x - 1, y - 1);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x - 1, y: y - 1 });
                    }
                }
                else {
                    result.push({ x: x - 1, y: y - 1 });
                }
            }
        }
        return result;
    };

    return {
        getInfo: function () {
            return {
                x: info.x,
                y: info.y,
                p: info.p,
                t: info.t
            }
        },
        setInfo: function (_options) {
            _setInfo(_options);
        },
        canMove: function (_banco) {
            return _canMove(_banco);
        },
        Move: function (x, y, banco) {
            _Move(x, y, banco);
        }
    }
}

var TuongClass = function (options) {
    var info = {
        x: options.x,
        y: options.y,
        p: options.p == 1 ? 1 : 2, // 1: đỏ, 2: đen
        t: 4
    };

    var _setInfo = function (_options) {
        info.x = _options.x;
        info.y = _options.y;
        info.p = _options.p;
        info.t = _options.t;
    };

    var _Move = function (x, y, banco) {
        var result = _canMove(banco);
        result.forEach(function (item) {
            if (item.x == x && item.y == y) {
                var _image = "";
                if (info.p == 1) {
                    _image = imagesDo[Number(info.t)];
                }
                else {
                    _image = imagesDen[Number(info.t)];
                }
                var infoMove = banco.getItem(x, y);
                if (infoMove != null || infoMove != undefined) {
                    banco.removeItem(infoMove);
                    //localStorage["quanco"] = JSON.stringify(_quanco);
                }
                $("#my-widget1").chessBoard("option", {
                    x: x.toString(),
                    y: y.toString(),
                    type: "",
                    player: info.p,
                    image: _image,
                    display: "block"
                });
                $("#my-widget1").chessBoard("option", {
                    x: info.x.toString(),
                    y: info.y.toString(),
                    type: "",
                    player: 0,
                    image: "#",
                    display: "none"
                });
                $("#" + x.toString() + y.toString() + " img").css({ 'top': '-30px' });
                _setInfo({ x: Number(x), y: Number(y), p: Number(info.p), t: Number(info.t) });

                console.log("TENVANDAU ", tenVanDau);
                console.log(JSON.stringify(banco.getInfo()));
                localStorage.setItem(tenVanDau, JSON.stringify(banco.getInfo()));

                _data = { Topic: tenVanDau[tenVanDau.length - 1], Message: banco.getInfo(), Action: "playing" };
            }
        });

        websocket.send(JSON.stringify(_data));
    };

    var _canMove = function (_banco) {
        var result = [];
        var x = Number(info.x);
        var y = Number(info.y);
        var p = info.p;

        if (p == "1") {
            if (x - 1 >= 0) {
                var infoCo = _banco.getItem(x - 1, y);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x - 1, y: y });
                    }
                }
                else {
                    result.push({ x: x - 1, y: y });
                }
            }
            if (y + 1 <= 5) {
                var infoCo = _banco.getItem(x, y + 1);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x, y: y + 1 });
                    }
                }
                else {
                    result.push({ x: x, y: y + 1 });
                }
            }
            if (x + 1 <= 2) {
                var infoCo = _banco.getItem(x + 1, y);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x + 1, y: y });
                    }
                }
                else {
                    result.push({ x: x + 1, y: y });
                }
            }
            if (y - 1 >= 3) {
                var infoCo = _banco.getItem(x, y - 1);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x, y: y - 1 });
                    }
                }
                else {
                    result.push({ x: x, y: y - 1 });
                }
            }
        }
        else {
            if (x - 1 >= 7) {
                var infoCo = _banco.getItem(x - 1, y);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x - 1, y: y });
                    }
                }
                else {
                    result.push({ x: x - 1, y: y });
                }
            }
            if (y + 1 <= 5) {
                var infoCo = _banco.getItem(x, y + 1);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x, y: y + 1 });
                    }
                }
                else {
                    result.push({ x: x, y: y + 1 });
                }
            }
            if (x + 1 <= 9) {
                var infoCo = _banco.getItem(x + 1, y);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x + 1, y: y });
                    }
                }
                else {
                    result.push({ x: x + 1, y: y });
                }
            }

            if (y - 1 >= 3) {
                var infoCo = _banco.getItem(x, y - 1);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x, y: y - 1 });
                    }
                }
                else {
                    result.push({ x: x, y: y - 1 });
                }
            }
        }
        return result;
    };

    return {
        getInfo: function () {
            return {
                x: info.x,
                y: info.y,
                p: info.p,
                t: info.t
            }
        },
        setInfo: function (_options) {
            _setInfo(_options);
        },
        canMove: function (_banco) {
            return _canMove(_banco);
        },
        Move: function (x, y, banco) {
            _Move(x, y, banco);
        }
    }
}

var PhaoClass = function (options) {
    var info = {
        x: options.x,
        y: options.y,
        p: options.p == 1 ? 1 : 2, // 1: đỏ, 2: đen
        t: 5
    };

    var _setInfo = function (_options) {
        info.x = _options.x;
        info.y = _options.y;
        info.p = _options.p;
        info.t = _options.t;
    };

    var _Move = function (x, y, banco) {
        var result = _canMove(banco);
        var _data = null;
        var infoMove = null;
        result.forEach(function (item) {
            if (item.x == x && item.y == y) {
                var _image = "";
                if (info.p == 1) {
                    _image = imagesDo[Number(info.t)];
                }
                else {
                    _image = imagesDen[Number(info.t)];
                }
                infoMove = banco.getItem(x, y);
                if (infoMove != null || infoMove != undefined) {
                    banco.removeItem(infoMove);
                    banco.getInfo();
                }

                _setInfo({ x: Number(x), y: Number(y), p: Number(info.p), t: Number(info.t) });
            }
        });

        setTimeout(function () { client.sendMessage({ Topic: vandangchoi, Message: banco.getInfo() }); }, 1000);
    };

    var _canMove = function (_banco) {
        console.log("Pháo");
        var x = Number(info.x);
        var y = Number(info.y);

        var result = [];
        for (let i = 1; i <= 9; i++) {
            if ((x - i) >= 0) {
                var infoCo = _banco.getItem(x - i, y);
                if (infoCo != undefined || infoCo != null) {
                    for (let j = i + 1; j <= 9; j++) {
                        if (x - j >= 0) {
                            var infoCheck = _banco.getItem(x - j, y);
                            if (infoCheck != null || infoCheck != undefined) {
                                if (info.p != infoCheck.getInfo().p) {
                                    result.push({ x: x - j, y: y });
                                    break;

                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                    break;
                }
                else {
                    result.push({ x: x - i, y: y });

                }
            }
        }

        for (let i = 1; i <= 9 - x; i++) {
            if ((x + i) <= 9) {
                var infoCo = _banco.getItem(x + i, y);
                if (infoCo != undefined || infoCo != null) {
                    for (let j = i + 1; j <= 9; j++) {
                        if (x + j <= 9) {
                            var infoCheck = _banco.getItem(x + j, y);
                            if (infoCheck != null || infoCheck != undefined) {
                                if (info.p != infoCheck.getInfo().p) {
                                    result.push({ x: x + j, y: y });
                                    break;

                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                    break;
                }
                else {
                    result.push({ x: x + i, y: y });

                }
            }
        }

        for (let i = 1; i <= 9; i++) {
            if ((y - i) >= 0) {
                var infoCo = _banco.getItem(x, y - i);
                if (infoCo != undefined || infoCo != null) {
                    for (let j = i + 1; j <= 9; j++) {
                        if (y - j >= 0) {
                            var infoCheck = _banco.getItem(x, y - j);
                            if (infoCheck != null || infoCheck != undefined) {
                                if (info.p != infoCheck.getInfo().p) {
                                    result.push({ x: x, y: y - j });
                                    break;

                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                    break;
                }
                else {
                    result.push({ x: x, y: y - i });

                }
            }
        }

        for (let i = 1; i <= 9; i++) {
            if ((y + i) <= 8) {
                var infoCo = _banco.getItem(x, y + i);
                if (infoCo != undefined || infoCo != null) {
                    for (let j = i + 1; j <= 9; j++) {
                        if (y + j <= 8) {
                            var infoCheck = _banco.getItem(x, y + j);
                            if (infoCheck != null || infoCheck != undefined) {
                                if (info.p != infoCheck.getInfo().p) {
                                    result.push({ x: x, y: y + j });
                                    break;
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                    break;
                }
                else {
                    result.push({ x: x, y: y + i });

                }
            }
        }
        return result;
    };

    return {
        getInfo: function () {
            return {
                x: info.x,
                y: info.y,
                p: info.p,
                t: info.t
            }
        },
        setInfo: function (_options) {
            _setInfo(_options);
        },
        canMove: function (_banco) {
            return _canMove(_banco);
        },
        Move: function (x, y, banco) {
            _Move(x, y, banco);
        }
    }
}

var TotClass = function (options) {
    var info = {
        x: options.x,
        y: options.y,
        p: options.p == 1 ? 1 : 2, // 1: đỏ, 2: đen
        t: 6
    };

    var _setInfo = function (_options) {
        info.x = _options.x;
        info.y = _options.y;
        info.p = _options.p;
        info.t = _options.t;
    };

    var _Move = function (x, y, banco) {
        var result = _canMove(banco);
        result.forEach(function (item) {
            if (item.x == x && item.y == y) {
                var _image = "";
                if (info.p == 1) {
                    _image = imagesDo[Number(info.t)];
                }
                else {
                    _image = imagesDen[Number(info.t)];
                }
                var infoMove = banco.getItem(x, y);
                if (infoMove != null || infoMove != undefined) {
                    banco.removeItem(infoMove);
                    //localStorage["quanco"] = JSON.stringify(_quanco);
                }

                _setInfo({ x: Number(x), y: Number(y), p: Number(info.p), t: Number(info.t) });
            }
        });

        setTimeout(function () { client.sendMessage({ Topic: vandangchoi, Message: banco.getInfo() }); }, 1000);
    };

    var _canMove = function (_banco) {
        var result = [];
        var x = Number(info.x);
        var y = Number(info.y);
        var p = info.p;
        if (p == "1") {
            if (x + 1 <= 5) {
                var infoCo = _banco.getItem(x + 1, y);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x + 1, y: y });
                    }
                }
                else {
                    result.push({ x: x + 1, y: y });
                }
            }
            else {
                if (y + 1 <= 8) {
                    var infoCo = _banco.getItem(x, y + 1);
                    if (infoCo != undefined || infoCo != null) {
                        if (info.p != infoCo.getInfo().p) {
                            result.push({ x: x, y: y + 1 });
                        }
                    }
                    else {
                        result.push({ x: x, y: y + 1 });
                    }
                }

                if (x + 1 <= 9) {
                    var infoCo = _banco.getItem(x + 1, y);
                    if (infoCo != undefined || infoCo != null) {
                        if (info.p != infoCo.getInfo().p) {
                            result.push({ x: x + 1, y: y });
                        }
                    }
                    else {
                        result.push({ x: x + 1, y: y });
                    }
                }
                if (y - 1 >= 0) {
                    var infoCo = _banco.getItem(x, y - 1);
                    if (infoCo != undefined || infoCo != null) {
                        if (info.p != infoCo.getInfo().p) {
                            result.push({ x: x, y: y - 1 });
                        }
                    }
                    else {
                        result.push({ x: x, y: y - 1 });
                    }
                }
            }
        }
        else {
            if (x - 1 >= 4) {
                var infoCo = _banco.getItem(x - 1, y);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x - 1, y: y });
                    }
                }
                else {
                    result.push({ x: x - 1, y: y });
                }
            }
            else {
                if (y + 1 <= 8) {
                    var infoCo = _banco.getItem(x, y + 1);
                    if (infoCo != undefined || infoCo != null) {
                        if (info.p != infoCo.getInfo().p) {
                            result.push({ x: x, y: y + 1 });
                        }
                    }
                    else {
                        result.push({ x: x, y: y + 1 });
                    }
                }
                var infoCo = _banco.getItem(x - 1, y);
                if (infoCo != undefined || infoCo != null) {
                    if (info.p != infoCo.getInfo().p) {
                        result.push({ x: x - 1, y: y });
                    }
                }
                else {
                    result.push({ x: x - 1, y: y });
                }

                if (y - 1 >= 0) {
                    var infoCo = _banco.getItem(x, y - 1);
                    if (infoCo != undefined || infoCo != null) {
                        if (info.p != infoCo.getInfo().p) {
                            result.push({ x: x, y: y - 1 });
                        }
                    }
                    else {
                        result.push({ x: x, y: y - 1 });
                    }
                }
            }
        }
        return result;
    };

    return {
        getInfo: function () {
            return {
                x: info.x,
                y: info.y,
                p: info.p,
                t: info.t
            }
        },
        setInfo: function (_options) {
            _setInfo(_options);
        },
        canMove: function (_banco) {
            return _canMove(_banco);
        },
        Move: function (x, y, banco) {
            _Move(x, y, banco);
        }
    }
}

var BancoControllers = function (options) {
    var _quanco = [];
    var _addItem = function (item) {
        /// Check validate here
        var _x = item.getInfo().x;
        var _y = item.getInfo().y;
        if (_x >= 0 && _x <= 9 && _y >= 0 && _y <= 8) {
            _quanco.push(item);
        }
        else {
            console.log("Vị trí ", _x, _y, " không hợp lệ")
        }
    };
    var _getItem = function (x, y) {
        return _quanco.find(function (item) {
            var info = item.getInfo();
            return info.x == x && info.y == y;
        });
    };

    var _removeItem = function (item) {
        return _quanco = _quanco.filter(function (value) {
            return value.getInfo().x != item.getInfo().x || value.getInfo().y != item.getInfo().y;
        });
    };

    var _getQuanCo = function () {
        return _quanco.map(function (item) {
            return item.getInfo();
        });
    };

    var _setQuanCo = function (qc) {
        var _tmp = [];
        for (var i = 0; i < qc.length; i++) {
            var _itemInfo = null;
            var _x = qc[i].x;
            var _y = qc[i].y;
            var _p = qc[i].p;
            var _t = qc[i].t;
            if (_t == 0) {
                _itemInfo = new XeClass({ x: _x, y: _y, p: _p, t: _t });
            }
            else if (_t == 1) {
                _itemInfo = new MaClass({ x: _x, y: _y, p: _p, t: _t });
            }
            else if (_t == 2) {
                _itemInfo = new BoClass({ x: _x, y: _y, p: _p, t: _t });
            }
            else if (_t == 3) {
                _itemInfo = new SiClass({ x: _x, y: _y, p: _p, t: _t });
            }
            else if (_t == 4) {
                _itemInfo = new TuongClass({ x: _x, y: _y, p: _p, t: _t });
            }
            else if (_t == 5) {
                _itemInfo = new PhaoClass({ x: _x, y: _y, p: _p, t: _t });
            }
            else {
                _itemInfo = new TotClass({ x: _x, y: _y, p: _p, t: _t });
            }
            _tmp.push(_itemInfo);
        }
        _quanco = _tmp;
    }

    return {
        setQuanCo: function (qc) {
            _setQuanCo(qc);
        },
        getInfo: function () {
            return _quanco.map(function (item) {
                return item.getInfo();
            });
        },
        getItem: function (x, y) {
            return _getItem(x, y);
        },
        getQuanCo: function () {
            return _getQuanCo();
        },
        addItem: function (item) {
            _addItem(item);
        },
        init: function () {
            //common.Log("BanCoControllers init");
            _addItem(new XeClass({ x: 0, y: 0, p: 1 }));
            _addItem(new MaClass({ x: 0, y: 1, p: 1 }));
            _addItem(new BoClass({ x: 0, y: 2, p: 1 }));
            _addItem(new SiClass({ x: 0, y: 3, p: 1 }));
            _addItem(new TuongClass({ x: 0, y: 4, p: 1 }));
            _addItem(new SiClass({ x: 0, y: 5, p: 1 }));
            _addItem(new BoClass({ x: 0, y: 6, p: 1 }));
            _addItem(new MaClass({ x: 0, y: 7, p: 1 }));
            _addItem(new XeClass({ x: 0, y: 8, p: 1 }));

            _addItem(new PhaoClass({ x: 2, y: 1, p: 1 }));
            _addItem(new PhaoClass({ x: 2, y: 7, p: 1 }));

            _addItem(new TotClass({ x: 3, y: 0, p: 1 }));
            _addItem(new TotClass({ x: 3, y: 2, p: 1 }));
            _addItem(new TotClass({ x: 3, y: 4, p: 1 }));
            _addItem(new TotClass({ x: 3, y: 6, p: 1 }));
            _addItem(new TotClass({ x: 3, y: 8, p: 1 }));


            _addItem(new XeClass({ x: 9, y: 0, p: 2 }));
            _addItem(new MaClass({ x: 9, y: 1, p: 2 }));
            _addItem(new BoClass({ x: 9, y: 2, p: 2 }));
            _addItem(new SiClass({ x: 9, y: 3, p: 2 }));
            _addItem(new TuongClass({ x: 9, y: 4, p: 2 }));
            _addItem(new SiClass({ x: 9, y: 5, p: 2 }));
            _addItem(new BoClass({ x: 9, y: 6, p: 2 }));
            _addItem(new MaClass({ x: 9, y: 7, p: 2 }));
            _addItem(new XeClass({ x: 9, y: 8, p: 2 }));

            _addItem(new PhaoClass({ x: 7, y: 1, p: 2 }));
            _addItem(new PhaoClass({ x: 7, y: 7, p: 2 }));

            _addItem(new TotClass({ x: 6, y: 0, p: 2 }));
            _addItem(new TotClass({ x: 6, y: 2, p: 2 }));
            _addItem(new TotClass({ x: 6, y: 4, p: 2 }));
            _addItem(new TotClass({ x: 6, y: 6, p: 2 }));
            _addItem(new TotClass({ x: 6, y: 8, p: 2 }));
            /// todo here

            var viewClass = new ViewClass({ banco: banco.getInfo() });
            viewClass.viewIndex();
        },
        removeItem: function (item) {
            _removeItem(item);
        }
    };
}

var ViewClass = function (options) {
    var data = {
        banco: options.banco
    };


    var _addNguoiChoi = function (list, item) {
        list.push(item);
    }

    var _viewIndex = function () {
        setTimeout(function () { client.sendMessage({ Topic: "viewIndex", Message: "new" }); }, 3000);
    };

    var _clickBtnUpload = function () {
        $(function () {
            $(".upload").click(function () {
                alert("click");
            });
        });
    }

    var _clickBtnBatDau = function () {
        $(function () {
            $("#btn-submit").click(function () {
                var radioChecked = $("input[name='vandau']:checked").val();

                if (radioChecked == "ip-taovanmoi") {
                    var _data = { Topic: "init", Message: data.banco };
                    setTimeout(function () {
                        client.sendMessage(JSON.stringify(_data));
                    }, 1000);
                }
                else {
                    var _radioChecked = radioChecked.toString();
                    var _id = _radioChecked.substr(1);
                    vandangchoi = _id.toString();
                    var _type = _radioChecked.substr(0, 1);

                    //login
                    var _nickname = $("#namePlayer").val();

                    if (_type == "r") {
                        nguoichoi = "player1";

                    }
                    else {
                        nguoichoi = "player2";
                    }

                    var _dataStorage = JSON.parse(localStorage.listStorage).Message;
                    var _bancohientai = null;
                    for (var i = 0; i < _dataStorage.length; i++) {
                        if (_dataStorage[i].Topic == _id.toString()) {
                            _bancohientai = _dataStorage[i].Message;
                            banco.setQuanCo(_bancohientai);
                        }
                    }
                    $("#my-widget1").chessBoard();
                    client.sendMessage("{\"Topic\":\"startGame\",\"Message\":\"" + _id.toString() + "\",\"PlayerName\":\"" + _nickname + "\",\"Type\":\"" + _type + "\"}");
                }
            });

        });
    }
    return {
        viewIndex: function () {
            _viewIndex();
            _clickBtnBatDau();
        },
        viewClickUpload: function () {
            _clickBtnUpload();
        },
        addNguoiChoi: function (item) {
            _addNguoiChoi(item);
        }
    }
}