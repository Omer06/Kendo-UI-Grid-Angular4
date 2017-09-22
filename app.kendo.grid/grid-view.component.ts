import { Component, OnInit } from '@angular/core';
import { DataService } from './../app.services/dataservice.service';
import { ResultHandler } from './../app.entity/resulthandler';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {

  constructor(private service:DataService, private resultHandler:ResultHandler) { }

  userList = []; // tüm kullanıcıları tabloda göstermek için kullanıcaz
  userListBackup = []; // Kullanıcı işlemi yarıda keserse userList dizisindeki itemleri restore etmek için kullancaz
  countryList = []; // Ülkeleri comboboxda göstermek için kullancaz (her ülkenin içinde ona ait şehirler depolu gelir örn: countryList[0].cities ile 0'ıncı indexdeki şehire ulaşırsınız)
  editedUser = null; //  üzerinde işlem yapılan kullanıcıyı bu değişkende depoluyoruz.

  // Angular bu methodu contrustordan sonra otomatik olarak çalıştırır(life cycle).
  ngOnInit() {
    // Methodun içinde kullanıcı listesi ve ülke listesini veritabanından çekiyoruz.
    this.populateUserList();
    this.populateCountryList();
  }

  delete(user){
    if(confirm("Kullanıcıyı silmek istediğinizden eminmisiniz ?"))
    {
      this.service.DeleteUser(user.userId).subscribe(() =>  this.resultHandler.setDeleteResult(true), 
                                                     () =>  this.resultHandler.setDeleteResult(false), 
                                                     () =>  { 
                                                       if(this.resultHandler.getResult()){ 
                                                         //Eğer işlem başarılıysa kullanıcı listesinden ilgili kullanıcıyı siliyoruz. Bu işlemden sonra tablodanda update edilip kayboluyor.
                                                         this.userList.splice(this.userList.indexOf(user), 1); 
                                                       }
                                                     });
      return;
    }
    alert("işlem iptal edildi.!"); 
  }

  saveOrUpdate(user){
      this.service.SaveOrUpdateUser(user).subscribe(() => this.resultHandler.setInsertOrUpdateResult(true),
                                                    () => this.resultHandler.setInsertOrUpdateResult(false)  ,
                                                    () => {
                                                      if(user.userId != 0){
                                                        this.restoreUserProperties(user,true);
                                                        user.editMode = false;
                                                        return;
                                                      }
                                                      this.populateUserList();
                                                    });
  }

  populateUserList() {
      this.service.getUserList().subscribe(data => {
        this.userList = data.json();
        this.userListBackup = data.json();
      });
  }

  populateCountryList() {
    this.service.getCountryList().subscribe(data => {
      this.countryList = data.json();
    });
  }

  getCityList(countryId){
    if(countryId != 0)
    return this.countryList.find(country => country.countryId == countryId).cities;
  }

  cancel(user){
    if(user.userId == 0){
      this.userList.shift();
      return;
    }

    this.restoreUserProperties(user, false);
    user.editMode = false;
  }

  toggleEditForm(user){
    if(this.editedUser != null && this.editedUser.editMode == true){
      this.restoreUserProperties(this.editedUser,false);
      this.editedUser.editMode = false;
    }

    user.editMode = !this.isEditMode(user);
    this.editedUser = user;
  }

  isEditMode(user) {
    return (user.editItem != 'undefined' && user.editMode);
  }

  addNew() {
    if(this.userList[0].userId != 0){
      var user = {userId: 0 , firstname: "", lastname: "", country: { countryId: 0 }, city: {cityId: 0}, editMode : true};
      this.userList.unshift(user);
      return ;
    }

    alert("Zaten yeni kayıt formu oluşturuldu.");
  }

  getUserByBackup(userId:number) {
    return this.userListBackup.find((user) => user.userId == userId);
  }

  restoreUserProperties(user,toBackup:boolean){
    var _user = this.getUserByBackup(user.userId);
    if(!toBackup){
      user.firstname = _user.firstname;
      user.lastname = _user.lastname;
      user.city = _user.city;
      user.country = _user.country;
    }
    else {
      _user.firstname = user.firstname;
      _user.lastname = user.lastname;
      _user.city = user.city;
      _user.country = user.country;
    } 
  }

}
