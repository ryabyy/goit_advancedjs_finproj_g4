import { ExerciseCard } from './exer-card.js';
import { ExerciseCardPH } from './exer-card-ph.js';

// Mock data
const LIST = [
  {
    "_id": "64f389465ae26083f39b17a4",
    "bodyPart": "waist",
    "equipment": "body weight",
    "gifUrl": "https://ftp.goit.study/img/power-pulse/gifs/0003.gif",
    "name": "air bike",
    "target": "abs",
    "description": "This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",
    "rating": 3.6,
    "burnedCalories": 312,
    "time": 3,
    "popularity": 1
  },
  {
    "_id": "64f389465ae26083f39b17a5",
    "bodyPart": "waist",
    "equipment": "body weight",
    "gifUrl": "https://ftp.goit.study/img/power-pulse/gifs/0006.gif",
    "name": "alternate heel touchers",
    "target": "abs",
    "description": "This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",
    "rating": 5.1,
    "burnedCalories": 116,
    "time": 3,
    "popularity": 1
  },
  {
    "_id": "64f389465ae26083f39b17a6",
    "bodyPart": "back",
    "equipment": "cable",
    "gifUrl": "https://ftp.goit.study/img/power-pulse/gifs/0007.gif",
    "name": "alternate lateral pulldown",
    "target": "lats",
    "description": "These large back muscles are responsible for shoulder adduction and horizontal extension. Pull-ups and lat pulldowns are common exercises targeting the lats.",
    "rating": 3,
    "burnedCalories": 70,
    "time": 3,
    "popularity": 1
  },
  {
    "_id": "64f389465ae26083f39b17a4",
    "bodyPart": "waist",
    "equipment": "body weight",
    "gifUrl": "https://ftp.goit.study/img/power-pulse/gifs/0003.gif",
    "name": "air bike",
    "target": "abs",
    "description": "This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",
    "rating": 3,
    "burnedCalories": 312,
    "time": 3,
    "popularity": 1
  },
  {
    "_id": "64f389465ae26083f39b17a5",
    "bodyPart": "waist",
    "equipment": "body weight",
    "gifUrl": "https://ftp.goit.study/img/power-pulse/gifs/0006.gif",
    "name": "alternate heel touchers",
    "target": "abs",
    "description": "This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",
    "rating": 3,
    "burnedCalories": 116,
    "time": 3,
    "popularity": 1
  },
  {
    "_id": "64f389465ae26083f39b17a6",
    "bodyPart": "back",
    "equipment": "cable",
    "gifUrl": "https://ftp.goit.study/img/power-pulse/gifs/0007.gif",
    "name": "alternate lateral pulldown",
    "target": "lats",
    "description": "These large back muscles are responsible for shoulder adduction and horizontal extension. Pull-ups and lat pulldowns are common exercises targeting the lats.",
    "rating": 3,
    "burnedCalories": 70,
    "time": 3,
    "popularity": 1
  }
];

// TODO: placeholder test
const exerCard = new ExerciseCard('favorites-list');
const placeholder = new ExerciseCardPH('favorites-list');

placeholder.addCardHolder(LIST.length);
setTimeout(() => {
  placeholder.removeCardHolder();
  exerCard.updateList(LIST);
}, 5000);
