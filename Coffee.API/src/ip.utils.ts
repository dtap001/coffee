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

    static ip2number = ip => {
        const ipArray = (ip + '').split('.');
        if (ipArray.length === 0 || ipArray.length > 4) {
            throw new Error('Invalid IP');
        }
        return ipArray
            .map((segment, i) => {
                if (isNaN(+segment) || segment < 0 || segment > 255) {
                    throw new Error('One or more segments of IP-address is invalid');
                }
                return (segment || 0) << (8 * (3 - i));
            })
            .reduce((acc, cur) => acc | cur, 0) >>> 0;
    }
}