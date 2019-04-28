import { NgZone, Injectable } from "@angular/core";
import { Log } from "../moodlogs/models/log.model";
import { BehaviorSubject, Observable } from "rxjs";
import { BackendService } from "./backend.service";
import { User } from "../moodlogs/models/user.model";
var firebase = require("nativescript-plugin-firebase");
import 'rxjs/add/operator/share';
import { HttpClient } from "@angular/common/http";
import { UtilsService } from "./utils.service";



@Injectable()
export class FirebaseService {

items: BehaviorSubject<Array<Log>> = new BehaviorSubject([]);

private _allItems: Array<Log> = [];
public myLogs$: Observable<Array<Log>>;
selectedDate$: Observable<Date>;

private _selectedDateItemSource: BehaviorSubject<Date>;

  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
    private utils: UtilsService
  ){
      // Observable selectedDate source
this._selectedDateItemSource = new BehaviorSubject<Date>(new Date());

// Observable selectedDate stream
this.selectedDate$ = this._selectedDateItemSource.asObservable();
}

/*   private _email: string;

  get email(): string {
    if (this._email) {
        return this._email;
    }
} */

updateSelectedDate(date: Date) {
this._selectedDateItemSource.next(date);
}

  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      email: user.email,
      password: user.password
    }).then((result: any) => {
          BackendService.token = result.uid;
          return JSON.stringify(result);
      }, (errorMessage: any) => {
        alert(errorMessage);
      });
  }
  facebookLogin(user: User){
  return firebase.login({
    type: firebase.LoginType.FACEBOOK,
    // Optional
    facebookOptions: {
      // defaults to ['public_profile', 'email']
      scope: ['public_profile', 'email']
    }
  }).then(
      function (result) {
        BackendService.token = result.uid;
        JSON.stringify(result);
      },
      function (errorMessage) {
        console.log(errorMessage);
      }
  );
    }

  register(user: User) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    }).then(
          function (result:any) {
            return JSON.stringify(result);
          },
          function (errorMessage:any) {
            alert(errorMessage);
          }
      )
  }

  resetPassword(email) {
    return firebase.sendPasswordResetEmail({
    email: email
    }).then((result: any) => {
          alert(JSON.stringify(result));
        },
        function (errorMessage:any) {
          alert(errorMessage);
        }
    ).catch(this.handleErrors);
  }

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }


  logout(){
    BackendService.token = "";
    firebase.logout();
  }

 getLogList(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Logs';

        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value);
            console.log(JSON.stringify(results))
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();
  }

  getMyLog(id: string): Observable<any> {
    return new Observable((observer: any) => {
      observer.next(this._allItems.filter(log => log.id === id)[0]);
    }).share();
  }


 getLogs(id: string): Observable<any>{
    return new Observable((observer: any) => {
        let path = 'Logs/${id}';

          let onChildEvent = (snapshot: any) => {
            this.ngZone.run(() => {
              let results = this.handleSnapshot(snapshot.value);
              console.log(JSON.stringify(results))
               observer.next(results);
            });
          };
          firebase.addChildEventListener(onChildEvent, `/${path}`);
          console.log('Child listener added')
      }).share();
    }


/*  getLogById(id: string): Log {
    if (!id) {
        return;
    }

    return this._allItems.filter((log) => {
        return log.id === id;
    })[0];
} */

  handleSnapshot(data: any):Array<Log>{
    //empty array, then refill and filter
    this._allItems = [];
    if (data) {
      for (let id in data) {
        let result = (<any>Object).assign({id: id}, data[id]);
        if(BackendService.token === result.UID){
          this._allItems.push(result);
        }
      }
      this.publishUpdates();
    }
    return this._allItems;
  }

  publishUpdates() {
    // here, we sort must emit a *new* value (immutability!)
    this._allItems.sort(function(a, b){
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
      return 0;
    })
    this.items.next([...this._allItems]);
  }
 add(mood:string,activity:string, other:string,
    ) {
    return firebase.push(
        "/Logs",
        {
        "mood" : mood,
        "activity": activity,
        "other": other,
        "UID": BackendService.token,
        "date": 0 - 0 - Date.now(),
        "imagepath": ""}
      ).then(
        function (result:any) {
        console.log('Added:',  mood,activity, other
        )
          return 'Log added for today!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });
    }

  delete(log: Log) {
    return firebase.remove("/Logs/"+log.id+"")
      .catch(this.handleErrors);
  }

uploadFile(localPath: string, file?: any): Promise<any> {
    let filename = this.utils.getFilename(localPath);
    let remotePath = `${filename}`;
    return firebase.uploadFile({
      remoteFullPath: remotePath,
      localFullPath: localPath,
      onProgress: function(status) {
          console.log("Uploaded fraction: " + status.fractionCompleted);
          console.log("Percentage complete: " + status.percentageCompleted);
      }
    });
}

getDownloadUrl(remoteFilePath: string): Promise<any> {
    return firebase.getDownloadUrl({
      remoteFullPath: remoteFilePath})
    .then(
      function (url:string) {
        return url;
      },
      function (errorMessage:any) {
        console.log(errorMessage);
      });
}
editUser(uid:string, imagepath: string){
    this.publishUpdates();
    return firebase.update("/users/"+uid+"",{
        imagepath: imagepath})
      .then(
        function (result:any) {
          return 'You have successfully edited this gift!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });
  }
}
