import {
  AnalyticHomeClient,
  AnalyticSpeechClient,
  UsersClient
} from 'data/clients';
import { max, round } from 'lodash';
import moment from 'moment';


const Format = {
  XLS: 'xlsx',
  CSV: 'csv'
};

class AnalyticsProvider {
  constructor() {
    this._analyticHomeClient = new AnalyticHomeClient();
    this._analyticSpeechClient = new AnalyticSpeechClient();
    this._usersClient = new UsersClient();
  }

  async getOfficeEfficiency(filters) {
    const {
      DialogueDeviceDate,
      DialogueUserDate,
      DiagramEmployeeWorked,
      ClientTime,
      ClientDay,
      Workload,
      PausesShare,
      PausesInMinutes,
      PausesAmount
    } = await this._analyticOfficeClient.getEfficiency(filters);

    const employeeWorked = DiagramEmployeeWorked
      .map((x) => ({ ...x, Day: moment(x.Day) }))
      .sort((a, b) => a.Day - b.Day);

    const dialogueDeviceData = DialogueDeviceDate
      .map((x) => ({ ...x, Day: moment(x.Day) }))
      .sort((a, b) => a.Day - b.Day);

    const dialogueUserData = DialogueUserDate
      .map((x) => ({ ...x, Day: moment(x.Day) }))
      .sort((a, b) => a.Day - b.Day);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const dataTimesClients = ClientTime
      .map((clientTime) => ({ ...clientTime, Time: moment.utc(clientTime.Time, 'HH:mm').local() }))
      .sort((a, b) => a.Time - b.Time);

    const dataDays = ClientDay.sort((a, b) =>
      days.indexOf(a.Day) - days.indexOf(b.Day)
    );

    const workload = { ...Workload, AvgDurationDialogue: Workload.AvgDurationDialogue * 60 };

    return {
      dialogueDeviceData,
      dialogueUserData,
      indicators: workload,
      PausesShare,
      PausesInMinutes,
      PausesAmount,
      employeesWorks: employeeWorked,
      clientByTimeData: dataTimesClients,
      clientByDayData: dataDays,
      loading: false
    };
  }

  getNewDashboard(filters) {
    return this._analyticHomeClient.getNewDashboard(filters);
  }

  getFilteredDashboard(filters) {
    return this._analyticHomeClient.getFilteredDashboard(filters);
  }

  getSpeechTypeCount(filters) {
    return this._analyticSpeechClient.getPhraseTypeCount(filters);
  }

  getSpeechPhrasesTable(filters) {
    return this._analyticSpeechClient.getPhraseTable(filters);
  }

  getSpeechEmployeeRating(filters) {
    return this._analyticSpeechClient.getEmployeeRating(filters);
  }

  async getSpeechWordsCloud(filters) {
    const result = await this._analyticSpeechClient.getWordsCloud(filters);

    return result.map((item) => ({
      text: item.Text,
      weight: item.Weight,
      color: item.Colour
    }));
  }

  async getPhraseSalesStageCount(filters) {
    const response = await this._analyticSpeechClient.getPhraseSalesStageCount(filters);
    const result = response.sort((a, b) => a.SequenceNumber - b.SequenceNumber);

    return result;
  }

  async getAdvertisingEfficiency(filters) {
    const result = await this._analyticContentClient.getEfficiency(filters);

    return {
      advAnalytics: {
        ...result,
        ContentFullInfo: result.ContentFullInfo.sort((a, b) => b.AmountViews - a.AmountViews)
      },
      maxAmountViews: max(result.ContentFullInfo.map((item) => item.AmountViews))
    };
  }

