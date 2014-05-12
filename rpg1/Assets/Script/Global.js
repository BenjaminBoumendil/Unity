#pragma strict

static var deltaTime: float;
static var fixedTime: float;
static var gravity: float;

function Start () {
	gravity = 8;
}

function Update () {
	deltaTime = Time.deltaTime;
	fixedTime = Time.fixedTime;
}