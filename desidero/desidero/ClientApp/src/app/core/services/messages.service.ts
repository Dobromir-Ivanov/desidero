import { Injectable } from '@angular/core';


@Injectable()
export class MessagesService {


  constructor() { }

  alertError(error: any) {
    alert(`Error ${error}`);
  }

  alertInfo(text: string) {
    alert(`Info ${text}`);
  }

}
