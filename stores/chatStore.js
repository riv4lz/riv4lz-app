import signalR, {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {makeAutoObservable, observable, runInAction, toJS, autorun, action} from "mobx";

export interface ChatRoom {
    id: string,
    name: string,
}

export interface test {
    roomId: string,
    previousRoomId: string,
}

export interface Room {
    id: string,
    name: string,
    messages: {text: string, username: string}[];
}

export interface message {
    text: string,
    username: string
}

export interface messageSent {
    ChatRoomId: string,
    Id: string,
    Text: string,
    Username: string
}

export default class ChatStore {
    @observable chatRooms: ChatRoom[] = [];
    @observable chatMessages: string[] = [];
    @observable currentRoom: Room;
    hubConnection: HubConnection | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = () => {
        console.log("trying to connect");
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://70.34.201.1:9797/chat')
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        console.log("hubconnection" + this.hubConnection);

        this.hubConnection.start().catch(error =>
            console.log('Error establishing the connection', error));

        this.hubConnection.on('LoadMessages', (room: Room) => {
            console.log("connnection state " + this.hubConnection.state);
            runInAction(() => {
                this.currentRoom = room;
                this.chatMessages = room.messages;
            });
        });

        this.hubConnection.on('LoadRooms', (chatRooms: ChatRoom) => {
            runInAction(() => {
                this.chatRooms = chatRooms;
            });
        });

        this.hubConnection.on('ReceiveMessage', (message: string) => {
            runInAction(() => {
                this.chatMessages.push(message);
            });
        });
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping the connection', error));
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (message: messageSent) => {
        try {
            await this.hubConnection?.invoke('SendMessage', message);
        } catch (error) {
            console.log('Error sending message', error);
        }
    }

    loadMessages = async () => {
        console.log("fisk 14");
        this.loadingInitial = true;
        this.hubConnection?.invoke('LoadMessages')
            .then(() => {
                this.loadingInitial = false;
            })
            .catch(error => console.log('Error loading messages', error));
    }


    sendMessage = async (values: any) => {
        this.hubConnection?.invoke('SendMessage', values)
            .catch(error => console.log('Error sending message', error));
    }

    joinRoom = async (roomId: string, previousRoomId: string) => {
        console.log(this.hubConnection.state);
        console.log("roomid in function" + roomId);
        this.hubConnection.invoke('JoinRoom', roomId, previousRoomId).then(() => {
            console.log("wdawdwdadawpdawpd" + this.test2);
        })
            .catch(error => console.log('Error sending message', error));
    }

    loadRooms = async () => {
        this.hubConnection?.invoke('LoadRooms')
            .catch(error => console.log('Error sending message', error));
        return toJS(this.chatRooms);
    }

}
