import * as React from 'react';
import { Upload, Button, Alert } from 'antd';
import { Icon } from 'views/atoms';
import Layout from 'views/layouts';
import { message } from 'antd';
import { DEFAULT_PROTOCOL, DEFAULT_HOST } from 'constants/Network';


class UploadAudio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      uploaded: null
    };
  }


  render() {
    const { loading, uploaded } = this.state;

    const props = {
      name: 'file',
      action: (file) => {
        const filetype = file.type.split('/')[0];
        const type = filetype === 'audio' ? 'upload_audios' : 'upload_videos';
        return `${DEFAULT_PROTOCOL}://${DEFAULT_HOST}/conference/${type}/`;
      },
      headers: {
        // authorization: `Bearer ${auth}`,
        accept: 'application/json'
      },
      data: {
        conference_in: JSON.stringify({
          name: 'test filename',
          date: new Date().toISOString()
        })
      },
      // todo: handle 403 error
      onChange: (info) => {
        this.setState({ loading: true });
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} успешно загружен.`);
          this.setState({ loading: false, uploaded: info.file.response.id });
        } else if (info.file.status === 'error') {
          message.error(`Ошибка загрузки файла ${info.file.name}. Попробуйте еще раз.`);
          this.setState({ loading: false });
        }
      },
    };

    return (
      <Layout.Card title={loading ? 'Идет загрузка файла. Не закрывайте эту страницу до окончания загрузки.' : 'Загрузить медиафайл'}>

        <Layout.Cover pending={loading}>
          {uploaded ?
            <Alert
              message={<span>Файл успешно загружен. <Button type="link" href={`/dialogue/${uploaded}`}>Посмотреть</Button></span>}
              type="success" /> :
            <Upload.Dragger
              accept=".mp3, .mp4, .webm"
              multiple={false}
              showUploadList={false}
              {...props}
            >
              <div className="ant-upload-drag-icon"><Icon icon={Icon.List.Upload} /></div>
              <p className="ant-upload-text">Нажмите тут или перетяните файл сюда</p>
              <p className="ant-upload-hint">Поддерживается аудио в формате mp3 или видео в формате mp4 и webm</p>
            </Upload.Dragger>}
        </Layout.Cover>
      </Layout.Card>
    );
  }
}

export default UploadAudio;
