import axios from 'axios'
import { requestHeader, getToken } from '../utils/requestHeader'
import URL from './constants'
import { HubConnectionBuilder , LogLevel, HttpTransportType} from '@aspnet/signalr';

export const publishPageOperations = async (skillId, pageId, operations) => {
  const result = await axios.post(
    URL.baseApiUrl  + URL.liveShare.pageOperations(skillId, pageId),
    {operations: operations},
    requestHeader(),
  )
  return result.data
}

export const closeOrUnloadSkillInstance = async (skillId) => {
  const result = await axios.delete(
    URL.baseApiUrl  + URL.liveShare.closeOrUnloadSkillInstance(skillId),
    requestHeader(),
  )
  return result.data
}
export const createOrLoadSkillInstance = async (skillId) => {
    const result = await axios.get(
      URL.baseApiUrl  + URL.liveShare.createOrLoadSkillInstance(skillId),
      requestHeader(),
    )
    return result.data
}

export const createHubConnection = async ( onMessageReceivedCallback) => {
  var options = {
    transport: HttpTransportType.WebSockets,
   // accessTokenFactory:  () => { return token; }
};
//TODO:CHANGE HUB URL
let connection = new HubConnectionBuilder()
                .withUrl(URL.baseApiUrl + URL.liveShare.hub(getToken()), options)
                .configureLogging(LogLevel.Information)
                .build();

 connection.start().then(() => {
    connection.on( "OnMessageReceived", onMessageReceivedCallback)
 })
 return connection
}

export const sendLiveShareMessage = async (hubConnection, message) => {
    hubConnection.send('PropagateUpdate', message);
    return true
}