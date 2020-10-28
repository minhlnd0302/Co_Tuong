using Newtonsoft.Json.Linq;
using SuperSocket.WebSocket;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Websocket_CoTuong
{
    class Program
    { 
        public class NuocDi
        {
            public string PlayerId { get; set; }
            public string Message { get; set; }
            public string Topic { get; set; }
        }

        public class VanCo
        {
            public string VanCoId { get; set; }
            public NuocDi nuocDi { get; set; }
        }

        public static List<VanCo> ListVanCo = new List<VanCo>();

        public class nguoiChoi
        {
            public string nickName { get; set; }
            public string type { get; set; }//r là đỏ, b là đen
            public string topic { get; set; }
        }

        public static List<nguoiChoi> ListNguoiChoi = new List<nguoiChoi>();

        private static WebSocketServer wsServer;
        static void Main(string[] args)
        {
            wsServer = new WebSocketServer();
            int port = 8088;
            wsServer.Setup(port);
            wsServer.NewSessionConnected += WsServer_NewSessionConnected;
            wsServer.NewMessageReceived += WsServer_NewMessageReceived;
            wsServer.NewDataReceived += WsServer_NewDataReceived;
            wsServer.SessionClosed += WsServer_SessionClosed;

            wsServer.Start();
            Console.WriteLine("Server is running on port " + port + ". Press ENTER to exit....");
            Console.ReadKey();
        }

        private static void WsServer_SessionClosed(WebSocketSession session, SuperSocket.SocketBase.CloseReason value)
        {
            Console.WriteLine("SessionClosed");
        }

        private static void WsServer_NewDataReceived(WebSocketSession session, byte[] value)
        {
            Console.WriteLine("NewDataReceived");
        } 
        private static void WsServer_NewMessageReceived(WebSocketSession session, string data)
        { 

            if (_data["Topic"].ToString() == "startGame")
            {
                session.Items["Topic"] = _data["Message"].ToString();

                var nguoichoi = new nguoiChoi();
                nguoichoi.type = _data["Type"].ToString();
                nguoichoi.nickName = _data["PlayerName"].ToString();
                nguoichoi.topic = _data["Message"].ToString();

                var check = false;
                //kiểm tra xem nickname nào đó đã có trên server, nếu có rồi thì cập nhật lại type vs topic
                for (int i = 0; i < ListNguoiChoi.Count; i++)
                {
                    if (ListNguoiChoi[i].nickName.ToString() == nguoichoi.nickName)
                    {
                        ListNguoiChoi[i].topic = nguoichoi.topic.ToString();
                        ListNguoiChoi[i].type = nguoichoi.type.ToString();
                        check = true;
                        break;
                    }
                }

                if (!check)
                {
                    ListNguoiChoi.Add(nguoichoi);
                }

                var json = "{" + ListNguoiChoiToJson() + "}";
                //foreach (var item in wsServer.GetAllSessions())
                //{
                session.Send(json);
                //}
                return;
            }

            //gửi data lên, upload data=> cần phải check xem có topic đó chưa, nếu có rồi thì update
            var flag = false;
            //đoạn này giành cho lúc đánh cờ gửi data lên
            for (int i = 0; i < ListVanCo.Count; i++)
            {
                if (_data["Topic"].ToString() == ListVanCo[i].VanCoId)
                {
                    ListVanCo[i].nuocDi.Message = _data["Message"].ToString();
                    flag = true;
                }

            }

            //đoạn này giành cho upload
            //thường thì upload là thêm mới
            if (!flag)
            {
                AddList(_data);
                var strW = ListToJson();
                WriteTxt(strW);

                var aText = getStringFromTextFile();

                UpdateText();
                foreach (var item in wsServer.GetAllSessions())
                {
                    item.Send(aText);
                }

            }
            else
            {
                //list sang json rồi lưu vào txtSaveListToSendClient
                var strW = ListToJson();
                WriteTxt(strW);
                var aText = getStringFromTextFile();

                //update lại dbLichSuVanDau
                UpdateText();
                //Action: là đang chơi, nên gửi cho nhiều client
                var _dt = aText.Substring(0, aText.Length - 1) + ",\"Action\":\"" + _data["Topic"].ToString() + "\"}";

                foreach (var item in wsServer.GetAllSessions())
                {
                    Console.WriteLine("SessionID: " + session.SessionID);
                    //if(session.Items["Topic"].ToString().Equals(_data["Topic"].ToString()))
                    //{
                    //    Console.WriteLine(session.SessionID);
                    //}

                    if (session.SessionID != item.SessionID && item.Items["Topic"].ToString() == _data["Topic"].ToString())
                    {
                        item.Send(_dt);
                    }
                }
                //session.Send(_dt);
            }
        }

        private static void WsServer_NewSessionConnected(WebSocketSession session)
        {
            Console.WriteLine("NewSessionConnected");
        }
    }
}
