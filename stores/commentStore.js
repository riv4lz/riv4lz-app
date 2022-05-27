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

export interface room {
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

export default class CommentStore{
    @observable chatRooms: ChatRoom[] = [];
    @observable chatRoom: ChatRoom | undefined;
    @observable comments: string[] = [];
    hubConnection: HubConnection | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;
    @observable test: any = [];
    @observable test2: any = [];

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

        this.hubConnection.on('LoadMessages', (comments: room) => {
            console.log("connnection state " + this.hubConnection.state);
            runInAction(() => {
                this.test2 = comments;
                console.log(this.test2);
            });
        });

        this.hubConnection.on('LoadRooms', (chatRoom: ChatRoom) => {
            runInAction(() => {
                console.log("loaded rooms ");
                console.log("test is equals to ");
                if (this.chatRooms.length <= 0) {
                    this.chatRooms.push(chatRoom);
                    this.test = chatRoom;
                }
            });
        });

        this.hubConnection.on('ReceiveMessage', (comment: string) => {
            runInAction(() => {
                this.comments.push(comment);
                this.test2.messages.push(comment);
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
