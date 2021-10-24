import React from 'react';
import { DialoguesProvider } from 'data/providers';
import { Button, Col, Row, Input } from 'antd';
import Layout from 'views/layouts';
import SpeechToText from './SpeechToText';
import Media from './Media';
import { connect } from 'react-redux';
import { message } from 'antd';


class DialogueCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newText: '',
      editMode: false,
      data: null
    };

    this._dialoguesProvider = new DialoguesProvider();
  }

  componentDidMount() {
    this.getConferenceStats();
  }

  getConferenceStats = async () => {
    const { id } = this.props.match.params;

    try {
      const result = await this._dialoguesProvider.getConference(id);

      this.setState({ data: result });
    } catch (error) {
      console.log(`Load dialog stats. Error: ${error}`, error);
      message.error('Ошибка загрузки данных');
    }
  }

  submitSTT = async () => {
    const { id } = this.props.match.params;
    const { newText, data } = this.state;

    try {
      await this._dialoguesProvider.editSTT(id, newText);
      message.success('Текст расспознавания успешно сохранен.');
      this.setState({ editMode: false, data: {...data, stt_recognition: newText} });
    } catch (error) {
      console.log(`Error: ${error}`, error);
      message.error('Ошибка сохранить новый текст. Попробуйте еще раз.');
    }
  }

  handleChange = (e) => {
    this.setState({newText: e.target.value});
  }

  render() {
    const { data, editMode, newText } = this.state;

    const actions = editMode ?
      <>
        <Button onClick={this.submitSTT}>Сохранить</Button>{' '}
        <Button onClick={() => this.setState({ editMode: false })}>Отменить</Button>
      </>
      :
      <Button onClick={() => this.setState({ editMode: true, newText: data.words })}>Редактировать текст</Button>;

    return (
      <Layout.Cover pending={data === null}>
        <Row gutter={[12, 0]}>
          <Col lg={24}>
            {data !== null && <Layout.Card title={'Плеер'}>
              <Media source={data} />
            </Layout.Card>}
          </Col>
        </Row>

        <Row gutter={[12, 0]}>
          <Col lg={24}>
            {data !== null && <Layout.Card title={'Содержание речи участников'} action={actions}>
            {editMode ?
              <Input.TextArea 
                autoSize={true}
                value={newText}
                onChange={this.handleChange}
              />
             :
              <SpeechToText
                recognition={data.recognition}
                stt_recognition={data.stt_recognition}
                date={data.date} />
            }
            </Layout.Card>}
          </Col>
        </Row>
      </Layout.Cover>
    );
  }
}

const mapStateToProps = (store) => ({
});

export default connect(mapStateToProps)(DialogueCard);

