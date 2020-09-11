import { Injectable } from '@angular/core';
/*import {Test2Service} from './test2.service';
import {HttpClient} from '@angular/common/http';

export class TestService3 {
  sayHello() {
    console.log(`From TestService3 --> Hello`);
  }
}

export function xyzFactory(http: HttpClient) {
  console.log(!!http);
  return new TestService3();
}

@Injectable({
  providedIn: 'root',
  // useClass: Test2Service, // <-- add this line
  // useFactory: xyzFactory,
  // deps: [HttpClient],
  useValue: {
    sayHello: () => {
      console.log('whuuuut??');
    }
  }
})
export class TestService {

  sayHello() {
    console.log(`From TestService --> Hello`);
  }
}*/

@Injectable({
  providedIn: 'root'
})
export class TestService2 {
  sayHello() {
    console.log(`From TestService2 --> Hello`);
  }
}

@Injectable({
  providedIn: 'root',
  useExisting: TestService2
})
export class TestService {
  sayHello() {
    console.log(`From TestService2 --> Hello`);
  }
}

