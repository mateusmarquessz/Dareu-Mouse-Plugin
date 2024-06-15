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

export function Initialize() {

}

var vLedNames = [ "Led 1" ]; 
var vLedPositions = [ [0,0] ];

export function LedNames() {

}

export function LedPositions() {

}

export function Render() {

}
//-------



function sendColors(shutdown = false) {
	let packet = new Array(64).fill(0); // Inicializa um array de 64 bytes com zeros
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
  
	let zoneId = [2, 4, 5, 1, 3]; // IDs das zonas
  
	for (let zone_idx = 0; zone_idx < zoneId.length; zone_idx++) {
	  let iX = vLedPositions[zone_idx][0];
	  let iY = vLedPositions[zone_idx][1];
	  var col;
  
	  if (shutdown) {
		col = hexToRgb(shutdownColor);
	  } else if (LightingMode === "Forced") {
		col = hexToRgb(forcedColor);
	  } else {
		col = device.color(iX, iY);
	  }
  
	  // Calcula o deslocamento para cada zona
	  let baseOffset = 6 + (zone_idx * 4); // Inicia 5 bytes após o início e multiplica o índice por 4
	  packet[baseOffset + 0] = zoneId[zone_idx]; // ID da zona
	  packet[baseOffset + 1] = col[0]; // Componente R
	  packet[baseOffset + 2] = col[1]; // Componente G
	  packet[baseOffset + 3] = col[2]; // Componente B
	}
  
	device.write(packet, 120);
  }
  
  // Função auxiliar para converter hexadecimal para RGB
  function hexToRgb(hex) {
	// Remove o símbolo '#' se presente
	hex = hex.replace(/^#/, '');
	
	// Converte valores hexadecimais para decimal
	let bigint = parseInt(hex, 16);
	let r = (bigint >> 16) & 255;
	let g = (bigint >> 8) & 255;
	let b = bigint & 255;
	
	return [r, g, b];
  }
  

//-------------
export function Validate(endpoint) {
	return endpoint.interface === 0 && endpoint.usage === 0 && endpoint.usage_page === 0;
}

//Imagem
export function Image() {
	return "";
}