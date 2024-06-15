export function Name() { return "Dareu EM901X"; }
export function VendorId() { return 0x260d; }
export function ProductId() { return 0x1074; }
export function Publisher() { return "mateusmarquessz"; }
export function Size() { return [5,1]; }
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

}

export function LedPositions() {

}

export function Render() {

}
//-------



function sendColors(shutdown = false)
{
  let packet = [];
  packet [1] = 0x00;
  packet [2] = 0x08;
  packet [3] = 0x07;
  packet [4] = 0x00;
  packet [5] = 0x00;
  packet [6] = 0xa0;
  packet [7] = 0x07;
  packet [8] = 0x02;


  let zoneId = [2, 4, 5, 1, 3];


	for(let zone_idx = 0; zone_idx < vLedPositions.length; zone_idx++) {
		let iX = vLedPositions[zone_idx][0];
		let iY = vLedPositions[zone_idx][1];
		var col;

		if(shutdown){
			col = hexToRgb(shutdownColor);
		}else if (LightingMode === "Forced") {
			col = hexToRgb(forcedColor);
		}else{
			col = device.color(iX, iY);
		}

		packet[(zone_idx * 1) + 2] = zoneId[zone_idx];
		packet[(zone_idx * 1) + 3] = col[0];
		packet[(zone_idx * 1) + 4] = col[1];
		packet[(zone_idx * 1) + 5] = col[2];
	}

  packet[21] = 0xff;
  packet[22] = 0xff;
  packet[23] = 0xff;
  
	device.write(packet, 65);
}

//-------------
export function Validate(endpoint) {
	return endpoint.interface === 0 && endpoint.usage === 0 && endpoint.usage_page === 0;
}

//Imagem
export function Image() {
	return "";
}