#pragma strict

//Public var
var speed: int;

//Private var
private var controller: CharacterController;
private var moveDirection: Vector3;
private var delayRotation: float;
private var changeRotation: float;
private var newRotation: float;
private var hit: RaycastHit;

function Start () {
	delayRotation = Random.Range(1, 6);
	newRotation = Random.Range(0, 361);
	controller = GetComponent("CharacterController");
}

function Update () {
	moveDirection = Vector3.forward * speed;
	moveDirection = transform.TransformDirection(moveDirection);

	if (changeRotation + delayRotation < Global.fixedTime){
		newRotation = Random.Range(0, 361);
		delayRotation = Random.Range(1, 6);
		changeRotation = Global.fixedTime;
	}

	if (Physics.Raycast(transform.Find("origin").position, transform.forward, hit)){
		if (hit.distance < 5){
			transform.rotation = Quaternion.Slerp(transform.rotation, transform.rotation * Quaternion.Euler(0, 180, 0), 0.5 * Global.deltaTime);
		}else{
			transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.Euler(0, newRotation, 0), 0.5 * Global.deltaTime);
		}
	}
	Debug.DrawRay(transform.Find("origin").position, transform.forward, Color.red, 1);

	transform.Find("skeletonDark").animation.CrossFade("run", 0.5 * Global.deltaTime);

	moveDirection.y -= Global.gravity;

	controller.Move(moveDirection * Global.deltaTime);
}

function OnControllerColliderHit(hit:ControllerColliderHit){
	transform.rotation = Quaternion.Slerp(transform.rotation, transform.rotation * Quaternion.Euler(0, 180, 0), 0.5 * Global.deltaTime);
}