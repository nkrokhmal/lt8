import { UsersClient } from 'data/clients';


class DialoguesProvider {
  constructor() {
    this._usersClient = new UsersClient();
  }

  async getDialogues() {
    const response = await this._usersClient.getDialoguesList();

    return response.map(dialogue => ({
      ...dialogue,
      dialogueId: dialogue.ConferenceId
    }));
  }

  getConference = (id) => this._usersClient.getDialogue(id);

  editSTT = (id, text) => this._usersClient.editSTT(id, text);

  cancelRequests() {
    this._usersClient.cancel();
    this._analyticContentClient.cancel();
  }
}

export default DialoguesProvider;
