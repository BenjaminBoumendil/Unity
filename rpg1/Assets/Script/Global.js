#pragma strict

static var deltaTime: float;
static var fixedTime: float;
static var gravity: float;
static var healthMain: float = 100;
static var dmgToEnnemy: String = "1";
static var objective: int = 3;
static var currentObjective: int = 0;

var endLevel: GameObject;

function Start () {
	gravity = 8;
	endLevel.renderer.enabled = false;
}

function Update () {
	deltaTime = Time.deltaTime;
	fixedTime = Time.fixedTime;

	if (currentObjective >= objective){
		endLevel.renderer.enabled = true;
	}

	if (healthMain <= 0){
		Application.LoadLevel("GameOver");
	}
}