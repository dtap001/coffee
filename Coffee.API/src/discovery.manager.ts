//import * as evilscan from "evilscan";
var evilscan = require('evilscan');
import { injectable } from "inversify";
import container from "./diContainer";
import { SocketServer, SocketEvent } from "./socketServer";
import TYPES from "./types";
import { Target } from "./models/target";
import { CoffeeStorage } from "./storage/storage";
import { RouteError } from "./routes/route";
import { Log } from "./log";
import * as os from "os";
import * as https from "https"
import * as dns from "dns";
import { Discovery } from "./models/discovery";

var iprange = require('iprange');
var ping = require('ping');
const arp = require("node-arp");

export class ErrorDiscoveryEvent extends SocketEvent {
    constructor(network: string, error: string) {
        super();
        this.TAG = "Discovery|" + network + "|ERROR";
        this.data = error.toString();
    }
}

export class FoundDiscoveryEvent extends SocketEvent {
    constructor(network: string, found: Target) {
        super();
        this.TAG = "Discovery|" + network + "|FOUND";
        this.data = found;
    }
}

export class EndDiscoveryEvent extends SocketEvent {
    constructor(network: string) {
        super();
        this.TAG = "Discovery|" + network + "|END";
    }
}

@injectable()
export class DiscoveryManager {

