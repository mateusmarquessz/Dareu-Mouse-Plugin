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



function sendColors(shutdown = false)
{
  let packet = [];
  packet [1] = 0x00;
  packet [2] = 0x08;
  packet [3] = 0x07;
  packet [4] = 0x00;
  packet [5] = 0x00;
}

//-------------
export function Validate(endpoint) {
	return endpoint.interface === 0 && endpoint.usage === 0 && endpoint.usage_page === 0;
}

//Imagem
export function Image() {
	return "";
}