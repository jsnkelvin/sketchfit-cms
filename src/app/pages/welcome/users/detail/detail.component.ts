import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UploadChangeParam, NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  transactionData: any = '';
  isVisible = false;
  uploadURL = '';
  isNotesUploaded = false;
  avatarURL = '';
  currIndex = '';
  isUpload: boolean;

  constructor(
    public actRoute: ActivatedRoute,
    public http: HttpClient,
    private msg: NzMessageService,
    public _ngZone: NgZone
  ) { }

  customReq = (item: UploadXHRArgs) => {
    // Create a FormData here to store files and other parameters.
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('image', item.file as any);
    const req = new HttpRequest('POST', item.action!, formData, {
      reportProgress: true,
    });
    // Always returns a `Subscription` object. nz-upload would automatically unsubscribe it at correct time.
    return this.http.request(req).subscribe(
      // tslint:disable-next-line no-any
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total && event.total > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      err => {
        item.onError!(err, item.file!);
      }
    );
  }

  ngOnInit() {
    const params = this.actRoute.snapshot.params.id;
    console.log(params);
    this.http.get(environment.api_url + '/user/transaction/' + params + '?page=1&row=999').subscribe(data => {
      this.transactionData = data['result'];
      console.log(data);
    });
  }

  showModal(data, index, method): void {
    console.log(data, index);
    this.currIndex = index;
    this.isNotesUploaded = false;

    if (data.stylist_note) {
      this.isNotesUploaded = true;
      this.avatarURL = data.stylist_note;
    }

    switch (method) {
      case 'view': {
        // this.isVisible = true;
        window.open(this.avatarURL, '_blank');
        break;
      }

      case 'upload': {
        this.isUpload = true;
        this.uploadURL = environment.api_url + '/transaction/stylist_note/' + data.id;
        break;
      }
    }

  }

  handleOk(method): void {
    switch (method) {
      case 'view': {
        this.isVisible = false;
        break;
      }

      case 'upload': {
        this.isUpload = false;
        break;
      }
    }
  }

  handleCancel(method): void {
    switch (method) {
      case 'view': {
        this.isVisible = false;
        break;
      }

      case 'upload': {
        this.isUpload = false;
        break;
      }
    }
  }

  handleChange({ file, fileList, event }: UploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
      console.log('before', this.transactionData[this.currIndex]);
      console.log('Will change to', file.response.message);
      Object.assign(this.transactionData[this.currIndex], file.response.message);
      console.log('after', this.transactionData[this.currIndex]);
      this.isUpload = false;
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed. Please try again`);
    }
  }

}
