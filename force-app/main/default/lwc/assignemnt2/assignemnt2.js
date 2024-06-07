import { LightningElement } from 'lwc';

export default class assignemnt extends LightningElement {
    YOUR_NAME = 'Sowmya';
    showText = false;

    handleChange(event) {
        this.showText = event.target.checked;
    }
}