import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {
  constructor(private http: HttpClient) {}

  sendEmail(to: string, message: string): Observable<any> {
    const emailData = {
      to,
      subject: 'Lien GitHub du projet',
      message
    };

    return this.http.post('https://api.bangouramabintyballey@gmail.com/send', emailData);
  }
}
