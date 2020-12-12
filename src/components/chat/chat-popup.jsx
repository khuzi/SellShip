import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  ChatList,
  ChatListItem,
  Avatar,
  Column,
  Row,
  Title,
  Subtitle,
  MessageList,
  Message,
  MessageText,
  TextComposer,
} from "@livechat/ui-kit";
import Cookies from "universal-cookie";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import Moment from "react-moment";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatPopup = () => {
  const [chats, setChats] = useState([]);
  const [open, setOpen] = useState(false);
  const cookies = new Cookies();
  const userid = cookies.get("login");
  const [openChatRoom, setOpenChatRoom] = useState(false);
  const [recievedChats, setRecievedChats] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sendReceiverId, setSendRecieverId] = useState("");
  const [sendMessageId, setSendMessageId] = useState("");
  const [productName, setProductName] = useState("");

  useEffect(() => {
    if(chats.length){
      return;
    }
    else{
      getChats()
    }
  });

  const getChats = async () => {
    const { data } = await axios.get(
      "https://api.sellship.co/api/messagedetail/" + userid
    );
    setChats(data);
    console.log(data);
  };

  const openChatWindow = () => {
    setOpen(!open);
  };

  const showChats = (messageid) => {
    const skip = 200;
    const getMessages = async () => {
      const { data } = await axios.get(
        "https://api.sellship.co/api/getmessagesuser/" +
          messageid +
          "/" +
          userid +
          "/" +
          skip
      );
      setRecievedChats(data);
      console.log(data);
      if (data[0].sender === userid) {
        setSendRecieverId(data[0].reciever);
      } else {
        setSendRecieverId(data[0].sender);
      }
      setSendMessageId(messageid);
    };
    getMessages();
    setOpenChatRoom(true);
  };

  let formData = new FormData();
  formData.append("message", chatMessage);

  let sendMessage = (senderid, receiveid, messageroomid) => {
    if (chatMessage === "") {
      alert("you can't send empty messages");
      return;
    }
    let options = {
      headers: {
        Content_Type: "multipart/form-data",
        "ACCESS-CONTROl-ALLOW-ORIGIN": "*",
      },
      method: "POST",
      body: formData,
    };

    fetch(
      "https://api.sellship.co/api/sendmessage/" +
        senderid +
        "/" +
        receiveid +
        "/" +
        messageroomid,
      options
    ).then((response) => {
      if (response.status === 200) {
        setSubmitted(true);
        console.log(submitted);
        getChats();
      }
    });
  };

  const theme = {
    vars: {
      "primary-color": "#427fe1",
      "secondary-color": "#fbfbfb",
      "tertiary-color": "#fff",
    },
    ChatListItem: {
      Avatar: {
        css: {
          width: "42px",
          height: "42px",
        },
      },
    },
    Message: {
      css: {
        fontWeight: "bold",
      },
    },
    MessageList: {
      css: {
        marginTop: "2rem",
      },
    },
  };

  return (
    <div
      className={`fixed bottom-0 right-0 z-10 bg-white ${
        !open ? "h-10" : "h-95"
      } overflow-auto rounded-t-lg shadow-lg w-70`}
    >
      <ThemeProvider theme={theme}>
        {open ? (
          <>
            <div
              className="fixed bg-white mr-6 rounded-t-lg h-10 w-70"
              onClick={openChatWindow}
            >
              <p className="ml-2 font-bold pt-2 text-orange-400">Chats</p>
            </div>
            {!openChatRoom ? (
              <ChatList style={{ marginTop: "2rem" }}>
                {chats.map((chat) => {
                  // let lastDate;
                  // try {
                  //   if (chat.date.$date === undefined) {
                  //     lastDate = 9999999;
                  //   } else {
                  //     lastDate = chat.date.$date;
                  //     console.log("last message date", lastDate);
                  //   }
                  // } catch (e) {
                  //   console.log("Error finding date", e);
                  // }
                  if (chat.unread) {
                    return (
                      <ChatListItem
                        key={chat.msgid}
                        onClick={() => {
                          showChats(chat.msgid);
                          setProductName(chat.itemname);
                        }}
                        active
                      >
                        <Avatar imgUrl={chat.profilepicture} />
                        <Column fill>
                          <Row justify>
                            <Title ellipsis>{chat.itemname}</Title>
                            {/* <Subtitle nowrap>
                              {lastDate? (
                                <Moment fromNow ago>
                                  {lastDate}
                                </Moment>
                              ) : (
                                ''
                              )}
                            </Subtitle> */}
                          </Row>
                          <Subtitle ellipsis>{chat.lastrecieved}</Subtitle>
                        </Column>
                      </ChatListItem>
                    );
                  } else {
                    return (
                      <ChatListItem
                        key={chat.msgid}
                        onClick={() => {
                          showChats(chat.msgid);
                          setProductName(chat.itemname);
                        }}
                      >
                        <Avatar imgUrl={chat.profilepicture} />
                        <Column>
                          <Row justify>
                            <Title ellipsis>{chat.itemname}</Title>
                            {/* <Subtitle nowrap>
                              {lastDate ? (
                                <Moment fromNow ago>
                                  {lastDate}
                                </Moment>
                              ) : (
                                ''
                              )}
                            </Subtitle> */}
                          </Row>
                          <Subtitle ellipsis>{chat.lastrecieved}</Subtitle>
                        </Column>
                      </ChatListItem>
                    );
                  }
                })}
              </ChatList>
            ) : (
              <div>
                <ScrollToBottom>
                  <div className="fixed flex w-70 bg-white">
                    <button
                      onClick={() => {
                        setOpenChatRoom(false);
                        setProductName("");
                        setRecievedChats([]);
                        setSendMessageId("");
                        getChats();
                      }}
                      className="text-orange-400 flex-initial"
                    >
                      <ArrowBackIcon />
                    </button>
                    <p className="flex-1 font-bold my-auto text-center text-orange-400 truncate">
                      {productName}
                    </p>
                  </div>
                  <MessageList className="mb-32">
                    {recievedChats.length ? (
                      recievedChats.map((message) => {
                        if (message.sender === userid) {
                          return (
                            <Message
                              isOwn={true}
                              className="bg-orange-400 text-white shadow-sm rounded-sm mt-5"
                              date={
                                <Moment fromNow ago>
                                  {message.date.$date}
                                </Moment>
                              }
                            >
                              <MessageText>{message.message}</MessageText>
                            </Message>
                          );
                        } else {
                          return (
                            <Message
                              className="bg-white text-orange-400 shadow-sm rounded-sm mt-5"
                              date={
                                <Moment fromNow ago>
                                  {message.date.$date}
                                </Moment>
                              }
                            >
                              <MessageText>{message.message}</MessageText>
                            </Message>
                          );
                        }
                      })
                    ) : (
                      <div className="my-20 pl-12  text-orange-400 font-bold">
                        <p>Be the first to send a message</p>
                      </div>
                    )}
                    {openChatRoom ? (
                      <TextComposer className="fixed flex justify-between bottom-0 mt-20 w-66">
                        <input
                          className=""
                          type="text"
                          value={chatMessage}
                          placeholder="Write a message"
                          onChange={(e) => setChatMessage(e.target.value)}
                        />
                        <button
                          className="w-5  text-orange-400"
                          onClick={() => {
                            sendMessage(userid, sendReceiverId, sendMessageId);
                            console.log(userid, sendReceiverId, sendMessageId);
                            showChats(sendMessageId);
                            setChatMessage("");
                            getChats();
                            setRecievedChats([]);
                          }}
                        >
                          <SendIcon />
                        </button>
                      </TextComposer>
                    ) : (
                      ""
                    )}
                  </MessageList>
                </ScrollToBottom>
              </div>
            )}
          </>
        ) : (
          <div
            className="fixed bg-orange-400 bottom-0 right-0 mr-3 rounded-t-lg h-10 w-70"
            onClick={openChatWindow}
          >
            <p className="ml-2 font-bold pt-2 text-white">Chats</p>
          </div>
        )}
      </ThemeProvider>
    </div>
  );
};

export default ChatPopup;
