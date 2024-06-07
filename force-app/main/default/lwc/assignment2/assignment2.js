import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/CreateContactController.getAccounts';
import createContact from '@salesforce/apex/CreateContactController.createContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactCreator extends LightningElement {
    @track accountOptions = [];
    @track selectedAccountId;
    @track lastName = '';
    @track title = '';
    @track email = '';
    @track phoneNumber = '';

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accountOptions = data.map(account => {
                return { label: account.Name, value: account.Id };
            });
        } else if (error) {
            this.showToast('Error', error.body.message, 'error');
        }
    }

    handleAccountChange(event) {
        this.selectedAccountId = event.detail.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.detail.value;
    }

    handleTitleChange(event) {
        this.title = event.detail.value;
    }

    handleEmailChange(event) {
        this.email = event.detail.value;
    }

    handlePhoneChange(event) {
        this.phoneNumber = event.detail.value;
    }

    handleSave() {
        if (this.selectedAccountId && this.lastName) {
            createContact({
                accountId: this.selectedAccountId,
                lastName: this.lastName,
                title: this.title,
                email: this.email,
                phoneNumber: this.phoneNumber
            })
            .then(() => {
                this.showToast('Success', 'Contact created successfully!', 'success');
                this.clearForm();
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
        } else {
            this.showToast('Error', 'Account and Last Name are required fields.', 'error');
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    clearForm() {
        this.selectedAccountId = '';
        this.lastName = '';
        this.title = '';
        this.email = '';
        this.phoneNumber = '';
    }
}