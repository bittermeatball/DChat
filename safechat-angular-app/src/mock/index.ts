import { Auth } from 'src/app/core/models/auth.model';
import { Conversation } from 'src/app/core/models/conversation.model';
import { Message } from 'src/app/core/models/message.model';

export const senderA: Auth = {
  id: 'aea20741Dabb5645a8a0ba3473364A4d29448',
  name: 'Dang Ngoc Phu',
  avatar: 'https://res.cloudinary.com/i-m-rim/image/upload/v1627479900/dsc/dsc_icon_light_e46gne.png',
}

export const senderB: Auth = {
  id: '1Deaab5645a8207464A4ba34733a0bad29448',
  name: 'Nguyen Ngoc Quang',
  avatar: 'https://res.cloudinary.com/i-m-rim/image/upload/v1627479900/dsc/dsc_icon_light_e46gne.png',
}

export const senderC: Auth = {
  id: '07464A4ba34733a01Deaab5645a82bad29448',
  name: 'Nguyen Huu Nguyen Y',
  avatar: 'https://res.cloudinary.com/i-m-rim/image/upload/v1627479900/dsc/dsc_icon_light_e46gne.png',
}

export const message1: Message = {
  id: 'aea3473bb56454A2074a36b1Daa8a04d29448',
  sender: senderA,
  message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  createdAt: new Date(),
}

export const message2: Message = {
  id: '454Aaea3473bb56201Daa8a0474a36bd29448',
  sender: senderC,
  message: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution",
  createdAt: new Date(),
}

export const message3: Message = {
  id: 'ea347a1Daa8a03bbb56454A2074a364d29448',
  sender: senderA,
  message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable",
  createdAt: new Date(),
}

export const message4: Message = {
  id: 'a36bd29473bb56201Daa54Aaea348a0474448',
  sender: senderB,
  message: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old",
  createdAt: new Date(),
}

export const contacts: Auth[] = [senderA, senderB]

export const conversations: Conversation[] = [
  {
    id: '2074a36b1Daea3473bb56454Aaa8a04d29448',
    title: 'My suprere secret talk with hehe boi',
    thumbnail: 'https://res.cloudinary.com/i-m-rim/image/upload/v1607274448/samples/food/pot-mussels.jpg',
    contacts: [senderA, senderC],
    messages: [message1, message2],
    files: [],
    images: [],
    lastMessage: message2,
    lastMessageSender: senderA,
    lastMessageAt: new Date(),
  },
  {
    id: 'ba3574ab5641Dea64A44733a820a0bad29448',
    title: 'Conversation with Biru',
    thumbnail: '',
    contacts: [senderA, senderB],
    messages: [message3, message4],
    files: [],
    images: [],
    lastMessage: message4,
    lastMessageSender: senderB,
    lastMessageAt: new Date(),
  }
]
