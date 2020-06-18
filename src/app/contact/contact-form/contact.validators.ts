import {FormControl} from '@angular/forms';

export function emailFormatValidator() {
  return (formControl: FormControl) => {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formControl.value))) {
      return {
        emailFormat: true
      };
    } else {
      return null;
    }
  };
}