  async getQualityComponents(filters, translate) {
    const response = await this._analyticServiceQualityClient.getComponents(filters);

    // Когда то считали показатели от 0 до 100. теперь от 0 до 1. костыль для поддерждки старых данных.
    const scaleCoefficient = response.EmotionComponent.NeutralShare > 1 ? 1 : 100;
    const getScaled = (value) => value * scaleCoefficient;

    const emotionComponent = response.EmotionComponent;
    const smilesAndSurprises = getScaled(emotionComponent.HappinessShare + emotionComponent.SurpriseShare);

    const emotionColors = {
      HappinessShare: '#2ab978',
      NeutralShare: '#dedfd9',
      SurpriseShare: '#ffa500',
      SadnessShare: '#bf1626',
      AngerShare: '#d8737c',
      DisgustShare: '#003366',
      ContemptShare: '#bf1626',
      FearShare: '#bf1626'
    };

    const emotionSharePieData = smilesAndSurprises ?
      Object
        .keys(emotionComponent)
        .map((itemKey) => ({
          id: itemKey,
          label: `charts.emotions.${itemKey}`,
          value: round(getScaled(emotionComponent[itemKey] || 0), 1),
          color: emotionColors[itemKey]
        })) : [];

    const attentionShare = response.AttentionComponent.AttentionShare || 0;
    const isAttentionValid = attentionShare || attentionShare === 0;

    const attentionSharePieData = isAttentionValid ? [{
      id: 'attention',
      label: 'charts.attention.attention',
      value: round(attentionShare, 1),
      color: '#2ab978'
    }, {
      id: 'noAttention',
      label: 'charts.attention.noAttention',
      value: round(100 - attentionShare, 1),
      color: '#dedfd9'
    }] : [];

    const PositiveTone = getScaled(response.IntonationComponent.PositiveTone);
    const NegativeTone = getScaled(response.IntonationComponent.NegativeTone);
    const NeutralityTone = getScaled(response.IntonationComponent.NeutralityTone);

    const intonationSharePieData = PositiveTone ? [{
      id: 'positive',
      label: 'charts.tone.positiveTone',
      value: round(PositiveTone, 1),
      color: '#2ab978'
    }, {
      id: 'neutral',
      label: 'charts.tone.neutralTone',
      value: round(NegativeTone + NeutralityTone, 1),
      color: '#dedfd9'
    }] : [];

    const phraseComponent = response.PhraseComponent.Loyalty;
    const loyalty = phraseComponent ? phraseComponent : 0;

    const wordtypesSharePieData = [{
      id: 'loyaltyPhrases',
      label: 'charts.loyalty.loyaltyPhrases',
      value: round(loyalty, 1),
      color: '#2ab977'
    }, {
      id: 'other',
      label: 'charts.loyalty.other',
      value: round(100 - loyalty, 1),
      color: '#dedfd9'
    }];

    const emotivity = response.EmotivityComponent.EmotivityShare ?
      response.EmotivityComponent.EmotivityShare * 100 :
      0;

    const speechEmotivitySharePieData = [{
      id: 'speechEmotivity',
      label: 'charts.speech.emotivity',
      value: round(emotivity, 1),
      color: '#2ab978'
    }, {
      id: 'neutral',
      label: 'charts.speech.neutral',
      value: round(100 - emotivity, 1),
      color: '#dedfd9'
    }];

    return {
      emotionSharePieData,
      attentionSharePieData,
      intonationSharePieData,
      wordtypesSharePieData,
      speechEmotivitySharePieData,
      attentionShare,
      smilesAndSurprises,
      PositiveTone,
      loyalty,
      emotivity
    };
  }

  getQualityDashboard(filters) {
    return this._analyticServiceQualityClient.getDashboard(filters);
  }

  async getQualityRating(filters) {
    const result = await this._analyticServiceQualityClient.getRating(filters);

    result.sort((a, b) => b.SatisfactionIndex - a.SatisfactionIndex);

    return result;
  }

