function concatData(id, data){
    return `${id}: ${data}<br>`;
}

function concatJointPosition(id, position){
    return `${id}: ${position[0]}, ${position[1]}, ${position[2]}`
}

var output = document.getElementById('output');
var frameString = "", handString = '', fingerstring = "";
var hand, finger;
var nameMap = ["thumb", "index", "middle", "ring", "pinky"];

// Loop uses browser's requestanimationFrame
var options = { enableGestures: true };

// Main Loop Loop
Leap.loop(options, function(frame) {
    frameString = concatData("frame_id", frame.id);
    frameString += concatData("num_hands", frame.hands.length);
    frameString += concatData("frame_id", frame.fingers.length);
    frameString += "<br>";

    
    for (var i = 0, len = frame.hands.length; i < len; i ++){
        hand = frame.hands[i];
        handString = concatData("hand_type", hand.type);
        handString += concatData("confidence", hand.confidence);
        handString += concatData("pinch_strength", hand.pinchStrength);
        handString += concatData("grab_strength", hand.grabStrength);
        
        handString += "<br>";

        fingerString = '';
        for (var j = 0, len = hand.fingers.length; j < len; j ++){
            finger = hand.fingers[j];
            fingerString = concatData("finger_type", finger.type, nameMap[finger.type]);
            // The physical position of the distal interphalangeal joint of the finger. This point is the base of the distal bone (closest to the intermediate phalanx).
            fingerString += concatJointPosition('finger_dip', finger.dipPosition);
            // The physical position of the proximal interphalangeal joint of the finger. This position is the joint between the proximal and the intermediate phalanges.
            fingerString += concatJointPosition('finger_pip', finger.pipPosition);
            // The physical position of the metacarpophalangeal joint, or knuckle, of the finger. This position is the joint between the metacarpal and proximal phalanx bones.
            fingerString += concatJointPosition('finger_mcp', finger.mcpPosition);
            fingerString += "<br>";
        } 

        fingerString += handString;
        frameString += fingerstring;
    }
    // frameString += handString;
    output.innerHTML = frameString;
});
