import { writable } from 'svelte/store';
import { browser } from '$app/environment';



const KEY_NAME ='quickAccess'
let init = ['EUR', 'GBP', 'USD'];


export const quickAccess = writable(init);

if (browser) {
    const saved = localStorage.getItem(KEY_NAME);
    if (saved) {
        init = JSON.parse(saved)
        quickAccess.set(init);
    }

    quickAccess.subscribe(lst => {
        localStorage.setItem(KEY_NAME, JSON.stringify(lst));
        console.log('Saved new quick access list: ' + JSON.stringify(lst));
    });

}
