export function Name() { return "Dareu EM901X"; }
export function VendorId() { return 0x260d; }
export function ProductId() { return 1074; }
export function Size() { return [3, 3]; }
export function DefaultPosition(){return [240, 120];}
export function DefaultScale(){return 8.0;}
/* global
shutdownColor:readonly
LightingMode:readonly
forcedColor:readonly
*/
export function ControllableParameters() {
    return [
        { "property": "shutdownColor", "label": "Shutdown Color", "min": "0", "max": "360", "type": "color", "default": "#009bde" },
        { "property": "LightingMode", "label": "Lighting Mode", "type": "combobox", "values": ["Canvas", "Forced"], "default": "Canvas" },
        { "property": "forcedColor", "label": "Forced Color", "min": "0", "max": "360", "type": "color", "default": "#009bde" },
    ];
}

export function Initialize() {
    // Inicialização do dispositivo (se necessário)
}

export function Render() {
    sendColors();
}

export function Shutdown(SystemSuspending) {
    if (SystemSuspending) {
        sendColors("#000000"); // Apaga as luzes ao suspender/sleep
    } else {
        // Não faz nada. Mouse reverte para o modo hardware quando o streaming é interrompido.
    }
}

function sendInitialPacket(data) {
    let packet = [];

    packet[0x00] = 0x0A;
    packet[0x01] = 0x07;
    packet[0x02] = 0x01;
    packet[0x03] = 0x06;

    packet = packet.concat(data);

    device.send_report(packet, 65);
}

function StreamPacket(zone, data) {
    let packet = [];

    packet[0x00] = 0x0a;
    packet[0x01] = 0x07;
    packet[0x02] = zone;
    packet = packet.concat(data);

    device.pause(1);
    device.send_report(packet, 65);
}

function sendColors(overrideColor) {
    const RGBData = new Array(425).fill(0); // Ajuste o tamanho conforme necessário

    for (let iIdx = 0; iIdx < vKeys.length; iIdx++) {
        const iPxX = vKeyPositions[iIdx][0];
        const iPxY = vKeyPositions[iIdx][1];
        var col;

        if (overrideColor) {
            col = hexToRgb(overrideColor);
        } else if (LightingMode === "Forced") {
            col = hexToRgb(forcedColor);
        } else {
            col = device.color(iPxX, iPxY);
        }

        RGBData[vKeys[iIdx]] = col[0];
        RGBData[vKeys[iIdx] + 1] = col[1];
        RGBData[vKeys[iIdx] + 2] = col[2];
    }

    sendInitialPacket(RGBData.splice(0, 61));
    StreamPacket(2, RGBData.splice(0, 62));
    StreamPacket(3, RGBData.splice(0, 62));
    StreamPacket(4, RGBData.splice(0, 62));
    StreamPacket(5, RGBData.splice(0, 62));
    device.pause(1);
}

export function Validate(endpoint) {
    return endpoint.interface === 1 && endpoint.usage === 0x0001 && endpoint.usage_page === 0xff00 && endpoint.collection === 0x0005;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const colors = [];
    colors[0] = parseInt(result[1], 16);
    colors[1] = parseInt(result[2], 16);
    colors[2] = parseInt(result[3], 16);

    return colors;
}

export function ImageUrl() {
    return "https://dareu.com/cdn/shop/files/0002_EM901X.png?v=1714725254&width=1920"; 
}
