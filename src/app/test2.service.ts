import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Test2Service {

  sayHello() {
    console.log(`From TestService2 --> Hello`);
  }
}

