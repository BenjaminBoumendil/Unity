#pragma strict

private var targetCamera: Transform;
private var to: Quaternion;
private var targetCharacter: Transform;

function Start () {
	targetCamera = GameObject.Find("Target").transform;
	targetCharacter = GameObject.Find("Golem").transform;
}

function Update () {
	transform.position = Vector3.Lerp(transform.position, targetCamera.position, 0.1);

	to = Quaternion.LookRotation(targetCharacter.position - transform.position);

	transform.rotation = Quaternion.Slerp(transform.rotation, to, 0.1);
}