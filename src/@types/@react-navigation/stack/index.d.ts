declare namespace ReactNavigation {
  export interface RootParamList {
    Home?: string;
    Scheduling: { car: CarDTO | undefined };
    SchedulingDetails: { car: CarDTO; dates: string[] };
    SchedulingComplete: undefined;
    MyCars: undefined;
    Splash: undefined;
  }
}
