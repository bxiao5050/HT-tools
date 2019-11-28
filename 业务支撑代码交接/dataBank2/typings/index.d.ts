// declare var moment: any;
declare var test: number;

declare namespace myTypings {
  interface MsgApiCode {
    getInfo(fg:string): number
  }
}

declare var MsgApiCode: myTypings.MsgApiCode

declare var moment: any