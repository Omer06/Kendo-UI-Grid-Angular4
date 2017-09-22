import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http';
import { GridViewComponent } from './../app.kendo.grid/grid-view.component';

@Injectable()
export class DataService {

  constructor(private http:Http) { }

  getUserList(){
    return this.http.get("http://localhost:5125/AngularService.asmx/GetUserList");
  }

  getCountryList() {
    return this.http.get("http://localhost:5125/AngularService.asmx/GetCountryList");
  }

  getCityList(countryId) {
    return this.http.get("http://localhost:5125/AngularService.asmx/GetCityListBy?countryId=" + countryId);
  }

  DeleteUser(userId) {
    return this.http.get("http://localhost:5125/AngularService.asmx/DeleteUser?userId=" + userId);
  }

  SaveOrUpdateUser(_user) {
    var user = JSON.stringify({ userId: _user.userId == 'undefined' ? 0 : _user.userId , firstname: _user.firstname, lastname: _user.lastname, countryId: _user.country.countryId, cityId: _user.city.cityId});
    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    return this.http.post("http://localhost:5125/AngularService.asmx/UserSaveOrUpdate",user , options);
  }

}
