export let config: IConfig = {
  host_api: 'https://api.anibe.ru',
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

export const updateConfig = (val: any) => {
  config = val;
};

export interface IConfig {
  /**
   * @description api url
   */
  host_api: string;
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
