import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class EncrDecrService {

  cyptoKey:string='MTL_@MahenderSingh_10021972'
  constructor() { }
  //The set method is use for encrypt the value.
  encryptValue(value:any){
    let _key = CryptoJS.enc.Utf8.parse(this.cyptoKey);
    _key.words.push(_key.words[0], _key.words[1]);
    //this.decrypted = _key;
    let encrypted = CryptoJS.TripleDES.encrypt(
      CryptoJS.enc.Utf8.parse(value), _key, {
        //keySize: 16,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  decyptValue(value:any){
    let _key = CryptoJS.enc.Utf8.parse(this.cyptoKey);
    _key.words.push(_key.words[0], _key.words[1]);
    var decrypted = CryptoJS.TripleDES.decrypt(
      value, _key, {
        //keySize: 16,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
}