import * as React from 'react';
import { Avatar, Comment } from 'antd';


const SpeechToText = ({ recognition, date, stt_recognition }) => {
  if (!recognition) {
    return 'Распознавание текста в процессе... Подождите...'
  }
  return (
    <div>
      <Comment
        author={stt_recognition ? 'Отредактировано пользователем' : null}
        avatar={
          <Avatar
            src={'/img/noavatar.jpg'}
            alt='avatar'
          />
        }
        // datetime={date.format('HH:mm:ss')}
        content={
          <p>
            {stt_recognition ? stt_recognition : recognition.map((word, i) =>
              (<Word key={i} text={word.Word} time={word.Time} />)
            )}
          </p>
        }
      />
    </div>);
};


export default SpeechToText;


const Word = ({ text, time }) => {
  return (
    // <span onClick={() => playVideoFromSecond(time)}>{text} </span>
    <span>{text} </span>
  );
};

const playVideoFromSecond = (time) => {
  // todo: convert time to seconds
  const sec = time;
  const media = document.getElementById('player');

  media.currentTime = sec;
  media.play();
};
