// @ts-nocheck
export class IpUtils {
    static number2ip = number => [
        (number & (0xff << 24)) >>> 24,
        (number & (0xff << 16)) >>> 16,
        (number & (0xff << 8)) >>> 8,
        number & 0xff
    ].join('.');

    static isIP = (ip) => {
        const ipArray = (ip + '').split('.');
        return !(ipArray.length === 0 || ipArray.length > 4);
    }
}