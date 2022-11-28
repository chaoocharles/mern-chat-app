const chatModel = require("../Models/chatModel");

const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  const newChat = new chatModel({
    members: [senderId, receiverId],
  });

  try {
    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userChats = async (req, res) => {
  const { userId } = req.body;

  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createChat, userChats, findChat };
