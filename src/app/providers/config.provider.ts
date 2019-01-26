import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';

@Injectable()
export class ConfigProvider {
  private defaults: IConfig = {
    home_slider_enable: true,
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
    if (this.platform.is('cordova')) {
      this.fb.fetch(600)
        .then(() => {
          console.info('fetched remote config ');
          this.fb.activateFetched()
            .then(async () => {
              console.info('activated remote config');

              console.info(await this.getValue('home_slider_enable'));
            })
            .catch(error => {
              console.error('error initializing remote config', error);
            });
        })
        .catch(error => {
          console.error('error fetching remote config', error);
        });
    }
  }

  public async getValue(key: string) {
    console.info('get value from firebase cloud config');

    if (this.platform.is('cordova')) {

      try {
        const remoteVal = await this.fb.getValue(key);

        console.info('config', remoteVal);
        return remoteVal || this.defaults[key];
      } catch (e) {
        console.info('Cloud config error: ', e);
        return null;
      }
    } else {
      // PWA Implementation
      console.info('its pwa');

      return this.defaults[key];
    }
  }
}

export interface IConfig {
  /**
   * @description enable show slider in home page
   */
  home_slider_enable: boolean;
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
