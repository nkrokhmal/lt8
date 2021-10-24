import * as Network from 'constants/Network';
import BaseClient from './BaseClient';
import moment from 'moment';


class UsersClient extends BaseClient {
  constructor(
    host = Network.DEFAULT_HOST,
    protocol = Network.DEFAULT_PROTOCOL
  ) {
    super(host, 'conference', protocol);
  }

  getDialoguesList(params) {
    return this.get('/', params);
  }

  async getDialogue(id) {
    const response = await this.get(`/${id}`);
    let parsedRecognition;

    try {
      parsedRecognition = JSON.parse(response.recognition);
    } catch (e) {
      parsedRecognition = response.recognition;
    }
    
    const result = {
      ...response,
      recognition: parsedRecognition,
      date: moment.utc(response.date).local(),
      words: response.stt_recognition || (parsedRecognition && parsedRecognition.map(item => item.Word).join(' '))
    }

    return result;
  }

  editSTT = (id, text) => {
    return this.post(`/update_stt/${id}`, { text });
  }
}

export default UsersClient;