  async getSmilesShareStats(filters, translate) {
    const result = await this._analyticServiceQualityClient.getSatisfactionStats(filters);

    const averageSmilesRate = round(result.AverageSmile * 100, 2);
    const rates = result.PeriodSmiles
      .filter((period) => period.SmileShare !== null)
      .map((period) => ({
        ...period,
        Date: moment(period.Date, 'M/DD/YYYY hh:mm:ss a')
      }));

    rates.sort((a, b) => a.Date - b.Date);

    const sortedRates = rates.map((period) => ({
      ...period,
      Date: period.Date.format('DD.MM')
    }));

    return {
      labels: sortedRates.map((period) => period.Date),
      datasets: [{
        id: 'average',
        data: sortedRates.map(() => averageSmilesRate),
        label: 'charts.dialogues.average',
        fill: false,
        borderColor: '#2ab978',
        backgroundColor: '#2ab978'
      }, {
        id: 'satisfaction',
        label: 'charts.dialogues.smilesPercent',
        data: sortedRates.map((period) => round(period.SmileShare * 100, 1)),
        fill: false,
        borderColor: '#003366',
        backgroundColor: '#003366'
      }]
    };
  }

  async getQualitySatisftactionStats(filters, translate) {
    const result = await this._analyticServiceQualityClient.getSatisfactionStats(filters);

    const averageSatisfactionScore = round(result.AverageSatisfactionScore);
    const rates = result.PeriodSatisfaction
      .filter((period) => period.SatisfactionScore !== null)
      .map((period) => ({
        ...period,
        Date: moment(period.Date, 'M/DD/YYYY hh:mm:ss a')
      }));

    rates.sort((a, b) => a.Date - b.Date);

    const sortedRates = rates.map((period) => ({
      ...period,
      Date: period.Date.format('DD.MM')
    }));

    return {
      labels: sortedRates.map((period) => period.Date),
      datasets: [{
        id: 'average',
        data: sortedRates.map(() => averageSatisfactionScore),
        label: 'charts.dialogues.average',
        fill: false,
        borderColor: '#2ab978',
        backgroundColor: '#2ab978',
      }, {
        id: 'satisfaction',
        label: 'charts.dialogues.satisfaction',
        data: sortedRates.map((period) => round(period.SatisfactionScore, 1)),
        fill: false,
        borderColor: '#003366',
        backgroundColor: '#003366',
      }]
    };
  }

  async getScheduleUserPartial(filters) {
    const response = await this._analyticReportClient.getUserPartial(filters);

    return response
      .map((user) => ({
        ...user,
        PeriodInfo: user.PeriodInfo.map((period) => ({ ...period, Date: moment(period.Date) }))
      }))
      .sort((a, b) => b.LoadIndexAverage - a.LoadIndexAverage);
  }

  async getReportsByHours(day) {
    const response = await this._analyticReportClient.getUserFull({ begTime: day, endTime: day });

    return response.map((user) => ({
      ...user,
      PeriodInfo: user.PeriodInfo
        .filter((period) => period.ActivityType !== 0)
        .map((period) => ({ ...period, Beg: moment.utc(period.Beg).local(), End: moment.utc(period.End).local() }))
    }));
  }

  getScheduleActiveEmployee(filters) {
    return this._analyticReportClient.getActiveEmployee(filters);
  }

  getRatingUsers(filters) {
    return this._analyticRatingClient.getRatingUsers(filters);
  }

  async getRatingProgressChart(filters) {
    const response = await this._analyticRatingClient.getProgress(filters);

    const startOfRange = moment(filters.begTime);
    const endOfRange = moment(filters.endTime);
    const days = [];
    let day = startOfRange;

    while (day <= endOfRange) {
      days.push(day.format('DD.MM.YY'));
      day = day.clone().add(1, 'd');
    }

    return {
      labels: days,
      datasets: response
    };
  }

  async getPollStatistic(filters) {
    const response = await this._analyticContentClient.getPoll(filters, false);

    const maxAmountViews = max(response.ContentFullInfo.map((item) => item.AmountViews + item.AnswersAmount));
    const pollStatistic = {
      ...response,
      ContentFullInfo: response.ContentFullInfo.sort((a, b) => b.AmountViews - a.AmountViews)
    };

    return {
      maxAmountViews,
      pollStatistic
    };
  }

