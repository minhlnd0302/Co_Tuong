$(function () {
    $.widget("custom.chessBoard", {
        options: {
            chess: banco.getInfo(),
            allow: "1" //1 là được đánh, 0 là không được
        },

        _create: function () {

            this.tbl = "<table id='chess-board'></table>";
            this.element.append(this.tbl);
            this.table = $("#chess-board");
            this._refresh();
        },

        _refresh: function () {
            $("#chess-board").empty();

            this.tr0 = "<tr id='tr0'></tr>";
            this.tr1 = "<tr id='tr1'></tr>";
            this.tr2 = "<tr id='tr2'></tr>";
            this.tr3 = "<tr id='tr3'></tr>";
            this.tr4 = "<tr id='tr4'></tr>";
            this.tr5 = "<tr id='tr5'></tr>";
            this.tr6 = "<tr id='tr6'></tr>";
            this.tr7 = "<tr id='tr7'></tr>";
            this.tr8 = "<tr id='tr8'></tr>";
            this.tr9 = "<tr id='tr9'></tr>";

            if (nguoichoi == "player1") {
                this.table.append(this.tr9);
                this.table.append(this.tr8);
                this.table.append(this.tr7);
                this.table.append(this.tr6);
                this.table.append(this.tr5);
                this.table.append(this.tr4);
                this.table.append(this.tr3);
                this.table.append(this.tr2);
                this.table.append(this.tr1);
                this.table.append(this.tr0);
                for (var i = 0; i <= 9; i++) {
                    for (var j = 0; j <= 8; j++) {
                        var item = banco.getItem(i, j);
                        this.div = "";
                        this.td = "";
                        if (j == 8 || i == 0) {
                            this.td = "<td id=td" + i.toString() + j.toString() + " class='none-border'></td>";
                        }
                        else {
                            if (i == 5) {
                                this.td = "<td id=td" + i.toString() + j.toString() + " style='background-color:#e3c373;border-right: 1px solid #e3c373;'></td>";
                            }
                            else if (((i >= 1 && i <= 2) && (j >= 3 && j <= 4)) || ((i >= 8 && i <= 9) && (j >= 3 && j <= 4))) {
                                this.td = "<td id=td" + i.toString() + j.toString() + "  style ='background-color:#d6a325'></td>";
                            }
                            else {
                                this.td = "<td id=td" + i.toString() + j.toString() + "  style ='background-color:#f1d386'></td>";
                            }
                        }

                        $("#tr" + i.toString()).append(this.td);

                        if (item != null || item != undefined) {
                            this.div =
                                "<div id=" + i.toString() + j.toString() +
                                "><img class='chess' src=";
                            if (item.getInfo().p == 1) {
                                this.div += imagesDo[item.getInfo().t];
                            }
                            else {
                                this.div += imagesDen[item.getInfo().t];
                            }
                            this.div += " /><button class='point' id=point" + i.toString() + j.toString() + " style='display:none;'></button>" +
                                "</div>";
                        }
                        else {
                            this.div = "<div id=" + i.toString() + j.toString() + "><img class='chess' src='#' style='display:none'><button style='display:none;' class='point' id=point" + i.toString() + j.toString() + "></button></div>";
                        }

                        var id = "#td" + i.toString() + j.toString();
                        $(id).append(this.div);
                    }
                }
            }
            else {
                this.table.append(this.tr0);
                this.table.append(this.tr1);
                this.table.append(this.tr2);
                this.table.append(this.tr3);
                this.table.append(this.tr4);
                this.table.append(this.tr5);
                this.table.append(this.tr6);
                this.table.append(this.tr7);
                this.table.append(this.tr8);
                this.table.append(this.tr9);

                for (var i = 9; i >= 0; i--) {
                    for (var j = 8; j >= 0; j--) {
                        var item = banco.getItem(i, j);
                        this.div = "";
                        this.td = "";
                        if (j == 0 || i == 9) {
                            this.td = "<td id=td" + i.toString() + j.toString() + " class='none-border'></td>";
                        }
                        else {
                            if (i == 4) {
                                this.td = "<td id=td" + i.toString() + j.toString() + " style='background-color:#e3c373;border-right: 1px solid #e3c373;'></td>";
                            }
                            else if (((i >= 0 && i <= 1) && (j >= 4 && j <= 5)) || ((i >= 7 && i <= 8) && (j >= 4 && j <= 5))) {
                                this.td = "<td id=td" + i.toString() + j.toString() + "  style ='background-color:#d6a325'></td>";
                            }
                            else {
                                this.td = "<td id=td" + i.toString() + j.toString() + "  style ='background-color:#f1d386'></td>";
                            }
                        }
                        $("#tr" + i.toString()).append(this.td);

                        if (item != null || item != undefined) {
                            this.div =
                                "<div id=" + i.toString() + j.toString() +
                                "><img class='chess' src=";
                            if (item.getInfo().p == 1) {
                                this.div += imagesDo[item.getInfo().t];
                            }
                            else {
                                this.div += imagesDen[item.getInfo().t];
                            }
                            this.div += " /><button class='point' id=point" + i.toString() + j.toString() + " style='display:none;'></button>" +
                                "</div>";
                        }
                        else {
                            this.div = "<div id=" + i.toString() + j.toString() + "><img class='chess' src='#' style='display:none'><button style='display:none;' class='point' id=point" + i.toString() + j.toString() + "></button></div>";
                        }

                        var id = "#td" + i.toString() + j.toString();
                        $(id).append(this.div);
                    }
                }
            }

            this.imgageClick = $("img");
            this.changer = $(".point");
            this.idbandau = "";

            this._on(this.imgageClick, {
                // _on won't call random when widget is disabled
                click: "myFunction1"
                //click: "_imageClick"
            });
            this._on(this.changer, {
                // _on won't call random when widget is disabled
                click: "myFunction"
            });
        },
        myFunction: function (event) {
            var id2 = event.target.id;
            var idbandau = this.idbandau;

            var _x = idbandau[0];
            var _y = idbandau[1];
            var _chess = banco.getItem(_x, _y);

            _chess.Move(id2[Number(id2.length) - 2], id2[Number(id2.length) - 1], banco);

            var _id2 = id2[Number(id2.length) - 2] + id2[Number(id2.length) - 1];

            var div = this.element.find("#" + idbandau);
            var img = div.find("img");
            var src = img.attr('src');
            img.attr({ "src": "#" });
            img.css({ "display": "none" });

            var div1 = this.element.find("#" + _id2);
            var img1 = div1.find("img");
            img1.attr({ "src": src });
            img1.css({ "display": "block" });

            $(".point").css({ "display": "none" });

            duocdanh = 0;
        },
        myFunction1: function (event) {
            if (duocdanh == 1) {
                this.idbandau = event.target.parentElement.id;

                $(".point").css({ "display": "none" });
                $(".chess").css({ 'top': '-31px' });

                var id = this.idbandau;

                var _x = id[0];
                var _y = id[1];
                var chess = banco.getItem(_x, _y);
                if (nguoichoi == "player" + chess.getInfo().p.toString()) {
                    var resultCanMove = chess.canMove(banco);
                    resultCanMove.forEach(function (item) {
                        var getItem = banco.getItem(item.x, item.y);
                        var id2 = "point" + item.x.toString() + item.y.toString();
                        $("#" + id2).css({ 'display': 'block', 'top': '-32px' });
                        if (getItem != null) {
                            $("#" + id2).css({ 'display': 'block', 'top': '-55px' });
                            $("#" + item.x.toString() + item.y.toString() + " .chess").css({ 'top': '-23px' });

                        }
                        else {
                            $('#' + id2).css({ 'display': 'block' });
                        }
                    });
                }
            }

        },
        // _setOptions is called with a hash of all options that are changing
        // always refresh when changing options
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context
            this._superApply(arguments);
            this._refresh();
        },
        // _setOption is called for each individual option that is changing
        _setOption: function (key, value) {
            this._super(key, value);
        }
    });
});