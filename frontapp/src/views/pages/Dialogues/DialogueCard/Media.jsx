import React from 'react';

class Media extends React.Component {
  constructor(props) {
    super(props);
    this.mediaRef = React.createRef();
  }

  render() {
    const { source } = this.props;

    if (source.video_url) {
      return (
        <video
          crossOrigin='true'
          ref={this.mediaRef}
          id='player'
          style={{ maxWidth: '100%' }}
          src={source.video_url}
          controls
        />
      );
    } else {
      return (
        <audio
          crossOrigin='true'
          ref={this.mediaRef}
          id='player'
          style={{ maxWidth: '100%', width: '100%' }}
          src={source.audio_url}
          controls
        />);
    }
  }
}

export default Media;
