import React from 'react';

const Calendar = (props) => {

    // const gapi = window.gapi
    // const CLIENT_ID = '1043115899977-i8jdand7vv9hmpnipg0r2e6s7um34lj4.apps.googleusercontent.com';
    // const API_KEY = 'AIzaSyBO1WWFD18dvVgQzKDAEDnuGTSOV4GFRzw';
    // // Tu secreto del cliente =  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
    // const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
    // const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

    // const handleClick = () => {
    //     gapi?.load('Client:auth2', () => {
    //         console.log("loaded client")

    //         gapi.client.init({
    //             apiKey: API_KEY,
    //             clientId: CLIENT_ID,
    //             discoveryDocs: DISCOVERY_DOC,
    //             scope: SCOPES
    //         })

    //         gapi.client.load('calendar', 'v3', () => console.log('bam!'))

    //         gapi.auth2.getAuthInstance().singIn()
    //     })
    // }

    /* exported gapiLoaded */
      /* exported gisLoaded */
      /* exported handleAuthClick */
      /* exported handleSignoutClick */
    
    const {
      iframeSource = '<iframe src="https://calendar.google.com/calendar/embed?src=nervinjflores%40gmail.com&ctz=America%2FCaracas" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>'
    } = props;
    return (
        <div
            dangerouslySetInnerHTML={{__html: iframeSource}}>
        </div>
    );
};

export default Calendar;