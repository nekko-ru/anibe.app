import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AppState {
    // tslint:disable-next-line: variable-name
    private state_ = {};

    constructor(
        private storage: Storage
    ) {
        console.log('======restoring state======');
        this.storage.forEach((v: any, k: string) => {
            this.state_[k] = v;
        });
    }

    get(prop?: any) {
        if (prop in this.state_ && this.state_[prop]) {
            return this.state_[prop];
        }
        return undefined;
    }

    async getAsync(prop?: string) {
        console.log('get:', prop);
        if (prop in this.state_ && this.state_[prop]) {
            return this.state_[prop];
        }
        return this.storage.get(prop);
    }

    set(prop: string, value: any) {
        this.storage.set(prop, value);
        return this.state_[prop] = value;
    }

    async setAsync(prop: string, value: any) {
        console.log('set:', prop, ':', value);
        this.state_[prop] = value;
        await this.storage.set(prop, value);
    }
}
