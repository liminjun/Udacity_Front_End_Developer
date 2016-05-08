function AddressBook() {
    var that = this;
    that.addressBook = [];
    
    this.initialComplete =false;
    
    this.addContact = function (contact) {
        that.addressBook.push(contact);
    }
    this.getContact = function (index) {
        return that.addressBook[index];
    }

    this.deleteContact = function (index) {
        that.addressBook.splice(index, 1);
    }

    this.getInitialContacts = function (callback) {
        setTimeout(function(){
            that.initialComplete=true;
            if(callback){
                return callback();
            }
        },1000);
    }
}