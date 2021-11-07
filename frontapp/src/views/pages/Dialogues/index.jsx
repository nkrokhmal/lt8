import * as React from 'react';
import { DialoguesProvider, SessionStorageProvider } from 'data/providers';
import { isEqual } from 'lodash';
import Layout from 'views/layouts';
import TableDialogues from 'views/widgets/DialoguesTable';
import { connect } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';

const currentPage = 'dialogues';

class Dialogues extends React.Component {
  constructor(props) {
    super(props);

    this._dialoguesProvider = new DialoguesProvider();
    this._sessionStorage = new SessionStorageProvider();

    const page = this._sessionStorage.load(currentPage);

    this.state = {
      list: [],
      loading: true,
      page: page || 0
    };
  }

  componentDidMount() {
    this.getDialogues();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.filters, this.props.filters)) {
      this.setState({ loading: true });
      this.getDialogues();
    }
  }

  componentWillUnmount() {
    this._sessionStorage.remove(currentPage);
  }

  getDialogues = async () => {
    const { filters } = this.props;

    try {
      const response = await this._dialoguesProvider.getDialogues({ ...filters });
      const dialogues = response.map((dialogue) => ({
        ...dialogue,
        date: moment.utc(dialogue.date).local()
      }));

      const { page } = this.state;

      const pageCount = page.current;
      const pageSize = page.pageSize;

      if (pageCount * pageSize > dialogues.length) {
        this.onPageChange(0);
      }

      this.setState({ list: dialogues, loading: false });
    } catch (error) {
      message.error('error.load');
      console.error(`Can't load dialogues. Error: ${error.message}`);
      this.setState({ loading: false });
    }
  }

  onPageChange = (e) => {
    this.setState({ page: e });
    this._sessionStorage.save(currentPage, e);
  }

  render() {
    const { list, loading, page } = this.state;

    return (
        <Layout.Card title={'Конференции'}>
          <Layout.Cover pending={loading}>
              <TableDialogues
                dataSource={list}
                page={page}
                onChange={this.onPageChange}
              />
          </Layout.Cover>
        </Layout.Card>
    );
  }
}

const mapStateToProps = (store) => ({
  filters: store.filter
});

export default connect(mapStateToProps)(Dialogues);
