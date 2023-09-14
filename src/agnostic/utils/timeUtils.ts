export function nowHHMMSS(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

const twentyFourHoursInMS = 24 * 60 * 60 * 1000;
const twentyFourHoursInS =  24 * 60 * 60;

export function twentyFourHoursAgo():Date {
    const now = new Date();
    return new Date(now.getTime() - (twentyFourHoursInMS));
}

export function twentyFourHoursAgoTimestamp():number {
    return nowUnixTimestamp() - twentyFourHoursInS;
}


//current time in SECONDS
export function nowUnixTimestamp():number {
    return Math.floor(Date.now() / 1000);
}

export function timeStampFromDate(date:Date):number {
    return Math.floor(date.getTime() / 1000);
}

export function printUnixTsYYMonDD(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  
    const year = date.getFullYear().toString().slice(2);
    const month = monthAbbreviation(date.getMonth());
    const day = date.getDate().toString().padStart(2, '0');
  
    return `'${year} ${month} ${day}`;
  }
  
  export function monthAbbreviation(monthIndex: number): string {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    return months[monthIndex];
  }