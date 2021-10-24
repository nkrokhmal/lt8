import * as React from 'react';
import { openviduSecret, openviduServerUrl } from 'constants/Network';
import VideoRoomComponent from '../../../OpenVidu/components/VideoRoomComponent';
import { LocalStorageProvider } from 'data/providers';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid'
import { notification } from 'antd';


class VideoCall extends React.Component {
  constructor(props) {
    super(props);

    this._storage = new LocalStorageProvider();
    this.sessionId = this._storage.load('apprtc_session_id');
  }

  componentDidMount = () => {
    notification.open({
      key: 'notificationId',
      duration: 0,
      placement: 'bottomRight', 
      message: 'Запись началась!',
      description:
        `Начинайте разговор. Как только вы выйдете из этого режима, система автоматически посчитает все что Вы сказали в текст. 
        Также Вы можете скопировать ссылку из адресной строки браузера и поделиться ею с кем-нибудь еще.
        Таким образом Вы можете организовать конференцию в режиме реального времени с видео до 100 учасников!`,
      // onClick: () => {
      // },
    });
  }

  componentWillUnmount = () => {
    notification.close('notificationId');
  }

  render() {
    // const sessionName = match.params.userId;
    // const userName = auth.loggedIn ? auth.user.sub : null;
    return (
      <VideoRoomComponent
        openviduServerUrl={openviduServerUrl}
        openviduSecret={openviduSecret}
        sessionName={this.sessionId}
        user={this.sessionId}
      />
    );
  }  
};

const mapStateToProps = (store) => ({
  auth: store.auth
});

export default connect(mapStateToProps)(VideoCall);