    static scan(network: string) {
        Log.i("Scan network: " + network);
        let allIP: [];
        allIP = iprange(network);
        Log.i("Netowork size: " + allIP.length);
        let rangeSize = allIP.length / 4;

        let range0Start = 0;
        let range0Stop = range0Start + rangeSize;

        let range1Start = range0Stop;
        let range1Stop = range1Start + rangeSize;

        let range2Start = range1Stop;
        let range2Stop = range2Start + rangeSize;

        let range3Start = range2Stop;
        let range3Stop = range3Start + rangeSize;

        let ipRange0 = allIP.slice(range0Start, range0Stop);
        let ipRange1 = allIP.slice(range1Start, range1Stop);
        let ipRange2 = allIP.slice(range2Start, range2Stop);
        let ipRange3 = allIP.slice(range3Start, range3Stop);

        doThis(ipRange0);
        doThis(ipRange1);
        doThis(ipRange2);
        doThis(ipRange3);

        let doneCount = 0;
        let socket = container.get<SocketServer>(TYPES.SocketServer);
        let storage = container.get<CoffeeStorage>(TYPES.Storage);
        function doThis(iprange) {
            iprange.forEach(target => {
                ping.sys.probe(target, function (isAlive) {
                    var msg = isAlive ? 'host ' + target + ' is alive' : 'host ' + target + ' is dead';
                    //Log.i(msg);
                    if (isAlive) {
                        Log.i("Found HOST: " + target);
                        doARP(target);
                    } else {
                        onDone(target);
                    }
                });
            });
        }

        function onDone(ip) {
            //Log.i("onDone ip: " + ip)
            doneCount++;
            if (doneCount != allIP.length) {
                return;
            }

            storage.getDiscovery(network).then(function (discovery: Discovery) {
                discovery.finishedTimeStamp = new Date();
                storage.saveDiscovery(discovery);
            });
            socket.emit(new EndDiscoveryEvent(network));
        }

        function doARP(ip: string) {
            Log.i("doARP ip  (" + ip + ")");
            arp.getMAC(ip, function (err, result) {
                if (!err) {
                    Log.i("doARP ip  (" + ip + ") mac:" + result);
                    doReverseDNS(ip, result);
                } else {
                    Log.i("doARP ip  (" + ip + ") err:" + result);
                    onDone(ip);
                }
            });
        }
        function doReverseDNS(ip: string, mac: string) {
            Log.i("doReverseDNS (ip: " + ip + " )");
            dns.reverse(ip, (err, hostnames) => {
                if (err) {
                    Log.i("doReverseDNS (ip: " + ip + " ) err: " + JSON.stringify(err));
                }
                if (err || !hostnames || hostnames.length == 0) {
                    Log.i("doReverseDNS (ip: " + ip + " ) not found reverse DNS");
                    getMacVendor(ip, mac);
                } else {
                    Log.i("doReverseDNS (ip: " + ip + " ) Found reverse dns: " + hostnames[0]);
                    socket.emit(new FoundDiscoveryEvent(network, { caption: hostnames[0], ipAddress: ip, id: 1, macAddress: mac, isPinned: false }));
                    onDone(ip);
                }
            })
        }
        function getMacVendor(ip: string, mac: string) {
            Log.i("getMacVendor (ip:" + ip + " mac: " + mac + ")");
            //https://macvendors.co/api/vendorname/00:19:99:E0:31:3D/pipe
            let url = "https://macvendors.co/api/vendorname/" + mac + "/pipe";
            https.get(url, (resp) => {
                let data = '';

                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    Log.i("getMacVendor (ip:" + ip + " mac: " + mac + ") data: " + data);
                    socket.emit(new FoundDiscoveryEvent(network, { caption: data, ipAddress: ip, id: 1, macAddress: mac, isPinned: false }));
                    onDone(ip);
                });
            }).on("error", (err) => {
                Log.i("getMacVendor (ip:" + ip + " mac: " + mac + ") err: " + JSON.stringify(err));
                onDone(ip);
            });
        }
    }

    static scanDetail(target: string) {
        try {
            let options = {
                target: target,
                port: '1-4000',
                status: 'TROU', // Timeout, Refused, Open, Unreachable
                banner: true
            };
            let scanner = new evilscan(options);

            scanner.on('result', function (data) {
                // fired when item is matching options
                if ((data.status as string).includes("closed")) {
                    return;
                }
                Log.i("Result on socket: " + JSON.stringify(data));

                let socket = container.get<SocketServer>(TYPES.SocketServer);
                let found = new Target();
                found.caption = data.banner;
                found.ipAddress = data.ip;
                socket.emit(new FoundDiscoveryEvent(target, found));
            });

            scanner.on('error', function (err) {
                Log.i("Error on socket: " + err);
                let socket = container.get<SocketServer>(TYPES.SocketServer);
                socket.emit(new ErrorDiscoveryEvent(target, err));

                let store = container.get<CoffeeStorage>(TYPES.Storage);
                store.getDiscovery(target).then((discovery) => {
                    discovery.finishedTimeStamp = new Date();
                    store.saveDiscovery(discovery);
                });
            });

            scanner.on('done', function () {
                Log.i("Done on socket");
                let socket = container.get<SocketServer>(TYPES.SocketServer);
                socket.emit(new EndDiscoveryEvent(target));

                let store = container.get<CoffeeStorage>(TYPES.Storage);
                store.getDiscovery(target).then((discovery) => {
                    discovery.finishedTimeStamp = new Date();
                    store.saveDiscovery(discovery);
                })
            });

            scanner.run();
        } catch (err) {
            throw new RouteError("Failed to scan. Error: " + err.message)
        }
    }
    static getAvailableNetworks(): string[] {
        let interfaces = os.networkInterfaces();
        let result = [];
        for (let key in interfaces) {
            let actualInterface = interfaces[key];
            for (let interfaceDetail of actualInterface) {
                if (interfaceDetail.family != "IPv4") {
                    continue;
                }
                let subnetAddressParts = interfaceDetail.netmask.split('.');

                subnetAddressParts = subnetAddressParts.map((decimal) => parseInt(decimal, 10).toString(2));
                //  let ipCIDR = element.address +  
                let fullBinary = subnetAddressParts.join('');
                let count = 0;
                for (let item of fullBinary) {
                    if (item == '1') {
                        count++;
                    }
                }
                let splitAddress = interfaceDetail.address.split('.');
                let finalAddress = splitAddress[0] + "." + splitAddress[1] + "." + splitAddress[2] + ".0";
                result.push(finalAddress + "/" + count);
            }
        }
        return result;
    }
}