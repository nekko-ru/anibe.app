import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class ConfigProvider {
  private defaults: IConfig = {
    home_slider_enable: 'false',
    home_slider_data: {
      slides: [
        {
          img: 'http://shakai.ru/file/manga/Fairy_Tail_And_The_Seven_Deadly_Sins/cover/cover.jpg',
          inapp_page: false,
          url: 'https://vk.com/keelvel'
        }
      ],
      enable_auto_slide: true,
      timing: 2
    }
  };

  constructor(private fb: Firebase, private platform: Platform) {}

  initialize() {
    if ((<any>window).FirebasePlugin !== undefined) {
      (<any>window).FirebasePlugin.fetch(600, () => {
        (<any>window).FirebasePlugin.activateFetched(() => {
          console.log('Firebase activateFetched() ran.');
        }, (err) => {
          console.log('Firebase Error running activateFetched(). Err: ' + err);
        });
      }, (err) => {
        console.log('Firebase Error running fetch(). Err: ' + err);
      });
  }
  }

  public getValue(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      (<any>window).FirebasePlugin.getValue(key, (value: any) => {
        console.log('Firebase getValue("' + key + '") ran. Result:' + value);
        resolve(value || this.defaults[key]);
      }, (err: any) => {
        console.warn(err);

        console.log('Firebase getValue("' + key + '") get error. Result:' + this.defaults[key]);
        resolve(this.defaults[key]);
      });
    });
  }
}

export interface IConfig {
  /**
   * @description enable show slider in home page
   */
  home_slider_enable: string;
  /**
   * @description slider information
   */
  home_slider_data: {
    /**
     * @description list of slides
     */
    slides: [{
      img: string;
      inapp_page: boolean;
      url: string;
    }],
    /**
     * @description enable auto swiper slide
     */
    enable_auto_slide: boolean;
    /**
     * @description auto swape timeout
     */
    timing: number;
  };
}
