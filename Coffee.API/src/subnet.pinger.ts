const os = require('os');
const EventEmitter = require('events');

const ping = require('ping');
import { IpUtils } from "./ip.utils";

export class SubnetsPinger extends EventEmitter {
    constructor(_ranges) {
        super();

        if (_ranges) {
            this.ranges = _ranges.filter(range => {
                if (range.split('-').length == 2) {
                    const [leftBound, rightBound] = range.split('-');
                    return IpUtils.isIP(leftBound) && IpUtils.isIP(rightBound);
                } else {
                    return IpUtils.isIP(range);
                }
            }).map(range => {
                if (range.split('-').length == 2) {
                    const [leftBound, rightBound] = range.split('-');
                    return { leftBound, rightBound };
                } else {
                    return { leftBound: range, rightBound: range };
                }
            });
        } else {
            const networkInterfaces = os.networkInterfaces();
            this.ranges = Object.keys(networkInterfaces)
                .filter(key =>
                    !networkInterfaces[key][0].internal && networkInterfaces[key].length >= 2
                    && networkInterfaces[key].some(item => item.family == 'IPv4')
                )
                .map(key => {
                    const { address, netmask } = networkInterfaces[key]
                        .reduce((acc, item) => item.family == 'IPv4' ? item : acc, {});
                    const addressNumber = IpUtils.ip2number(address) >>> 0;
                    const netmaskNumber = IpUtils.ip2number(netmask) >>> 0;
                    const baseAddress = IpUtils.number2ip(addressNumber & netmaskNumber);
                    let bitMask;

                    for (let i = 32; i >= 0; i--) {
                        if (netmaskNumber == (0xffffffff << (32 - i)) >>> 0) {
                            bitMask = i;
                        }
                    }

                    return {
                        leftBound: bitMask <= 30
                            ? IpUtils.number2ip((addressNumber & netmaskNumber) + 1)
                            : baseAddress,
                        rightBound: bitMask <= 30
                            ? IpUtils.number2ip((addressNumber & netmaskNumber) + Math.pow(2, 32 - bitMask) - 2)
                            : IpUtils.number2ip((addressNumber & netmaskNumber) + Math.pow(2, 32 - bitMask) - 1)
                    };
                });
        }
    }

    ping() {
        const ips = this.ips;
        const loop = () => {
            let ip;
            if (ip = ips.pop()) {
                ping.promise.probe(ip).then(target => {
                    if (target.alive) {
                        this.emit('host:alive', target.host);
                    } else {
                        this.emit('host:dead', target.host);
                    }
                    loop();
                });
            } else {
                setTimeout(() => this.emit('ping:end'), 300);
            }
        };
        for (let i = 0; i < os.cpus().length * 5; i++) {
            process.nextTick(() => {
                loop();
            });
        }
    }

    get ips() {
        const ips = [];
        for (let i = 0; i < this.ranges.length; i++) {
            const startRange = IpUtils.ip2number(this.ranges[i].leftBound);
            const endRange = IpUtils.ip2number(this.ranges[i].rightBound);
            for (let j = startRange; j <= endRange; j++) {
                if (!ips.includes(IpUtils.number2ip(j))) {
                    ips.push(IpUtils.number2ip(j));
                }
            }
        }

        return ips;
    }
}
