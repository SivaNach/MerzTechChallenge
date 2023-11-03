import { LightningElement, track } from 'lwc';

export default class GetShipmentStatus extends LightningElement {
    @track shipmentStatus;
    trackingNum;

    updateTrackingNumber(event) {
        this.trackingNum = event.target.value;
        console.log("Update Tracking Number: ");
        console.log(this.trackingNum);
    }

    getShipmentStatus() {
        var calloutURI = 'https://merzcommunities--mel.sandbox.my.salesforce-sites.com/services/apexrest/mockShipmentStatus';
        if (!!this.trackingNum) {
            calloutURI = calloutURI + '?trackingNumber=' + this.trackingNum;
        }
        console.log(calloutURI);

        fetch(calloutURI, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
            //mode: 'no-cors'
        })
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            this.shipmentStatus=data;
        })
        .catch(error => console.log(error));
    }
}
