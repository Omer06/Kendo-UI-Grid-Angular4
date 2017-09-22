export class ResultHandler{
    private message:string = "henüz işlem yapılmadı.";
    private result:boolean;


    public getMessage(){
        return this.message;
    }

    public getResult(){
        return this.result;
    }

    public setInsertOrUpdateResult(result:boolean){
        this.message = result ? "Kullanıcı kaydı/güncelemesi başarıyla yapıldı." : "Kullanıcı kayıt/güncel edilirken bir hata oluştu.";
        this.result = result;
    }

    public setDeleteResult(result:boolean){
        this.message = result ? "Kullanıcı başarıyla silindi." : "Kullanıcı silinirken bir hata oluştu.";
        this.result = result;
    }
 }