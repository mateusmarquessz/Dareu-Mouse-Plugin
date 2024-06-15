export function Name() { return "Dareu EM901X"; }
export function VendorId() { return 0x260d; }
export function ProductId() { return 0x1074; }
export function Publisher() { return "mateusmarquessz"; }
export function Size() { return [1,1]; }
export function DefaultPosition(){return [10, 100]; }
export function DefaultScale(){return 8.0}
export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
	];
}


var vLedNames = [ "Led 1", "Led 2", "Led 3", "Led 4", "Led 5" ]; 
var vLedPositions = [ [0,0], [1,0], [2,0], [3,0], [4,0] ];


export function Initialize() {

}

var vLedNames = [ "Led 1" ]; 
var vLedPositions = [ [0,0] ];

export function LedNames() {
	return vLedNames;
  }
  
  export function LedPositions() {
	return vLedPositions;
  }
  
export function Render() {

}
//-------


//-------------
export function Validate(endpoint) {
	return endpoint.interface === 0 && endpoint.usage === 0 && endpoint.usage_page === 0;
}

//Imagem
export function Image() {
	return "";
}

function sendColors(shutdown = false)
{
  let packet = new Uint8Array(49); // Tamanho do pacote fornecido
  // Preencher os valores constantes do seu pacote
  packet[0] = 0x1c;
  packet[1] = 0x00;
  packet[2] = 0x80;
  packet[3] = 0x69;
  packet[4] = 0xec;
  packet[5] = 0x41;
  packet[6] = 0x02;
  packet[7] = 0xbf;
  packet[8] = 0xff;
  packet[9] = 0xff;
  packet[10] = 0x00;
  packet[11] = 0x00;
  packet[12] = 0x00;
  packet[13] = 0x00;
  packet[14] = 0x1b;
  packet[15] = 0x00;
  packet[16] = 0x00;
  packet[17] = 0x02;
  packet[18] = 0x00;
  packet[19] = 0x01;
  packet[20] = 0x00;
  packet[21] = 0x00;
  packet[22] = 0x02;
  packet[23] = 0x19;
  packet[24] = 0x00;
  packet[25] = 0x00;
  packet[26] = 0x00;
  packet[27] = 0x00;
  packet[28] = 0x21;
  packet[29] = 0x09;
  packet[30] = 0x08;
  packet[31] = 0x03;
  packet[32] = 0x01;
  packet[33] = 0x00;
  packet[34] = 0x11;
  packet[35] = 0x00;
  packet[36] = 0x08;
  packet[37] = 0x07;
  packet[38] = 0x00;
  packet[39] = 0x00;
  packet[40] = 0xa0;
  packet[41] = 0x07;
  packet[42] = 0x02;
  packet[43] = 0xff;
  packet[44] = 0x00;
  packet[45] = 0x00;
  packet[46] = 0xff;
  packet[47] = 0x32;
  packet[48] = 0x4a; // Último valor do seu pacote

  // Mapeamento de zoneId
  let zoneId = [0x80, 0x69, 0xec, 0x41, 0x02];
  // Adicionar os valores RGB dos LEDs
  for (let zone_idx = 0; zone_idx < vLedPositions.length; zone_idx++) {
    let iX = vLedPositions[zone_idx][0];
    let iY = vLedPositions[zone_idx][1];
    let col;
    
    if (shutdown) {
      col = hexToRgb(shutdownColor);
    } else if (LightingMode === "Forced") {
      col = hexToRgb(forcedColor);
    } else {
      col = device.color(iX, iY);
    }

    // Adicionar os valores RGB no pacote. O offset começa em 24 para este pacote.
    packet[24 + (zone_idx * 4)] = col[0]; // Red
    packet[25 + (zone_idx * 4)] = col[1]; // Green
    packet[26 + (zone_idx * 4)] = col[2]; // Blue
    // O zoneId é usado apenas uma vez no cabeçalho, não precisa ser repetido aqui.
  }

  device.write(packet, 49); // Comprimento do pacote
}

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let colors = [];
  colors[0] = parseInt(result[1], 16);
  colors[1] = parseInt(result[2], 16);
  colors[3] = parseInt(result[3], 16);
  return colors;
}

