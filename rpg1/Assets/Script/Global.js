#pragma strict

static var deltaTime: float;
static var fixedTime: float;
static var gravity: float;
static var healthMain: float = 100;
static var dmgToEnnemy: String = "1";

function Start () {
	gravity = 8;
}

function Update () {
	deltaTime = Time.deltaTime;
	fixedTime = Time.fixedTime;
}