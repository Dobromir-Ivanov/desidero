import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Utilities } from 'src/app/utilities';

@Injectable()
export class LocalStorage {

  private static syncListenerInitialised = false;

  public static readonly DBKEY_USER_DATA = 'user_data';
  private static readonly DBKEY_SYNC_KEYS = 'sync_keys';
  private syncKeys: string[] = [];
  private initEvent = new Subject();

  private reservedKeys: string[] =
    [
      'sync_keys',
      'addToSyncKeys',
      'removeFromSyncKeys',
      'getSessionStorage',
      'setSessionStorage',
      'addToSessionStorage',
      'removeFromSessionStorage',
      'clearAllSessionsStorage'
    ];


  constructor() { }

  public getData(key = LocalStorage.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    let data = this.sessionStorageGetItem(key);

    if (data == null) {
      data = this.localStorageGetItem(key);
    }

    return data;
  }

  public getDataObject<T>(key = LocalStorage.DBKEY_USER_DATA, isDateType = false): T {
    let data = this.getData(key);

    if (data != null) {
      if (isDateType) {
        data = new Date(data);
      }
      return data as T;
    } else {
      return null;
    }
  }

  public deleteData(key = LocalStorage.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    this.removeFromSessionStorage(key);
    localStorage.removeItem(key);
  }


  public saveSessionData(data: any, key = LocalStorage.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    this.removeFromSyncKeys(key);
    localStorage.removeItem(key);
    this.sessionStorageSetItem(key, data);
  }

  public saveSyncedSessionData(data: any, key = LocalStorage.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    localStorage.removeItem(key);
    this.addToSessionStorage(data, key);
  }

  public savePermanentData(data: any, key = LocalStorage.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    this.removeFromSessionStorage(key);
    this.localStorageSetItem(key, data);
  }



  /**********************************
   *      PRIVATE METHODS
   *********************************/




  private getSyncKeysFromStorage(defaultValue: string[] = []): string[] {
    const data = this.localStorageGetItem(LocalStorage.DBKEY_SYNC_KEYS);

    if (data == null) {
      return defaultValue;
    } else {
      return data as string[];
    }
  }



  private addToSyncKeysBackup(key: string) {
    const storedSyncKeys = this.getSyncKeysFromStorage();

    if (!storedSyncKeys.some(x => x === key)) {
      storedSyncKeys.push(key);
      this.localStorageSetItem(LocalStorage.DBKEY_SYNC_KEYS, storedSyncKeys);
    }
  }


  private removeFromSyncKeysBackup(key: string) {
    const storedSyncKeys = this.getSyncKeysFromStorage();

    const index = storedSyncKeys.indexOf(key);

    if (index > -1) {
      storedSyncKeys.splice(index, 1);
      this.localStorageSetItem(LocalStorage.DBKEY_SYNC_KEYS, storedSyncKeys);
    }
  }


  private removeFromSyncKeysHelper(key: string) {
    const index = this.syncKeys.indexOf(key);

    if (index > -1) {
      this.syncKeys.splice(index, 1);
    }
  }

  private removeFromSessionStorageHelper(keyToRemove: string) {

    sessionStorage.removeItem(keyToRemove);
    this.removeFromSyncKeysHelper(keyToRemove);
  }


  private removeFromSessionStorage(keyToRemove: string) {
    this.removeFromSessionStorageHelper(keyToRemove);
    this.removeFromSyncKeysBackup(keyToRemove);

    localStorage.setItem('removeFromSessionStorage', keyToRemove);
    localStorage.removeItem('removeFromSessionStorage');
  }


  private removeFromSyncKeys(key: string) {
    this.removeFromSyncKeysHelper(key);
    this.removeFromSyncKeysBackup(key);

    localStorage.setItem('removeFromSyncKeys', key);
    localStorage.removeItem('removeFromSyncKeys');
  }

  private addToSyncKeysHelper(key: string) {
    if (!this.syncKeysContains(key)) {
      this.syncKeys.push(key);
    }
  }

  private syncKeysContains(key: string) {
    return this.syncKeys.some(x => x === key);
  }


  private addToSessionStorageHelper(data: any, key: string) {
    this.addToSyncKeysHelper(key);
    this.sessionStorageSetItem(key, data);
  }


  private addToSessionStorage(data: any, key: string) {
    this.addToSessionStorageHelper(data, key);
    this.addToSyncKeysBackup(key);

    this.localStorageSetItem('addToSessionStorage', { key, data });
    localStorage.removeItem('addToSessionStorage');
  }


  private testForInvalidKeys(key: string) {
    if (!key) {
      throw new Error('key cannot be empty');
    }

    if (this.reservedKeys.some(x => x === key)) {
      throw new Error(`The storage key "${key}" is reserved and cannot be used. Please use a different key`);
    }
  }


  private localStorageSetItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private localStorageGetItem(key: string) {
    return Utilities.JsonTryParse(localStorage.getItem(key));
  }


  private sessionStorageGetItem(key: string) {
    return Utilities.JsonTryParse(sessionStorage.getItem(key));
  }


  private sessionStorageSetItem(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }


}
