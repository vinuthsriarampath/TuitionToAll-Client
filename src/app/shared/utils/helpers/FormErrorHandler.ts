import {FormGroup} from '@angular/forms';
import {AlertService} from '@core/services/alerts/alert.service';
import {inject, Injectable} from '@angular/core';


@Injectable(
  {providedIn: 'root'}
)
export class FormErrorHandler {

  private readonly alertService:AlertService = inject(AlertService);

  public handle(err: any,form:FormGroup,triggerLoading:() => void):void {
    const errors =  err.error?.errors;
    triggerLoading();
    if (errors && errors.length > 0) {
      for (const e of errors) {
        form.get(e.field)?.setErrors({
          server: e.message
        });
      }
    }else if(err.error?.message){
      form.setErrors({server: err.error.message});
    }else {
      this.alertService.triggerErrorAlert("An unexpected error occurred");
      form.setErrors({server: "An unexpected error occurred"});
    }
  }
}
