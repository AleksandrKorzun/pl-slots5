/* global window */

import Network from './Network';

export default class Mindworks extends Network {
     constructor(callback) {
        super(callback);
        this.callback = callback;

        window.addEventListener("DOMContentLoaded", () => {
            window.gameReady && window.gameReady()
            setTimeout(() => {
            window.gameRetry && window.gameRetry();
            }, 2000);
        });
    }

    gameStart() {
        this.callback()
    }

    gameClose() { }

    gameReady() {
        window.gameReady && window.gameReady();
    }

    gameRetry() {
        window.gameRetry && window.gameRetry();
    }

    gameEnd() {
        window.gameEnd && window.gameEnd();
    }

    openStore() {
        window.gameEnd && window.gameEnd();
        window.install ? window.install() : window.top.open(this.getUrl());
        console.log('openStore', window);
    }


}

function gameStart() {
    console.log(1);
    return;
}

function gameClose() {
    console.log(2);
    return;
}

window.gameStart = gameStart;
window.gameClose = gameClose;
