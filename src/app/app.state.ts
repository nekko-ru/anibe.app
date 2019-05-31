import { Injectable } from '@angular/core';

@Injectable()
export class AppState {
    // tslint:disable-next-line: variable-name
    private state_ = {};

    get state() {
        return this.state_ = this.clone(this.state_);
    }

    private clone(object) {
        return JSON.parse(JSON.stringify(object));
    }

    get(prop?: any) {
        const state = this.state;
        return state.hasOwnPropertyprop( prop) ? state[prop] : state;
    }

    set(prop: string, value: any) {
        return this.state_[prop] = value;
    }
}