  async getAnswersForExport(filters, format) {
    switch (format) {
      case Format.XLS:
        return await this._analyticContentClient.getPoll({ ...filters, type: format }, true);

      case Format.CSV:
      default:
        const pollData = await this._analyticContentClient.getPoll({ ...filters }, false);
        const contentFullInfo = pollData.ContentFullInfo;

        if (contentFullInfo.length === 0) {
          throw new Error('Can\'t generate CSV with answers, because response of AnalyticContent/Poll is empty');
        }

        contentFullInfo.sort((a, b) => b.AmountViews - a.AmountViews);

        const data = contentFullInfo.reduce(
          (result, content) => {
            return result.concat(content.Answers.map((answer) => ({
              ContentName: content.ContentName,
              Answer: answer.Answer,
              Time: answer.Time,
              FullName: answer.FullName,
              DialogueId: answer.DialogueId
            })));
          }, []
        );

        const fields = Object.keys(data[0]);
        const replacer = (key, value) => value === null ? '' : value;
        const csv = data
          .map(
            (row) => fields
              .map((field) => JSON.stringify(row[field], replacer))
              .join(',')
          );

        csv.unshift(fields.join(','));
        return csv.join('\r\n');
    }
  }

  getRatingOffices(filters) {
    return this._analyticRatingClient.getRatingOffices(filters);
  }

  getUserWeeklyReport(params) {
    return this._analyticWeeklyReportClient.getUserWeeklyReport(params);
  }

  async getClientProfile(filters, translate) {
    const response = await this._analyticClientProfileClient.getGenderAgeStructure(filters);

    const maleArray = response.genderAge.map((age) => age.MaleCount);
    const maleCount = maleArray.reduce((sum, value) => sum + value, 0);
    const femaleArray = response.genderAge.map((age) => age.FemaleCount);
    const femaleCount = femaleArray.reduce((sum, value) => sum + value, 0);

    const clientsCount = maleCount + femaleCount;

    const maleShare = clientsCount > 0 ?
      `${Math.round((maleCount / clientsCount) * 100)}%` :
      '0%';
    const femaleShare = clientsCount > 0 ?
      `${Math.round((femaleCount / clientsCount) * 100)}%` :
      '0%';

    const femaleAgeAverage = response.genderAge
      .map((item) => item.FemaleCount * item.FemaleAverageAge)
      .reduce((sum, value) => sum + value, 0);
    const maleAgeAverage = response.genderAge
      .map((item) => item.MaleCount * item.MaleAverageAge)
      .reduce((sum, value) => sum + value, 0);

    const femaleAgeAv = femaleAgeAverage ? Math.round(femaleAgeAverage / femaleCount) : 0;
    const maleAgeAv = maleAgeAverage ? Math.round(maleAgeAverage / maleCount) : 0;

    const maxGenderCount = max(response.genderAge.map((age) => age.MaleCount || age.FemaleCount));

    const sexData = {
      labels: ['<21', '21-35', '35-55', '>55'],
      datasets: [{
        label: 'male',
        data: maleArray,
        backgroundColor: '#003366'
      },
      {
        label: 'female',
        data: femaleArray,
        backgroundColor: '#6684a3'
      }
      ]
    };

    const isClientsValid = response.uniquePerYearClients > 0 || response.allClients > 0;

    const clients = isClientsValid ? [{
      id: 'new-clients',
      label: 'newClients',
      value: round(response.uniquePerYearClients),
      color: '#2ab978'
    }, {
      id: 'existing-clients',
      label: 'existingClients',
      value: round(response.allClients - response.uniquePerYearClients),
      color: '#6684a3'
    }] : [{
      id: 'no-data',
      label: 'No Data',
      value: 100,
      color: '#dedfd9'
    }];

    return {
      sexData,
      femaleShare,
      femaleAgeAv,
      maleShare,
      maleAgeAv,
      maleCount,
      femaleCount,
      maxGenderCount,
      uniqueClients: clients,
      uniqClients: response.uniquePerYearClients
    };
  }
}

export default AnalyticsProvider;