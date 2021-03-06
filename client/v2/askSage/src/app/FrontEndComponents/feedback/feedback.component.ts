import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/Services/feedback.service';
import { BrokerService } from 'src/app/Services/broker.service';
import { Router } from '@angular/router';
import { MixPanelService } from '../../Services/mix-panel.service';

declare var M: any;
var serialize = require('form-serialize');

// import { }

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {


  constructor(private _brokerService: BrokerService, private _feedbackService: FeedbackService, private router: Router,private mixpanelService: MixPanelService) {
  }

  ngOnInit() {
  }

  onSubmit(feedback) {
    //Serialize form data into JSON format
    
    var form = document.querySelector('#feedbackForm');
    var obj = serialize(form, { hash: true });

    //Post serialized form data to feedback endpoint
    this._feedbackService.postForm(obj).subscribe(
      data => {
        // console.log('Success!', data);
       
        // this.mixpanelService.init(_brokerID);
        this.mixpanelService.track("New feedback submitted",{ });

        M.toast({html: 'Thanks! Appreciate your feedback.', classes: 'rounded', displayLength: 5000})
        this.router.navigate(['/news']);
      },
      error => console.log('error', error));
  }


}
