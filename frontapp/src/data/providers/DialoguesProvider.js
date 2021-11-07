import { ConferenceClient } from 'data/clients';


class DialoguesProvider {
  constructor() {
    this._conferenceClient = new ConferenceClient();
  }

  getDialogues = async () => {
    return this._conferenceClient.getDialoguesList();
  }

  getConference = (id) => this._conferenceClient.getDialogue(id);

  editSTT = (id, text) => this._conferenceClient.editSTT(id, text);

  downloadAISTT = id => this._conferenceClient.downloadAISTT(id);
  downloadEditedSTT = id => this._conferenceClient.downloadEditedSTT(id);

  cancelRequests() {
    this._conferenceClient.cancel();
  }
}

export default DialoguesProvider;
