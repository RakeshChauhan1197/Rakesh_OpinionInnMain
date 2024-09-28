export class ConfigService {
  private baseURL: string | undefined;
  private static instance: ConfigService;

  private constructor() {
    this.baseURL = "";
  }
  //factory method to get instart
  public static get Instance(): ConfigService {
    if (ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  public setConfig(baseURL: string | undefined) {
    this.baseURL = baseURL;
  }

  public getBaseURL(): string | undefined {
    return this.baseURL;
  }

  public TimeTrack(callbackfunction: () => void, delayTime: number) {
    return setTimeout(callbackfunction, delayTime);
  }
}
